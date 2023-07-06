import useProjectStore from '@/store/project'
import type { Router } from 'vue-router'
import { MAIN_PATH, NOT_FOUND_PATH, PROJECT_DETAIL_PATH_NAME } from '../constant'
import { ProjectInfo } from '@/typings'

export const setupGetProjectInfoFilter = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const projectStore = useProjectStore()

    if (to.matched.find((item: any) => item.name === PROJECT_DETAIL_PATH_NAME)) {
      const project_id = to.params.project_id
      if (!projectStore.projectDetailInfo || projectStore.projectDetailInfo.id !== project_id) {
        try {
          const projectInfo: ProjectInfo = await projectStore.getProjectDetailInfo(project_id as string)

          if (!projectInfo) {
            return next(NOT_FOUND_PATH)
          }
          return next()
        } catch (error) {
          return next(MAIN_PATH)
        }
      }
    } else {
      projectStore.$patch({ projectDetailInfo: null })
    }

    next()
  })
}

export const setupGetProjectAuthInfoFilter = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const projectStore = useProjectStore()

    if (to.matched.find((route) => route.name === PROJECT_DETAIL_PATH_NAME)) {
      try {
        const projectAuthInfo = await projectStore.getProjectAuthInfo(to.params.project_id as string)
        console.log('1.项目权限详情获取：', JSON.stringify(projectAuthInfo))

        return next()
      } catch (error) {
        return next(MAIN_PATH)
      }
    } else {
      projectStore.$patch({ projectAuthInfo: null })
    }

    next()
  })
}
