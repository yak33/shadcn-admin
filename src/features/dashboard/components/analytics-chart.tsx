import { useTranslation } from 'react-i18next'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// 数值模块级生成一次，避免重渲染（含语言切换）时随机数跳动
const rawValues = Array.from({ length: 7 }, () => ({
  clicks: Math.floor(Math.random() * 900) + 100,
  uniques: Math.floor(Math.random() * 700) + 80,
}))

const WEEK_DAYS = {
  zh: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
} as const

export function AnalyticsChart() {
  const { t, i18n } = useTranslation()
  const weekDays = i18n.resolvedLanguage?.startsWith('zh') ? WEEK_DAYS.zh : WEEK_DAYS.en
  const data = rawValues.map((v, i) => ({ name: weekDays[i], ...v }))

  // chartConfig 在组件内构造，语言切换时 tooltip/图例文案才能跟随更新
  const chartConfig = {
    clicks: { label: t('charts.clicks'), color: 'var(--chart-1)' },
    uniques: { label: t('charts.uniques'), color: 'var(--chart-2)' },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className='h-[300px] w-full'>
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='name'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip
          cursor={{ stroke: 'var(--border)' }}
          content={<ChartTooltipContent indicator='line' />}
        />
        <Area
          dataKey='clicks'
          type='monotone'
          fill='var(--color-clicks)'
          fillOpacity={0.3}
          stroke='var(--color-clicks)'
          strokeWidth={2}
        />
        <Area
          dataKey='uniques'
          type='monotone'
          fill='var(--color-uniques)'
          fillOpacity={0.3}
          stroke='var(--color-uniques)'
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
