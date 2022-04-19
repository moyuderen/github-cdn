import Octokit from './octokit'
import { CallBack } from './cdn/interface'

export function useOctokitHooks(octokit: Octokit, config: CallBack) {
  octokit.hook.before('request', async (options: any) => {
    console.log('hook:  octokit before')
  })

  octokit.hook.after('request', async (response: any, options: any) => {
    console.log('hook:   octokit after')
    // console.log('options:   ', options);
    // console.log('response:   ', response);
    config.onsuccess && config.onsuccess(response, options)
  })

  octokit.hook.error('request', async (error: any, options: any) => {
    console.log('hook:   octokit error')
    // console.log('options:   ', options);

    if (config.onerror) {
      config.onerror(error, options)
    }

    throw error
  })

  octokit.hook.wrap('request', async (request: any, options: any) => {
    // add logic before, after, catch errors or replace the request altogether
    console.log('hook:   octokit wrap')
    return request(options)
  })
}
