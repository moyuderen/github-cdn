todo:

- [ ] 单例模式
- [ ]  初始化的实现
- [ ]  jsdeliver的实现 

```js

// 来自全局的store
const config = {
  token: 'xxxx',
  owner: 'xx',
  repo: '',
  branch: '',
  path: '',
  message: '',
  committer: {
    name: '',
    email: ''
  }
}

// main.ts 初始化
const sdk = createSdk(config)

// 组件中使用
import sdk from './sdk'

sdk.getFile()
sdk.createFile(content)
sdk.deleteFile(sha)

// 更新配置config
sdk.updateConfig(conofig)


```

```typescript
// Utils

export async function warpFile(file)  {
  const base64 = await file2Base64(file)
  const pureBase64 = base64.split(',')[1];
  
  return {
    name: file.name,
    file,
    base64,
    pureBase64
  }
}

function file2Base64(file: File) {
  return new Promise<string>((rosolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string);
    };
    reader.readAsDataURL(file);
  })
}



```



```typescript
// SDK实现
import { warpFile } from './utils'

interface Config {
  token: '', // 用户输入
  owner: '', // 用户输入 
  repo: '', // 用户输入
  path: '', // 默认是跟目录
  branch: '', // 默认是main 可用户输入
  message: '', // commit message 可用户输入？
}

const defaultConfig = {
  branch: 'main',
  path: '',
  message: 'feat: 上传文件'
}

class Sdk {
 	constractor(config) {
    this._inited = false
    this.config = Object.assign(defaultConfig, config)
    // 校验配置是否正确
    if(!this.verifyConfig()) return
    
    thus.octokitWrap = new OctokitWrap(this.config)
  }
  
  verifyConfig() {
    const { token } = this.config
    if(!token) 
      throw new Error('缺少必填参数 token, owner repo')
    	return false
    }
  	this._inited = true
		return true 
  }
  
  updateConfig(config) {
    if(!this._inited) {
      console.warning('请先实例化')
    }
    this.config = Object.assign(defaultConfig, config)
    console.log('更新配置成功！')
  }
  
	private composePathToConfig(path) {
    return path ? Object.assign(this.config, { path }) : this.config
  }
	
  async getFile(path?: string) {
    this.octokitWrap.getFile(this.composePathToConfig(path))
  }
  
  async createFile(file, path?: string) {
    const { pureBase64, name } = await warpFile(file)

    this.octokitWrap.createFile({
      ...this.composePathToConfig(path),
      content: pureBase64,
      message: `upload: 上传${name}文件`
    })
  }
  
  deleteFile(sha， path = '', message = '') {
    this.deleteFile({
      ...this.composePathToConfig(path),
      sha,
      message: `delete: 删除${message}文件`
    })
  }
}

let sdk
function createSdk(config) {
  if(sdk) {
    return sdk
  }
  
  sdk = new Sdk()
  return sdk
}

```



```js
// OctokitWrap 实现
import  Octokit from 'https://...'

class OctokitWrap {
  constructor(auth) {
    this.config = config
   	this.octokit = Octokit({ auth })
  }
  
  getFile(params) {
    const { owner, repo, path, branch } = this.params
    // ref可以是branch 或者 tag, 本次只考虑branch
    return octokit.request(`GET /repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
    })
  }
  
  createFile(params) {
    const { owner, repo, path, branch, message, committer, content } = params
    return octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
      branch,
      message,
      committer,
      content,
    })
  }
  
   deleteFile(params) {
    const { owner, repo, branch, message, committer, path, sha } = params
    return octokit.request(`DELETE /repos/${owner}/${repo}/contents/${path}`, {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
      branch,
      message, // 必填
      committer,
      sha, // 必填
    })
  }
}

// hooks 
```

















## 参考

- [github create-or-update-file-contents](https://docs.github.com/cn/rest/reference/repos#create-or-update-file-contents)
- [octokit](https://github.com/octokit/core.js#readme)
- [图床使用](https://www.jianshu.com/p/980fcf97ddea)
