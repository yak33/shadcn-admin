import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  fluid?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Main({ fixed, className, fluid, ...props }: MainProps) {
  return (
    <main
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'px-4 py-6',

        // If layout is fixed, make the main container flex and grow
        fixed && 'flex grow flex-col overflow-hidden',

        // If layout is not fluid, cap the content width on ultra-wide screens
        // （默认 7xl/1280px 在宽屏下两侧留白过大，放宽到 1800px：常规屏铺满）
        !fluid &&
          '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-[1800px]',
        className
      )}
      {...props}
    />
  )
}
