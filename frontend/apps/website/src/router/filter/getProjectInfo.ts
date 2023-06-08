import uesProjectStore from '@/store/project'
import { Router } from 'vue-router'

export const setupGetProjectInfoFilter = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const projectStore = uesProjectStore()

    if (to.matched.find((item: any) => item.name === 'project.detail')) {
      const project_id = to.params.project_id
      if (!projectStore.projectDetailInfo || projectStore.projectDetailInfo.id !== project_id) {
        try {
          await projectStore.getProjectDetailInfo(project_id as string)
          return next()
        } catch (error) {
          router.replace('/main')
        }
      }
    }

    next()
  })
}
