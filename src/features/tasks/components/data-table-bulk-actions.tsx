import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, CircleArrowUp, ArrowUpDown, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { TasksMultiDeleteDialog } from './tasks-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const { t } = useTranslation()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  // statusLabel 为已翻译的展示文本
  const handleBulkStatusChange = (statusLabel: string) => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    const count = selectedTasks.length
    toast.promise(sleep(2000), {
      loading: t('tasks.updatingStatus', {
        defaultValue: 'Updating status...',
      }),
      success: () => {
        table.resetRowSelection()
        return t('tasks.bulkStatusSuccess', {
          label: statusLabel,
          count,
          defaultValue: `Status updated to "${statusLabel}" for ${count} task${count > 1 ? 's' : ''}.`,
        })
      },
      error: t('tasks.error', { defaultValue: 'Error' }),
    })
    table.resetRowSelection()
  }

  const handleBulkPriorityChange = (priorityLabel: string) => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    const count = selectedTasks.length
    toast.promise(sleep(2000), {
      loading: t('tasks.updatingPriority', {
        defaultValue: 'Updating priority...',
      }),
      success: () => {
        table.resetRowSelection()
        return t('tasks.bulkPrioritySuccess', {
          label: priorityLabel,
          count,
          defaultValue: `Priority updated to "${priorityLabel}" for ${count} task${count > 1 ? 's' : ''}.`,
        })
      },
      error: t('tasks.error', { defaultValue: 'Error' }),
    })
    table.resetRowSelection()
  }

  const handleBulkExport = () => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    const count = selectedTasks.length
    toast.promise(sleep(2000), {
      loading: t('tasks.exportingTasks', {
        defaultValue: 'Exporting tasks...',
      }),
      success: () => {
        table.resetRowSelection()
        return t('tasks.exportSuccess', {
          count,
          defaultValue: `Exported ${count} task${count > 1 ? 's' : ''} to CSV.`,
        })
      },
      error: t('tasks.error', { defaultValue: 'Error' }),
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='task'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label={t('tasks.updateStatus', {
                    defaultValue: 'Update status',
                  })}
                  title={t('tasks.updateStatus', {
                    defaultValue: 'Update status',
                  })}
                >
                  <CircleArrowUp />
                  <span className='sr-only'>
                    {t('tasks.updateStatus', {
                      defaultValue: 'Update status',
                    })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {t('tasks.updateStatus', { defaultValue: 'Update status' })}
              </p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                defaultValue={status.value}
                onClick={() => handleBulkStatusChange(t(status.label))}
              >
                {status.icon && (
                  <status.icon className='size-4 text-muted-foreground' />
                )}
                {t(status.label)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label={t('tasks.updatePriority', {
                    defaultValue: 'Update priority',
                  })}
                  title={t('tasks.updatePriority', {
                    defaultValue: 'Update priority',
                  })}
                >
                  <ArrowUpDown />
                  <span className='sr-only'>
                    {t('tasks.updatePriority', {
                      defaultValue: 'Update priority',
                    })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {t('tasks.updatePriority', {
                  defaultValue: 'Update priority',
                })}
              </p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {priorities.map((priority) => (
              <DropdownMenuItem
                key={priority.value}
                defaultValue={priority.value}
                onClick={() => handleBulkPriorityChange(t(priority.label))}
              >
                {priority.icon && (
                  <priority.icon className='size-4 text-muted-foreground' />
                )}
                {t(priority.label)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkExport()}
              className='size-8'
              aria-label={t('tasks.exportTasks', {
                defaultValue: 'Export tasks',
              })}
              title={t('tasks.exportTasks', { defaultValue: 'Export tasks' })}
            >
              <Download />
              <span className='sr-only'>
                {t('tasks.exportTasks', { defaultValue: 'Export tasks' })}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('tasks.exportTasks', { defaultValue: 'Export tasks' })}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label={t('tasks.deleteSelectedTasks', {
                defaultValue: 'Delete selected tasks',
              })}
              title={t('tasks.deleteSelectedTasks', {
                defaultValue: 'Delete selected tasks',
              })}
            >
              <Trash2 />
              <span className='sr-only'>
                {t('tasks.deleteSelectedTasks', {
                  defaultValue: 'Delete selected tasks',
                })}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {t('tasks.deleteSelectedTasks', {
                defaultValue: 'Delete selected tasks',
              })}
            </p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <TasksMultiDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        table={table}
      />
    </>
  )
}
