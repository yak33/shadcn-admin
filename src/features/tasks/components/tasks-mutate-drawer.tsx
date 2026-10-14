import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Task } from '../data/schema'

type TaskMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

// 校验消息需要跟随当前语言，schema 在组件内用 t 重建
const createFormSchema = (t: TFunction) =>
  z.object({
    title: z.string().min(
      1,
      t('tasks.titleRequired', { defaultValue: 'Title is required.' })
    ),
    status: z.string().min(
      1,
      t('tasks.statusRequired', { defaultValue: 'Please select a status.' })
    ),
    label: z.string().min(
      1,
      t('tasks.labelRequired', { defaultValue: 'Please select a label.' })
    ),
    priority: z.string().min(
      1,
      t('tasks.priorityRequired', {
        defaultValue: 'Please choose a priority.',
      })
    ),
  })
type TaskForm = z.infer<ReturnType<typeof createFormSchema>>

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  const { t } = useTranslation()
  const isUpdate = !!currentRow

  const formSchema = createFormSchema(t)
  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  const onSubmit = (data: TaskForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>
            {isUpdate
              ? t('tasks.updateTask', { defaultValue: 'Update Task' })
              : t('tasks.createTask', { defaultValue: 'Create Task' })}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? t('tasks.drawerDescUpdate', {
                  defaultValue: 'Update the task by providing necessary info.',
                })
              : t('tasks.drawerDescCreate', {
                  defaultValue:
                    'Add a new task by providing necessary info.',
                })}{' '}
            {t('tasks.drawerDescSuffix', {
              defaultValue: "Click save when you're done.",
            })}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('tasks.fieldTitle', { defaultValue: 'Title' })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('tasks.titlePlaceholder', {
                        defaultValue: 'Enter a title',
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('tasks.fieldStatus', { defaultValue: 'Status' })}
                  </FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('common2.select', { defaultValue: 'Select' })}
                    items={[
                      {
                        label: t('tasks.statusInProgress', {
                          defaultValue: 'In Progress',
                        }),
                        value: 'in progress',
                      },
                      {
                        label: t('tasks.statusBacklog', {
                          defaultValue: 'Backlog',
                        }),
                        value: 'backlog',
                      },
                      {
                        label: t('tasks.statusTodo', { defaultValue: 'Todo' }),
                        value: 'todo',
                      },
                      {
                        label: t('tasks.statusCanceled', {
                          defaultValue: 'Canceled',
                        }),
                        value: 'canceled',
                      },
                      {
                        label: t('tasks.statusDone', { defaultValue: 'Done' }),
                        value: 'done',
                      },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>
                    {t('tasks.fieldLabel', { defaultValue: 'Label' })}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='documentation' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.labelDocumentation', {
                            defaultValue: 'Documentation',
                          })}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='feature' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.labelFeature', {
                            defaultValue: 'Feature',
                          })}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='bug' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.labelBug', { defaultValue: 'Bug' })}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>
                    {t('tasks.fieldPriority', { defaultValue: 'Priority' })}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='high' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.priorityHigh', { defaultValue: 'High' })}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='medium' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.priorityMedium', {
                            defaultValue: 'Medium',
                          })}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='low' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.priorityLow', { defaultValue: 'Low' })}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>
              {t('tasks.close', { defaultValue: 'Close' })}
            </Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            {t('tasks.saveChanges', { defaultValue: 'Save changes' })}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
