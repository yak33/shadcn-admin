import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const data = [
  { name: '1月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '2月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '3月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '4月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '5月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '6月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '7月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '8月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '9月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '10月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '11月', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: '12月', total: Math.floor(Math.random() * 5000) + 1000 },
]

const chartConfig = {
  total: { label: '销售额', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function Overview() {
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
