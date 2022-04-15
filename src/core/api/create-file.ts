import Octokit from '../octokit';

interface Committer {
  /** 提交人 */
  name: string;
  /** 提交人邮箱 */
  email: string;
}

export interface Config {
  /** github token */
  token: string;
  /** github用户名称 */
  owner: string;
  /** 仓库名称 */
  repo: string;
  /** 分支名称 */
  branch?: string;
  /** 路径 */
  path?: string;
  /**commit message */
  message?: string;
  /** 提交人信息 */
  committer?: Committer;
}

export default async function createFile(
  octokit: Octokit,
  config: Config,
  content: string,
) {
  const { owner, repo, path, branch, message, committer } = config;
  const url = `PUT /repos/${owner}/${repo}/contents/${path}`;
  const response = await octokit.request(url, {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
    branch,
    message,
    committer,
    content,
  });
  return response;
}
