import { defineAsyncComponent, App, Component } from 'vue'

import {
  ElMessage,
  ElMessageBox,
  ElTag,
  ElAvatar,
  ElInput,
  ElOption,
  ElSelect,
  ElFormItem,
  ElForm,
  ElUpload,
  ElButton,
  ElImage,
  ElAlert,
  ElDialog
} from 'element-plus'

const TgPage = defineAsyncComponent(
  () => import('@/components/layout/Page.vue')
)

const Heading = defineAsyncComponent(() => import('@/components/Heading.vue'))

type ComponentInstall = {
  name: string
  component: Component
}

export const installComponents = (app: App) => {
  const components: ComponentInstall[] = [
    { name: 'ElDialog', component: ElDialog },
    { name: 'ElImage', component: ElImage },
    { name: 'tg-page', component: TgPage },
    { name: 'heading', component: Heading },
    { name: 'ElTag', component: ElTag },
    { name: 'ElAvatar', component: ElAvatar },
    { name: 'ElInput', component: ElInput },
    { name: 'ElOption', component: ElOption },
    { name: 'ElSelect', component: ElSelect },
    { name: 'ElFormItem', component: ElFormItem },
    { name: 'ElForm', component: ElForm },
    { name: 'ElUpload', component: ElUpload },
    { name: 'ElAlert', component: ElAlert },

    {
      name: 'ElButton',
      component: ElButton
    }
  ]

  const plugins = [ElMessage, ElMessageBox]

  components.forEach(({ name, component }) => {
    app.component(name, component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
