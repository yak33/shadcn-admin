import { useTranslation } from 'react-i18next'
import { Check, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitch() {
  const { i18n } = useTranslation()

  const currentLang = i18n.resolvedLanguage || i18n.language

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <Languages className='size-[1.2rem]' />
          <span className='sr-only'>切换语言 / Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => handleLanguageChange('zh-CN')}>
          简体中文
          <Check
            size={14}
            className={cn(
              'ms-auto',
              (!currentLang || currentLang.startsWith('zh')) ? 'opacity-100' : 'opacity-0'
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('en-US')}>
          English
          <Check
            size={14}
            className={cn(
              'ms-auto',
              currentLang?.startsWith('en') ? 'opacity-100' : 'opacity-0'
            )}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
