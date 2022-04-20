import { GithubRep } from '../types/interface'

export interface CallBack {
  onsuccess?: (response: any, options: any) => void
  onerror?: (error: any, options: any) => void
}

export interface Response {
  status: number
  headers: object
  url: string
  data: GithubRep[]
}
