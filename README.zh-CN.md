# Shadcn Admin 中后台管理系统

[English](README.md) | [简体中文](README.zh-CN.md)

基于 **React 19 + Vite 8 + Tailwind CSS v4 + Shadcn UI** 构建的高性能、高可维护性现代化中后台管理脚手架。专为响应式适配、无障碍访问（a11y）与深度国际化而打造。

![系统预览](public/images/shadcn-admin.png)

---

## ✨ 核心特性

- **多语言国际化 (i18n)**：基于 `i18next` 与 `react-i18next`，开箱即用支持**简体中文**与**英文**实时无感切换。
- **自托管中文字体**：预置自托管 `@fontsource-variable/noto-sans-sc` 中文字体与 `Inter` / `Manrope` 英文字体，运行时零外网请求依赖。
- **现代化样式体系**：采用最新的 **Tailwind CSS v4** 原生引擎，告别繁重配置文件，构建与热更新秒级响应。
- **全链路类型安全路由**：基于 **TanStack Router** 的文件式路由（File-based Routing），支持意图预加载（`preload: 'intent'`）与严格编译期类型检查。
- **丰富的数据展现与交互**：
  - 无头表格：集成 **TanStack Table v8**，支持排序、多重筛选、分页与批量操作；
  - 响应式图表：结合 **Recharts** 与 Shadcn Chart 定制规范，支持平滑数据可视化；
  - 全局命令面板：支持 `Ctrl + K` / `Cmd + K` 快捷搜索与页面直达；
  - 主题与外观：支持亮色 / 深色 / 跟随系统主题，支持 LTR / RTL 双向布局。
- **真实浏览器测试体系**：采用 **Vitest 4 + Playwright Browser** 驱动真实 Chromium 环境进行高保真组件测试。

---

## 🛠️ 技术选型

| 模块 | 技术方案 | 说明 |
| :--- | :--- | :--- |
| **基础框架** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | 最新 React 并发渲染与强类型保障 |
| **构建工具** | [Vite 8](https://vitejs.dev/) + [@tailwindcss/vite](https://tailwindcss.com/) | 极速冷启动与 HMR |
| **路由系统** | [TanStack Router](https://tanstack.com/router) | 文件约定路由、类型安全导航 |
| **服务端状态** | [TanStack Query v5](https://tanstack.com/query) | 接口请求缓存、自动重试与全局错误拦截 |
| **全局轻量状态** | [Zustand v5](https://zustand.docs.pmnd.rs/) | 极简认证与状态管理 |
| **UI 组件原语** | [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/) | 无黑盒封装，源码位于 `src/components/ui` |
| **国际化 (i18n)** | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) | 动态多语言加载与持久化检测 |
| **表单与校验** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | 声明式表单验证 |
| **图表库** | [Recharts 3](https://recharts.org/) | 响应式 SVG 数据图表 |
| **测试框架** | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) | 真实浏览器组件测试与端到端验证 |

---

## 📁 目录结构

```
src/
├── assets/                  # 静态资源与矢量图标
├── components/              # 通用组件库
│   ├── layout/              # 整体框架布局（Header, AppSidebar, NavGroup 等）
│   ├── ui/                  # Shadcn UI 原子组件（Button, Dialog, Table 等）
│   ├── command-menu.tsx     # 全局快捷指令搜索面板 (Cmd+K)
│   ├── language-switch.tsx  # 多语言切换器
│   └── theme-switch.tsx     # 亮暗主题切换器
├── config/                  # 字体与全局配置
├── context/                 # 全局 Context（主题、字体、方向、搜索）
├── features/                # 业务领域模块（Feature-Driven）
│   ├── dashboard/           # 仪表盘与图表
│   ├── tasks/               # 任务管理看板与 DataTable
│   ├── users/               # 用户列表与增删改查弹窗
│   └── settings/            # 系统偏好（外观、个人、账号、通知等）
├── lib/                     # 核心工具库（i18n 配置、Axios 拦截器、Cookie 操作等）
├── locales/                 # 国际化语言包资源（zh-CN.json, en-US.json 等）
├── routes/                  # TanStack Router 路由定义（自动生成 routeTree.gen.ts）
├── stores/                  # Zustand 全局 Store（如 auth-store.ts）
└── styles/                  # 样式配置（index.css 接入 Tailwind v4 与自托管字体）
```

---

## 🚀 本地开发快速上手

### 1. 克隆代码仓库

```bash
git clone git@github.com:yak33/shadcn-admin.git
cd shadcn-admin
```

### 2. 安装依赖

推荐使用 `pnpm` 进行依赖安装：

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run dev
```

启动完成后，在浏览器中打开控制台输出的本地服务地址（通常为 `http://localhost:5173`）。

---

## 📜 常用命令脚本

| 命令 | 说明 |
| :--- | :--- |
| `pnpm run dev` | 启动本地 Vite 开发服务器（支持 HMR） |
| `pnpm run build` | 执行 TypeScript 类型编译与生产环境打包 |
| `pnpm run preview` | 本地预览生产构建产物 |
| `pnpm run lint` | 执行 ESLint 静态代码检查 |
| `pnpm run format` | 执行 Prettier 代码自动化格式化 |
| `pnpm run knip` | 检测项目中未引用的多余文件、导出和依赖 |
| `pnpm run test` | 使用真实浏览器执行 Vitest 单元/组件测试 |
| `pnpm run test:ui` | 打开 Vitest 图形化测试界面 |

---

## 🌐 国际化多语言扩展说明

本项目已配置完善的国际化体系：
1. **语言包路径**：`src/locales/`
   - `zh-CN.json`：简体中文资源包
   - `en-US.json`：英文资源包
2. **在组件中使用**：
   ```tsx
   import { useTranslation } from 'react-i18next'

   export function MyComponent() {
     const { t } = useTranslation()
     return <button>{t('common.confirm', { defaultValue: '确认' })}</button>
   }
   ```
3. **切换语言**：顶栏右侧包含 `LanguageSwitch` 组件，选择后将自动记录到浏览器的 `localStorage` 中并在后续访问中保持。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。
