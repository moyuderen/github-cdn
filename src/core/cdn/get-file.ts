import Octokit from '../octokit'
export interface getReposConfig {
  /** github用户名称 */
  owner: string
  /** 仓库名称 */
  repo: string
  /** 分支名称 或者tag */
  ref?: string
  /** 路径 */
  path?: string
}

const defConfig = {
  path: '/',
  ref: 'main',
}

export default async function getFile(
  octokit: Octokit,
  config: getReposConfig,
) {
  const owner = config.owner
  const repo = config.repo
  const path = defConfig.path + config.path
  const ref = config.ref || defConfig.ref
  const url = `GET /repos/${owner}/${repo}/contents${path}?ref=${ref}`
  return octokit.request(url, {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
  })
}
