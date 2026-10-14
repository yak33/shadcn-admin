'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

type TaskMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function TasksMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: TaskMultiDeleteDialogProps<TData>) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const count = selectedRows.length

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(
        t('tasks.typeDeleteToast', {
          defaultValue: 'Please type "DELETE" to confirm.',
        })
      )
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: t('tasks.deletingTasks', {
        defaultValue: 'Deleting tasks...',
      }),
      success: () => {
        setValue('')
        table.resetRowSelection()
        return t('tasks.deletedSuccess', {
          count,
          defaultValue: `Deleted ${count} ${count > 1 ? 'tasks' : 'task'}`,
        })
      },
      error: t('tasks.error', { defaultValue: 'Error' }),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      form='tasks-multi-delete-form'
      disabled={value.trim() !== CONFIRM_WORD}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          {t('tasks.multiDeleteTitle', {
            count,
            defaultValue: `Delete ${count} ${count > 1 ? 'tasks' : 'task'}`,
          })}
        </span>
      }
      desc={
        <form
          id='tasks-multi-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            {t('tasks.multiDeleteDesc', {
              defaultValue:
                'Are you sure you want to delete the selected tasks?',
            })}{' '}
            <br />
            {t('tasks.actionCannotBeUndone', {
              defaultValue: 'This action cannot be undone.',
            })}
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span className=''>
              {t('tasks.confirmByTyping', {
                defaultValue: 'Confirm by typing "DELETE":',
              })}
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('tasks.typeDeletePlaceholder', {
                defaultValue: 'Type "DELETE" to confirm.',
              })}
              autoFocus
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>
              {t('tasks.warning', { defaultValue: 'Warning!' })}
            </AlertTitle>
            <AlertDescription>
              {t('tasks.multiDeleteAlert', {
                defaultValue:
                  'Please be careful, this operation can not be rolled back.',
              })}
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText={t('common.delete', { defaultValue: 'Delete' })}
      cancelBtnText={t('common.cancel', { defaultValue: 'Cancel' })}
      destructive
    />
  )
}
