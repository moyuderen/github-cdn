// SDK实现
import { warpFile, isImageUrl } from '../shared/index'
import { Jsdelivr } from '../jsdelivr/index'
import { OctokitWrap } from '../octokit/index'
import { GithubRepo, DirectoryType } from '../types/index'

export interface Config {
  token: string // 用户输入
  owner: string // 用户输入
  repo: string // 用户输入
  branch: string // 默认是main 可用户输入
  path?: string // 默认是跟目录
  message?: string // commit message 可用户输入？
}

const defaultConfig = {
  branch: 'main',
  path: '',
  message: 'feat: 上传文件',
}

export class Sdk {
  _inited: boolean
  config: Config
  octokitWrap: OctokitWrap

  constructor(config) {
    this._inited = false
    this.config = Object.assign(defaultConfig, config)
    // 校验配置是否正确
    if (!this.verifyConfig()) {
      return
    }

    this.octokitWrap = new OctokitWrap(this.config.token)
  }

  verifyConfig() {
    const { token } = this.config
    if (!token) {
      console.error('请先初始化')
    }
    this._inited = true
    return true
  }

  updateConfig(config: Config) {
    if (!this._inited) {
      console.warn('请先实例化')
    }
    this.config = Object.assign(defaultConfig, config)
    this.octokitWrap = new OctokitWrap(this.config.token)
    console.log('更新配置成功！')
  }

  private composePathToConfig(path) {
    return Object.assign(this.config, { path })
  }

  private markdownUrl(name, url) {
    return `[${name}](${url})`
  }

  private composeResult(repo: GithubRepo) {
    if (repo.type === DirectoryType.Dir) {
      return repo
    }
    const jsdelivr_url = Jsdelivr.transformGithubUrl2JsdelivrUrl(repo.html_url)

    let imageSign = '!'
    let downloadUrl = repo.download_url
    if (!isImageUrl(repo.html_url)) {
      imageSign = ''
    }
    const jsdelivr_url_md =
      imageSign + this.markdownUrl(repo.name, jsdelivr_url)
    const download_url_md = imageSign + this.markdownUrl(repo.name, downloadUrl)
    return {
      ...repo,
      jsdelivr_url,
      jsdelivr_url_md,
      download_url_md,
    }
  }

  async getFile(path = '') {
    try {
      const { data = [] } = await this.octokitWrap.getFile(
        this.composePathToConfig(path),
      )
      return data.map((repo: GithubRepo) => {
        return this.composeResult(repo)
      })
    } catch (err) {
      console.error(err)
    }
  }

  async createFile(file, path = '', newname = '') {
    const { pureBase64, name } = await warpFile(file)
    if (!newname) {
      newname = name
    }
    path = path ? path + '/' + newname : newname
    return this.octokitWrap.createFile({
      ...this.config,
      content: pureBase64,
      path,
      message: `upload: 上传${name}文件`,
    })
  }

  createDir(path = '', dirname = '') {
    path = path ? `${path}/${dirname}/.gitkeep` : `${dirname}/.gitkeep`
    return this.octokitWrap.createFile({
      ...this.config,
      path,
      content: 'LmdpdGtlZXA=',
      message: `feat: 新建目录${dirname}`,
    })
  }

  deleteFile(sha, path = '', message = '') {
    return this.octokitWrap.deleteFile({
      ...this.composePathToConfig(path),
      sha,
      message: `delete: 删除${message}文件`,
    })
  }
}
