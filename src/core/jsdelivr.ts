import { GithubRep } from './interface';

// https://github.com/ 被替换为 https://cdn.jsdelivr.net/gh/
// moyuderen 保持不变
// CDN 保持不变
// blob 删除二进制的目录
// main: 删除分支名称
// moyuderen/blog/srd-about.png: 保持不变

const GithubUrl = 'https://github.com/';
const JsDelivrCdnUrl = 'https://cdn.jsdelivr.net/gh';

export default class JsDelivr {
  public githubRep?: GithubRep;

  constructor(githubRep?: GithubRep) {
    this.githubRep = githubRep;
  }

  transformToJsDelivr(githubHtmluUrl: string) {
    // "https://github.com/moyuderen/octokit-cdn/blob/main/.gitignore"
    const repoInfo = githubHtmluUrl.split(GithubUrl)[1];
    const [ownerAndRepo, other] = repoInfo.split('/blob/');
    // console.log(ownerAndRepo, other);
    const [branch, ...paths] = other.split('/');
    const path = paths.join('/');
    const url = `${JsDelivrCdnUrl}/${ownerAndRepo}/${path}`;

    return url;
  }
}
