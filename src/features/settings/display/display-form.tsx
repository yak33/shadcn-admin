import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// label 存 i18n key，渲染处统一 t() 翻译
const items = [
  {
    id: 'recents',
    label: 'settings.displayRecents',
  },
  {
    id: 'home',
    label: 'settings.displayHome',
  },
  {
    id: 'applications',
    label: 'settings.displayApplications',
  },
  {
    id: 'desktop',
    label: 'settings.displayDesktop',
  },
  {
    id: 'downloads',
    label: 'settings.displayDownloads',
  },
  {
    id: 'documents',
    label: 'settings.displayDocuments',
  },
] as const

type Translate = ReturnType<typeof useTranslation>['t']

// 校验文案需要按当前语言翻译，故 schema 以 t 为参数在组件内构建
const buildDisplayFormSchema = (t: Translate) =>
  z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: t('settings.itemsRequired'),
    }),
  })

type DisplayFormValues = z.infer<ReturnType<typeof buildDisplayFormSchema>>

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ['recents', 'home'],
}

export function DisplayForm() {
  const { t } = useTranslation()

  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(buildDisplayFormSchema(t)),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>
                  {t('settings.sidebar')}
                </FormLabel>
                <FormDescription>
                  {t('settings.sidebarDesc')}
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t(item.label)}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('settings.updateDisplay')}</Button>
      </form>
    </Form>
  )
}
