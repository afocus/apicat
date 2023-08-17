import type { CollectionNode } from '@/typings/project'
import AcTree from '@/components/AcTree'
import useDocumentStore from '@/store/document'
import useApi from '@/hooks/useApi'
import { TreeOptionProps } from '@/components/AcTree/tree.type'
import { DocumentTypeEnum } from '@/commons/constant'
import { useGoPage } from '@/hooks/useGoPage'
import { useActiveTree } from './useActiveTree'
import { moveCollection } from '@/api/collection'
import { useParams } from '@/hooks/useParams'
import { storeToRefs } from 'pinia'
import { DOCUMENT_DETAIL_NAME, DOCUMENT_EDIT_NAME, ITERATION_DOCUMENT_DETAIL_NAME, ITERATION_DOCUMENT_EDIT_NAME } from '@/router'
import { createTreeMaxDepthFn } from '@/commons'

/**
 * 获取节点树最大深度
 */
const getTreeMaxDepth = createTreeMaxDepthFn('items')

export const useDocumentTree = () => {
  const router = useRouter()
  const documentStore = useDocumentStore()
  const { project_id, computedRouteParams } = useParams()
  const { goDocumentDetailPage, goDocumentEditPage } = useGoPage()

  const { getApiDocTree } = documentStore
  const [isLoading, getApiDocTreeApi] = useApi(getApiDocTree)
  const { apiDocTree } = storeToRefs(documentStore)

  const treeOptions: TreeOptionProps = {
    children: 'items',
    label: 'title',
    class: (data): string => {
      const classNames = [(data as CollectionNode)._extend?.isLeaf ? 'is-doc' : 'is-dir']

      // 隐藏未规划的接口信息
      if (data.selected !== undefined && data.selected === false) {
        classNames.push('hidden')
      }

      return classNames.join(' ')
    },
    isLeaf: (data): boolean => (data as CollectionNode).type === DocumentTypeEnum.DOC,
  }

  const treeIns = ref<InstanceType<typeof AcTree>>()

  const { reactiveNode, activeNode } = useActiveTree(treeIns as any)

  // 是否在当前模块中
  const isCurrentMoudleRouter = computed(() =>
    [DOCUMENT_DETAIL_NAME, DOCUMENT_EDIT_NAME, ITERATION_DOCUMENT_DETAIL_NAME, ITERATION_DOCUMENT_EDIT_NAME].includes(router.currentRoute.value.name as any)
  )

  /**
   * 目录树 点击
   */
  const handleTreeNodeClick = (node: any, source: any, e: Event) => {
    // 重命名输入框
    if ((e?.target as HTMLElement).tagName === 'INPUT') {
      e.preventDefault()
      return
    }

    // 文档点击
    if (source._extend.isLeaf) {
      goDocumentDetailPage(source.id)
      // router.push(getDocumentDetailPath(project_id as string, source.id))
      return
    }

    // 目录点击
    node.expanded = !node.expanded
  }

  /**
   * 允许拖拽
   */
  const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
    const { data: dropNodeData } = dropNode
    const { data: draggingNodeData } = draggingNode

    // 不允许拖放在文件中
    if (dropNodeData._extend.isLeaf && type === 'inner') {
      return false
    }

    // 拖动目录时
    if (!draggingNodeData._extend.isLeaf && !dropNodeData._extend.isLeaf) {
      return getTreeMaxDepth(draggingNodeData) + dropNode.level <= 5
    }

    return true
  }

  let oldDraggingNodeInfo: any = null

  // 开始拖拽，记录旧节点位置数据
  const onMoveNodeStart = (draggingNode: any) => {
    const oldParent = draggingNode.parent

    oldDraggingNodeInfo = {
      oldPid: oldParent.id === 0 ? null : oldParent.key,
      oldChildIds: oldParent.childNodes.filter((item: any) => item.id !== draggingNode.id).map((item: any) => item.key),
    }
  }

  // 拖拽完成，更新新节点位置数据
  const onMoveNode = (draggingNode: any, dropNode: any, dropType: string) => {
    if (!oldDraggingNodeInfo) {
      return
    }

    const { oldPid, oldChildIds } = oldDraggingNodeInfo

    const isSeamLevel = oldPid === dropNode.parent.id && dropType !== 'inner'
    const newParent = treeIns.value?.getNode(draggingNode.data).parent

    // 手动展开父节点
    if (!newParent.expanded) {
      newParent.expanded = true
    }

    const newPid = newParent.id === 0 ? null : newParent.key
    const newChildIds = newParent.childNodes.map((item: any) => item.key)

    const sortParams = {
      target: {
        pid: newPid,
        ids: newChildIds,
      },
      origin: {
        pid: isSeamLevel ? newPid : oldPid,
        ids: isSeamLevel ? newChildIds : oldChildIds,
      },
    }

    oldDraggingNodeInfo = null
    moveCollection(project_id as string, sortParams)
  }

  const updateTitle = (id: any, title: string) => {
    const node = treeIns.value?.getNode(id)
    if (node && node?.data?.title) {
      node.data.title = title || node.data.title
    }
  }

  const initDocumentTree = async (activeDocId?: any) => {
    await getApiDocTreeApi(project_id as string)
    const { doc_id } = unref(computedRouteParams)
    if (unref(isCurrentMoudleRouter)) {
      doc_id ? activeNode(activeDocId || doc_id) : reactiveNode()
    }
  }

  const redirecToDocumentEditPage = (activeId: any) => {
    goDocumentEditPage(activeId)
    initDocumentTree(activeId)
  }

  const redirecToDocumentDetailPage = (activeId: any) => {
    goDocumentDetailPage(activeId)
    initDocumentTree(activeId)
  }

  onMounted(async () => initDocumentTree())

  onUnmounted(() => documentStore.$reset())

  return {
    isLoading,

    treeIns,
    treeOptions,
    apiDocTree,

    handleTreeNodeClick,
    allowDrop,
    onMoveNodeStart,
    onMoveNode,
    updateTitle,

    initDocumentTree,

    redirecToDocumentEditPage,
    redirecToDocumentDetailPage,
  }
}
