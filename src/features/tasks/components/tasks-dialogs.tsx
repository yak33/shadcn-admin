import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { TasksImportDialog } from './tasks-import-dialog'
import { TasksMutateDrawer } from './tasks-mutate-drawer'
import { useTasks } from './tasks-provider'

export function TasksDialogs() {
  const { t } = useTranslation()
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  return (
    <>
      <TasksMutateDrawer
        key='task-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key='tasks-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              showSubmittedData(
                currentRow,
                t('tasks.deletedToastPrefix', {
                  defaultValue: 'The following task has been deleted:',
                })
              )
            }}
            className='max-w-md'
            title={t('tasks.deleteOneTitle', {
              id: currentRow.id,
              defaultValue: `Delete this task: ${currentRow.id} ?`,
            })}
            desc={
              <>
                {t('tasks.deleteOneDesc1', {
                  defaultValue: 'You are about to delete a task with the ID',
                })}{' '}
                <strong>{currentRow.id}</strong>
                {t('tasks.deleteOneDesc2', { defaultValue: '.' })}
                <br />
                {t('tasks.actionCannotBeUndone', {
                  defaultValue: 'This action cannot be undone.',
                })}
              </>
            }
            confirmText={t('common.delete', { defaultValue: 'Delete' })}
            cancelBtnText={t('common.cancel', { defaultValue: 'Cancel' })}
          />
        </>
      )}
    </>
  )
}
