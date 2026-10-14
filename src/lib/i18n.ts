import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import zhCN from '@/locales/zh-CN.json'
import enUS from '@/locales/en-US.json'
import apps from '@/locales/modules/apps.json'
import auth from '@/locales/modules/auth.json'
import chats from '@/locales/modules/chats.json'
import common2 from '@/locales/modules/common2.json'
import errors from '@/locales/modules/errors.json'
import settings from '@/locales/modules/settings.json'
import tasks from '@/locales/modules/tasks.json'
import users from '@/locales/modules/users.json'

// 各业务模块词条独立维护在 src/locales/modules/（每文件含 zh-CN/en-US 两段），
// 在此按模块名合并进对应语言的 translation 资源段，代码中用 t('模块名.key') 调用
const moduleEntries = { apps, auth, chats, common2, errors, settings, tasks, users }
const pickModules = (lang: 'zh-CN' | 'en-US') =>
  Object.fromEntries(
    Object.entries(moduleEntries).map(([name, mod]) => [name, mod[lang]])
  )

// 资源必须带 translation 命名空间层：{ [语言]: { [ns]: 词条 } }
const resources = {
  'zh-CN': { translation: { ...zhCN, ...pickModules('zh-CN') } },
  'en-US': { translation: { ...enUS, ...pickModules('en-US') } },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // 注意：i18next 26 下 supportedLngs + nonExplicitSupportedLngs 组合会导致
    // 所有 t() 查询失效（静默返回 key），语言归一化改由 fallbackLng 函数实现
    fallbackLng: (lng) => (lng ?? '').startsWith('zh') ? 'zh-CN' : 'en-US',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'shadcn_admin_lang',
      caches: ['localStorage'],
    },
    // 开发期缺 key 直接在控制台暴露，不再静默回退
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (_lngs, _ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] 缺少词条 key: ${key}`)
      }
    },
  })
