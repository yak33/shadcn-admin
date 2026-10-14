import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// 数值模块级生成一次，避免重渲染（含语言切换）时随机数跳动
const rawValues = Array.from({ length: 12 }, () => ({
  total: Math.floor(Math.random() * 5000) + 1000,
}))

const MONTHS = {
  zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
} as const

export function Overview() {
  const { t, i18n } = useTranslation()
  const months = i18n.resolvedLanguage?.startsWith('zh') ? MONTHS.zh : MONTHS.en
  const data = rawValues.map((v, i) => ({ name: months[i], ...v }))

  // chartConfig 在组件内构造，语言切换时 tooltip 文案才能跟随更新
  const chartConfig = {
    total: { label: t('charts.sales'), color: 'var(--chart-1)' },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className='h-[350px] w-full'>
      <BarChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='name'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          direction='ltr'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={40}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={{ fill: 'var(--muted)' }}
          content={
            <ChartTooltipContent
              indicator='line'
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          }
        />
        <Bar dataKey='total' fill='var(--color-total)' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
