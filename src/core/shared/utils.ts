import { DirectoryType } from '../types/interface'

export const isGithubFile = (type: string) => {
  return DirectoryType.File === type
}

export const isGithubDir = (type: string) => {
  return DirectoryType.Dir === type
}
