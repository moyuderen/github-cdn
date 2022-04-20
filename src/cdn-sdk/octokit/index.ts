// @ts-ignore
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core'
import { useOctokitHooks } from './hooks'

export class OctokitWrap {
  octokit: Octokit
  auth: string

  constructor(auth) {
    this.octokit = new Octokit({ auth })
    useOctokitHooks(this.octokit)
  }

  getFile(params) {
    const { owner, repo, path, branch } = params
    // ref可以是branch 或者 tag, 本次只考虑branch
    return this.octokit.request(
      `GET /repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH',
      },
    )
  }

  createFile(params) {
    const { owner, repo, path, branch, message, committer, content } = params
    return this.octokit.request(
      `PUT /repos/${owner}/${repo}/contents/${path}`,
      {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH',
        branch,
        message,
        committer,
        content,
      },
    )
  }

  deleteFile(params) {
    const { owner, repo, branch, message, committer, path, sha } = params
    return this.octokit.request(
      `DELETE /repos/${owner}/${repo}/contents/${path}`,
      {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH',
        branch,
        message, // 必填
        committer,
        sha, // 必填
      },
    )
  }
}

export { Octokit }
