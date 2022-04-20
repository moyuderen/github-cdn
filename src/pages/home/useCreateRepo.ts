import { ref } from 'vue'
import { Cdn } from '../../core/index'
import type { CreateConfig } from '../../core/cdn/create-file'
import { parseFile } from '../../utils/file'
import { useReposStore } from '@/store/repos'
const reposStore = useReposStore()

export async function useCreateRepo(
  cdn: Cdn,
  config: CreateConfig,
  rawFile: File,
) {
  const record = await parseFile(rawFile)
  const path = reposStore.path
    ? `${reposStore.path}/${record.name}`
    : record.name
  await cdn.createFile(
    {
      ...config,
      path,
    },
    record.peerBase64,
  )
}
