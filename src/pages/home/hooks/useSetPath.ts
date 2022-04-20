import { useReposStore } from '@/store/repos'
const reposStore = useReposStore()

export function useSetPath(directorys) {
  const [root, ...paths] = directorys
  const path = paths.join('/')
  reposStore.setPath(path)
}
