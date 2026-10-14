import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { sidebarData } from './layout/data/sidebar-data'
import { ScrollArea } from './ui/scroll-area'

export function CommandMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t('common.search', { defaultValue: '输入命令或搜索...' })} />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>{t('common.noResults', { defaultValue: '未找到结果。' })}</CommandEmpty>
          {sidebarData.navGroups.map((group) => {
            const groupHeading = t(group.title, { defaultValue: group.title })
            return (
              <CommandGroup key={group.title} heading={groupHeading}>
                {group.items.map((navItem, i) => {
                  const itemLabel = t(navItem.title, { defaultValue: navItem.title })
                  if (navItem.url)
                    return (
                      <CommandItem
                        key={`${navItem.url}-${i}`}
                        value={itemLabel}
                        onSelect={() => {
                          runCommand(() => navigate({ to: navItem.url }))
                        }}
                      >
                        <div className='flex size-4 items-center justify-center'>
                          <ArrowRight className='size-2 text-muted-foreground/80' />
                        </div>
                        {itemLabel}
                      </CommandItem>
                    )

                  return navItem.items?.map((subItem, i) => {
                    const subLabel = t(subItem.title, { defaultValue: subItem.title })
                    return (
                      <CommandItem
                        key={`${navItem.title}-${subItem.url}-${i}`}
                        value={`${itemLabel}-${subLabel}`}
                        onSelect={() => {
                          runCommand(() => navigate({ to: subItem.url }))
                        }}
                      >
                        <div className='flex size-4 items-center justify-center'>
                          <ArrowRight className='size-2 text-muted-foreground/80' />
                        </div>
                        {itemLabel} <ChevronRight /> {subLabel}
                      </CommandItem>
                    )
                  })
                })}
              </CommandGroup>
            )
          })}
          <CommandSeparator />
          <CommandGroup heading={t('common.theme', { defaultValue: '主题' })}>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>{t('common.light', { defaultValue: '浅色' })}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='scale-90' />
              <span>{t('common.dark', { defaultValue: '深色' })}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>{t('common.system', { defaultValue: '跟随系统' })}</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
