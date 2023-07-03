import { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { compile } from 'path-to-regexp'
import { getDocumentDetailPath, getProjectDetailPath } from './project.detail'

/**
 * 项目密钥校验
 */
export const projectVerificationRoute: RouteRecordRaw = {
  name: 'proejct.verification.route',
  path: '/project/:project_id/verification',
  meta: { ignoreAuth: true },
  component: MainLayout,
}

/**
 * 文档密钥校验
 */
export const collectionVerificationRoute: RouteRecordRaw = {
  name: 'collection.verification.route',
  path: '/share/:doc_public_id/verification',
  meta: { ignoreAuth: true },
  component: MainLayout,
}

/**
 * 文档密钥校验
 */
const DOCUMENT_SHARE_PATH = '/share/:doc_public_id'
export const shareDocumentRoute: RouteRecordRaw = {
  name: 'collection.detail.share',
  path: DOCUMENT_SHARE_PATH,
  meta: { ignoreAuth: true },
  component: MainLayout,
}

/**
 * 获取文档分享链接
 * @param doc_public_id
 * @returns
 */
export const getDocumentPrivateShareLink = (doc_public_id: string) => window.origin + (doc_public_id ? compile(DOCUMENT_SHARE_PATH)({ doc_public_id }) : '')
export const getDocumentPublicShareLink = (project_id: string, doc_id: string) => window.origin + (doc_id ? getDocumentDetailPath(project_id, doc_id) : '')
export const getProjectShareLink = (project_public_id: string) => window.origin + getProjectDetailPath(project_public_id)
