import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type Translate = ReturnType<typeof useTranslation>['t']

// 校验文案需要按当前语言翻译，故 schema 以 t 为参数在组件内构建
const buildProfileFormSchema = (t: Translate) =>
  z.object({
    username: z
      .string(t('settings.usernameRequired'))
      .min(2, t('settings.usernameMin'))
      .max(30, t('settings.usernameMax')),
    email: z.email({
      error: (iss) =>
        iss.input === undefined
          ? t('settings.emailRequired')
          : undefined,
    }),
    bio: z.string().max(160).min(4),
    urls: z
      .array(
        z.object({
          value: z.url(t('settings.invalidUrl')),
        })
      )
      .optional(),
  })

type ProfileFormValues = z.infer<ReturnType<typeof buildProfileFormSchema>>

export function ProfileForm() {
  const { t } = useTranslation()

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    bio: t('settings.defaultBio'),
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' },
    ],
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(buildProfileFormSchema(t)),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.username')}</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                {t('settings.usernameDesc')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.email')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('settings.selectEmailPlaceholder')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t('settings.emailDescPrefix')}
                <Link to='/'>{t('settings.emailSettingsLink')}</Link>
                {t('settings.emailDescSuffix')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.bio')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('settings.bioPlaceholder')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('settings.bioDescPrefix')}
                <span>@mention</span>
                {t('settings.bioDescSuffix')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    {t('settings.urls')}
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    {t('settings.urlsDesc')}
                  </FormDescription>
                  <FormControl className={cn(index !== 0 && 'mt-1.5')}>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            {t('settings.addUrl')}
          </Button>
        </div>
        <Button type='submit'>{t('settings.updateProfile')}</Button>
      </form>
    </Form>
  )
}
