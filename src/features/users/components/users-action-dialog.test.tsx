import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { type UserEvent, userEvent } from 'vitest/browser'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { type User } from '../data/schema'
import { UsersActionDialog } from './users-action-dialog'

// 测试环境未初始化 i18n，t(key) 直接渲染 key 本身，因此断言使用 i18n key
const VALIDATION_MESSAGES = {
  firstName: 'users.firstNameRequired',
  lastName: 'users.lastNameRequired',
  username: 'users.usernameRequired',
  phoneNumber: 'users.phoneNumberRequired',
  email: 'users.emailRequired',
  role: 'users.roleRequired',
  password: 'users.passwordRequired',
  passwordMismatch: 'users.passwordMismatch',
  passwordLength: 'users.passwordMinLength',
  passwordNumber: 'users.passwordNumber',
  passwordLowercase: 'users.passwordLowercase',
} as const

const MOCK_USER: User = {
  id: 'alex_uuid',
  firstName: 'Alex',
  lastName: 'Smith',
  username: 'alex_smith',
  email: 'alex@smith.com',
  phoneNumber: '+19999999999',
  status: 'active',
  role: 'superadmin',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-02-02'),
}

vi.mock('@/lib/show-submitted-data', () => ({ showSubmittedData: vi.fn() }))

describe('UsersActionDialog', () => {
  beforeEach(() => vi.clearAllMocks())

  describe('add user', () => {
    it('renders title and description', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const title = getByRole('heading', {
        level: 2,
        name: 'users.addNewUser',
      })
      const description = getByText('users.addUserDesc')

      await expect.element(title).toBeInTheDocument()
      await expect.element(description).toBeInTheDocument()
    })

    it('shows validation messages when the form is submitted with empty fields', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const submitButton = getByRole('button', { name: 'users.saveChanges' })
      await userEvent.click(submitButton)

      await expect
        .element(getByText(VALIDATION_MESSAGES.firstName))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.lastName))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.username))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.phoneNumber))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.email))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.role))
        .toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.password))
        .toBeInTheDocument()
    })

    it('keeps confirm password disabled until password field is touched', async () => {
      const { getByRole } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const password = getByRole('textbox', { name: /^users\.password$/ })
      const confirmPassword = getByRole('textbox', {
        name: /^users\.confirmPassword$/,
      })
      await expect.element(confirmPassword).toBeDisabled()

      await userEvent.type(password, 'a')
      await expect.element(confirmPassword).toBeEnabled()
    })

    it('shows password validation messages when password is invalid', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} />
      )

      const password = getByRole('textbox', { name: /^users\.password$/ })
      const confirmPassword = getByRole('textbox', {
        name: /^users\.confirmPassword$/,
      })
      await userEvent.type(password, 'a')
      await userEvent.type(confirmPassword, 'b')
      const submitButton = getByRole('button', { name: 'users.saveChanges' })

      await userEvent.click(submitButton)

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .toBeInTheDocument()

      await userEvent.fill(password, 'short')

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLength))
        .toBeInTheDocument()

      await userEvent.fill(password, 'ONLYUPPERCASE')

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLowercase))
        .toBeInTheDocument()

      await userEvent.fill(password, 'onlylowercase')

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordNumber))
        .toBeInTheDocument()

      await userEvent.fill(password, 'S3cur3P@ssw0rd')
      await userEvent.fill(confirmPassword, 'S3cur3P@ssw0rd')

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .not.toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordLength))
        .not.toBeInTheDocument()
      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordNumber))
        .not.toBeInTheDocument()
    })

    it('shows the submitted data when the form is submitted successfully', async () => {
      const onOpenChange = vi.fn()

      const screen = await render(
        <UsersActionDialog open onOpenChange={onOpenChange} />
      )

      await fillRequiredProfileFields(userEvent, screen, MOCK_USER)

      await fillPasswords(userEvent, screen, 'S3cur3P@ssw0rd', 'S3cur3P@ssw0rd')

      const submitButton = screen.getByRole('button', {
        name: 'users.saveChanges',
      })
      await userEvent.click(submitButton)

      expect(onOpenChange).toHaveBeenCalledOnce()
      expect(onOpenChange).toHaveBeenCalledWith(false)

      expect(showSubmittedData).toHaveBeenCalledOnce()
      expect(showSubmittedData).toHaveBeenCalledWith({
        firstName: MOCK_USER.firstName,
        lastName: MOCK_USER.lastName,
        username: MOCK_USER.username,
        email: MOCK_USER.email,
        role: MOCK_USER.role,
        phoneNumber: MOCK_USER.phoneNumber,
        password: 'S3cur3P@ssw0rd',
        confirmPassword: 'S3cur3P@ssw0rd',
        isEdit: false,
      })
    })
  })

  describe('edit user', () => {
    it('renders title and description', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
      )

      const title = getByRole('heading', {
        level: 2,
        name: 'users.editUser',
      })
      const description = getByText('users.editUserDesc')

      await expect.element(title).toBeInTheDocument()
      await expect.element(description).toBeInTheDocument()
    })

    it('submits without password changes', async () => {
      const onOpenChange = vi.fn()
      const screen = await render(
        <UsersActionDialog
          open
          onOpenChange={onOpenChange}
          currentRow={MOCK_USER}
        />
      )

      const submitButton = screen.getByRole('button', {
        name: 'users.saveChanges',
      })
      await userEvent.click(submitButton)

      expect(onOpenChange).toHaveBeenCalledOnce()
      expect(onOpenChange).toHaveBeenCalledWith(false)

      expect(showSubmittedData).toHaveBeenCalledOnce()
      expect(showSubmittedData).toHaveBeenCalledWith({
        firstName: MOCK_USER.firstName,
        lastName: MOCK_USER.lastName,
        username: MOCK_USER.username,
        email: MOCK_USER.email,
        phoneNumber: MOCK_USER.phoneNumber,
        role: MOCK_USER.role,
        password: '',
        confirmPassword: '',
        isEdit: true,
      })
    })

    it('requires confirm password when password is changed', async () => {
      const { getByRole, getByText } = await render(
        <UsersActionDialog open onOpenChange={vi.fn()} currentRow={MOCK_USER} />
      )

      const password = getByRole('textbox', { name: /^users\.password$/ })
      const confirmPassword = getByRole('textbox', {
        name: /^users\.confirmPassword$/,
      })

      await userEvent.fill(password, 'S3cur3P@ssw0rd')
      await expect.element(confirmPassword).toBeEnabled()

      const submitButton = getByRole('button', { name: 'users.saveChanges' })
      await userEvent.click(submitButton)

      await expect
        .element(getByText(VALIDATION_MESSAGES.passwordMismatch))
        .toBeInTheDocument()
    })

    it('shows the submitted data when the form is submitted successfully', async () => {
      const onOpenChange = vi.fn()
      const screen = await render(
        <UsersActionDialog
          open
          onOpenChange={onOpenChange}
          currentRow={MOCK_USER}
        />
      )

      const EDIT_SUCCESS_FIRST_NAME = 'John'
      const EDIT_SUCCESS_PASSWORD = 'S3cur3P@ssw0rd'

      await userEvent.fill(
        screen.getByLabelText('users.firstName'),
        EDIT_SUCCESS_FIRST_NAME
      )
      await fillPasswords(
        userEvent,
        screen,
        EDIT_SUCCESS_PASSWORD,
        EDIT_SUCCESS_PASSWORD
      )

      const submitButton = screen.getByRole('button', {
        name: 'users.saveChanges',
      })
      await userEvent.click(submitButton)

      expect(onOpenChange).toHaveBeenCalledOnce()
      expect(onOpenChange).toHaveBeenCalledWith(false)

      expect(showSubmittedData).toHaveBeenCalledOnce()
      expect(showSubmittedData).toHaveBeenCalledWith({
        firstName: EDIT_SUCCESS_FIRST_NAME,
        lastName: MOCK_USER.lastName,
        username: MOCK_USER.username,
        email: MOCK_USER.email,
        phoneNumber: MOCK_USER.phoneNumber,
        role: MOCK_USER.role,
        password: EDIT_SUCCESS_PASSWORD,
        confirmPassword: EDIT_SUCCESS_PASSWORD,
        isEdit: true,
      })
    })
  })
})

async function fillRequiredProfileFields(
  user: UserEvent,
  screen: RenderResult,
  overrides?: {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    roleOption?: string | RegExp
    phoneNumber?: string
  }
) {
  const entries = [
    ['users.firstName', overrides?.firstName ?? 'John'],
    ['users.lastName', overrides?.lastName ?? 'Doe'],
    ['users.username', overrides?.username ?? 'john_doe'],
    ['users.email', overrides?.email ?? 'a@b.co'],
    ['users.phoneNumber', overrides?.phoneNumber ?? '+19999999999'],
  ] as const

  for (const [label, value] of entries) {
    const el = screen.getByLabelText(label)
    await expect.element(el).toBeInTheDocument()
    await user.fill(el, value)
  }

  const roleSelect = screen.getByRole('combobox', { name: 'users.role' })
  await user.click(roleSelect)
  await user.click(
    screen.getByRole('option', {
      name: overrides?.roleOption ?? 'users.roleSuperadmin',
    })
  )
}

async function fillPasswords(
  user: UserEvent,
  screen: RenderResult,
  a: string,
  b: string
) {
  const password = screen.getByLabelText(/^users\.password$/)
  const confirmPassword = screen.getByLabelText(/^users\.confirmPassword$/)
  await user.fill(password, a)
  await user.fill(confirmPassword, b)
}
