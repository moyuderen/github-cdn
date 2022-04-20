// Jsdelivr 实现，基于github url
const JsDelivrCdnPrefix = 'https://cdn.jsdelivr.net/gh'
const GithubPrefix = 'https://github.com/'

// https://github.com/moyuderen/octokit-cdn/blob/main/WechatIMG329.jpeg
// https://cdn.jsdelivr.net/gh/moyuderen/octokit-cdn/WechatIMG329.jpeg

export class Jsdelivr {
  static transformGithubUrl2JsdelivrUrl(githubUrl) {
    // repoInfo: moyuderen/octokit-cdn/blob/main/WechatIMG329.jpeg
    const repoInfo = githubUrl.split(GithubPrefix)[1]
    // onwerRepo:  moyuderen/octokit-cdn
    // branchPath: main/WechatIMG329.jpeg
    const [onwerRepo, branchPath] = repoInfo.split('/blob/')
    // branch: main
    // paths: ['WechatIMG329.jpeg']
    const [branch, ...paths] = branchPath.split('/')
    // path: WechatIMG329.jpeg
    const path = paths.join('/')
    // https://cdn.jsdelivr.net/gh/moyuderen/octokit-cdn/WechatIMG329.jpeg
    return `${JsDelivrCdnPrefix}/${onwerRepo}/${path}`
  }
}
