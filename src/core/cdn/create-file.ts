import Octokit from '../octokit'
interface Committer {
  /** 提交人 */
  name: string
  /** 提交人邮箱 */
  email: string
}

export interface CreateConfig {
  /** github token */
  token: string
  /** github用户名称 */
  owner: string
  /** 仓库名称 */
  repo: string
  /** 分支名称 */
  branch?: string
  /** 路径 */
  path?: string
  /**commit message */
  message?: string
  /** 提交人信息 */
  committer?: Committer
}

export const defConfig = {
  branch: 'main',
  path: '/',
  message: 'feat: 上传文件',
  committer: {
    name: 'moyuderen',
    email: 'moyuderen2021@163.com',
  },
}

export default async function createFile(
  octokit: Octokit,
  config: CreateConfig,
  content: string,
) {
  const owner = config.owner
  const repo = config.repo
  const path = defConfig.path + config.path
  const branch = config.branch || defConfig.branch
  const message = config.message || defConfig.message
  const committer = defConfig.committer
  const url = `PUT /repos/${owner}/${repo}/contents${path}`
  return octokit.request(url, {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
    branch,
    message,
    committer,
    content,
  })
}
