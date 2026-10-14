import { Shield, UserCheck, Users, CreditCard } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

// label 为 i18n key，渲染处通过 t(label) 显示翻译文案
export const statuses = [
  {
    label: 'users.statusActive',
    value: 'active',
  },
  {
    label: 'users.statusInactive',
    value: 'inactive',
  },
  {
    label: 'users.statusInvited',
    value: 'invited',
  },
  {
    label: 'users.statusSuspended',
    value: 'suspended',
  },
] as const

export const roles = [
  {
    label: 'users.roleSuperadmin',
    value: 'superadmin',
    icon: Shield,
  },
  {
    label: 'users.roleAdmin',
    value: 'admin',
    icon: UserCheck,
  },
  {
    label: 'users.roleManager',
    value: 'manager',
    icon: Users,
  },
  {
    label: 'users.roleCashier',
    value: 'cashier',
    icon: CreditCard,
  },
] as const
