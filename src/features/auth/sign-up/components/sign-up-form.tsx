import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  // 校验文案依赖 t()，schema 只能在组件内构建
  const formSchema = z
    .object({
      email: z.email({
        error: (iss) =>
          iss.input === ''
            ? t('auth.emailRequired', {
                defaultValue: 'Please enter your email.',
              })
            : undefined,
      }),
      password: z
        .string()
        .min(
          1,
          t('auth.passwordRequired', {
            defaultValue: 'Please enter your password.',
          })
        )
        .min(
          7,
          t('auth.passwordMinLength', {
            defaultValue: 'Password must be at least 7 characters long.',
          })
        ),
      confirmPassword: z.string().min(
        1,
        t('auth.confirmPasswordRequired', {
          defaultValue: 'Please confirm your password.',
        })
      ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.passwordsNotMatch', {
        defaultValue: "Passwords don't match.",
      }),
      path: ['confirmPassword'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: t('auth.creatingAccount', {
        defaultValue: 'Creating account...',
      }),
      success: () => {
        setIsLoading(false)
        return t('auth.accountCreatedToast', {
          defaultValue: 'Account created for {{email}}.',
          email: data.email,
        })
      },
      error: t('auth.toastError', { defaultValue: 'Error' }),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('auth.email', { defaultValue: 'Email' })}
              </FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('auth.password', { defaultValue: 'Password' })}
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('auth.confirmPassword', {
                  defaultValue: 'Confirm Password',
                })}
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <UserPlus />}
          {t('auth.createAccountButton', { defaultValue: 'Create Account' })}
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              {t('auth.orContinueWith', {
                defaultValue: 'Or continue with',
              })}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button
            variant='outline'
            className='w-full'
            type='button'
            disabled={isLoading}
          >
            <IconGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button
            variant='outline'
            className='w-full'
            type='button'
            disabled={isLoading}
          >
            <IconFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
