import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CheckCircle,
  AlertCircle,
  Timer,
  HelpCircle,
  CircleOff,
} from 'lucide-react'

// 模块级常量无法使用 hook，label 存放完整 i18n key，由渲染组件通过 t(label) 显示
export const labels = [
  {
    value: 'bug',
    label: 'tasks.labelBug',
  },
  {
    value: 'feature',
    label: 'tasks.labelFeature',
  },
  {
    value: 'documentation',
    label: 'tasks.labelDocumentation',
  },
]

export const statuses = [
  {
    label: 'tasks.statusBacklog',
    value: 'backlog' as const,
    icon: HelpCircle,
  },
  {
    label: 'tasks.statusTodo',
    value: 'todo' as const,
    icon: Circle,
  },
  {
    label: 'tasks.statusInProgress',
    value: 'in progress' as const,
    icon: Timer,
  },
  {
    label: 'tasks.statusDone',
    value: 'done' as const,
    icon: CheckCircle,
  },
  {
    label: 'tasks.statusCanceled',
    value: 'canceled' as const,
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: 'tasks.priorityLow',
    value: 'low' as const,
    icon: ArrowDown,
  },
  {
    label: 'tasks.priorityMedium',
    value: 'medium' as const,
    icon: ArrowRight,
  },
  {
    label: 'tasks.priorityHigh',
    value: 'high' as const,
    icon: ArrowUp,
  },
  {
    label: 'tasks.priorityCritical',
    value: 'critical' as const,
    icon: AlertCircle,
  },
]
