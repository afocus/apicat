import { useUserStoreWithOut } from '@/store/user'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_URL, PERMISSION_CHANGE_CODE, REQUEST_TIMEOUT } from '@/commons/constant'
import { ElMessage, ElMessageBox } from 'element-plus'
import Storage from '@/commons/storage'
import { LOGIN_PATH, PROJECT_SHARE_VALIDATION_NAME, getDocumentVerificationPath, router } from '@/router'
import { i18n } from '@/i18n'
import { TargetMemberPermissionError } from './error'
import { Cookies } from '@/commons'

axios.defaults.timeout = REQUEST_TIMEOUT

const baseConfig = {
  baseURL: API_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
}

let isShowPermissionChangeModal = false

export const DefaultAjax = axios.create(baseConfig)
export const QuietAjax = axios.create(baseConfig)
export const MockAjax = axios.create({
  ...baseConfig,
  validateStatus: function () {
    return true
  },
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Storage.get(Storage.KEYS.TOKEN)
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
}

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  const useUserStore = useUserStoreWithOut()

  let errorMsg = ''
  if (axios.isAxiosError(error)) {
    const { response = { data: {} } } = error
    const { status } = (error.response as AxiosResponse) ?? {}
    const { t } = i18n.global as any
    errorMsg = response.data.message

    switch (status) {
      case 401: // 未登录
        useUserStore.logout()
        setTimeout(() => router.replace(LOGIN_PATH), 0)
        break

      case 403: // 无权限
        const { code } = response.data
        errorMsg = ''

        if (isShowPermissionChangeModal) {
          ElMessage.closeAll()
          return Promise.reject(error)
        }

        code === PERMISSION_CHANGE_CODE.USER_PREMISSION_ERROR &&
          ElMessageBox({
            type: 'warning',
            title: t('app.tips.permissionChangeTitle'),
            message: t('app.user.tips.permissionChange'),
            'show-close': false,
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            'show-cancel-button': false,
            confirmButtonText: t('app.common.confirm'),
            callback() {
              isShowPermissionChangeModal = true
              location.reload()
            },
          } as any)

        code === PERMISSION_CHANGE_CODE.MEMBER_PREMISSION_ERROR &&
          ElMessageBox({
            type: 'warning',
            title: t('app.tips.permissionChangeTitle'),
            message: t('app.project.tips.permissionChange'),
            'show-close': false,
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            'show-cancel-button': false,
            confirmButtonText: t('app.common.confirm'),
            callback() {
              isShowPermissionChangeModal = true
              location.reload()
            },
          } as any)

        if (code === PERMISSION_CHANGE_CODE.TARGET_MEMBER_PREMISSION_ERROR) {
          error = new TargetMemberPermissionError()
        }

        if (code === PERMISSION_CHANGE_CODE.SHARE_KEY_ERROR) {
          const currentRouteMatched = router.currentRoute.value.matched
          const params = router.currentRoute.value.params
          const { doc_public_id, project_id } = params as Record<string, string>

          // 预览分享的文档
          if (currentRouteMatched.find((route) => route.name === 'share.document')) {
            Cookies.remove(Cookies.KEYS.SHARE_DOCUMENT + (doc_public_id || ''))
            setTimeout(() => router.replace(getDocumentVerificationPath(doc_public_id)), 0)
          }

          // 预览分享的项目
          if (currentRouteMatched.find((route) => route.name === 'document.detail')) {
            Cookies.remove(Cookies.KEYS.SHARE_DOCUMENT + (project_id || ''))
            setTimeout(
              () =>
                router.replace({
                  name: PROJECT_SHARE_VALIDATION_NAME,
                  params: { project_id },
                }),
              0
            )
          }
        }
        break

      case 400: // bad request
      case 404: // not found
        break

      default:
        errorMsg = errorMsg || error.message || 'server error'
        break
    }
  }

  ElMessage.closeAll()
  errorMsg && ElMessage.error(errorMsg)
  return Promise.reject(error)
}

DefaultAjax.interceptors.request.use(onRequest, onErrorResponse)
DefaultAjax.interceptors.response.use((response: AxiosResponse) => {
  if (response.status > 200) {
    ElMessage.closeAll()
    ElMessage.success(response.data.message || 'success')
  }
  return response.data
}, onErrorResponse)

QuietAjax.interceptors.request.use(onRequest, onErrorResponse)
QuietAjax.interceptors.response.use((response: AxiosResponse) => response.data, onErrorResponse)

MockAjax.interceptors.request.use(onRequest, onErrorResponse)

// 默认请求实例
export default DefaultAjax
