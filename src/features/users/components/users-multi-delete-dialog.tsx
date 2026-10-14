'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

type UserMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function UsersMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: UserMultiDeleteDialogProps<TData>) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(t('users.pleaseTypeWord', { word: CONFIRM_WORD }))
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: t('users.deletingUsers'),
      success: () => {
        setValue('')
        table.resetRowSelection()
        return t('users.deletedUsers', { count: selectedRows.length })
      },
      error: t('users.error'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      form='users-multi-delete-form'
      disabled={value.trim() !== CONFIRM_WORD}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {t('users.deleteTitle', { count: selectedRows.length })}
        </span>
      }
      desc={
        <form
          id='users-multi-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            {t('users.multiDeleteConfirm')} <br />
            {t('users.cannotBeUndone')}
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span className=''>
              {t('users.confirmByTyping', { word: CONFIRM_WORD })}
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('users.typeWordToConfirm', {
                word: CONFIRM_WORD,
              })}
              autoFocus
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('users.warning')}</AlertTitle>
            <AlertDescription>{t('users.rollbackWarning')}</AlertDescription>
          </Alert>
        </form>
      }
      confirmText={t('common.delete')}
      destructive
    />
  )
}
