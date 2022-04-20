interface Links {
  git: string
  html: string
  self: string
}

export interface GithubRepo {
  download_url: string
  git_url: string
  html_url: string
  name: string
  path: string
  sha: string
  size: number
  type: 'file' | 'dir'
  url: string
  __links: Links
}

export enum DirectoryType {
  File = 'file',
  Dir = 'dir',
}

export type DirectoryTypeValue<T> = T[keyof T]
