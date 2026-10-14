import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Card className='max-w-sm gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('auth.signInTitle', { defaultValue: 'Sign in' })}
          </CardTitle>
          <CardDescription>
            {t('auth.signInDesc1', {
              defaultValue: 'Enter your email and password below to log into',
            })}{' '}
            <br className='max-sm:hidden' />{' '}
            {t('auth.signInDesc2', { defaultValue: 'your account.' })}{' '}
            {t('auth.noAccount', {
              defaultValue: "Don't have an account?",
            })}{' '}
            <Link
              to='/sign-up'
              className='text-nowrap underline underline-offset-4 hover:text-primary'
            >
              {t('auth.signUpLink', { defaultValue: 'Sign Up' })}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm redirectTo={redirect} />
        </CardContent>
        <CardFooter>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            {t('auth.agreeSignInPrefix', {
              defaultValue: 'By clicking sign in, you agree to our',
            })}{' '}
            <a
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              {t('auth.termsOfService', { defaultValue: 'Terms of Service' })}
            </a>{' '}
            {t('auth.and', { defaultValue: 'and' })}{' '}
            <a
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              {t('auth.privacyPolicy', { defaultValue: 'Privacy Policy' })}
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
