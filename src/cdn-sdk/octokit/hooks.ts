import { Octokit } from './index'

export function useOctokitHooks(octokit: Octokit) {
  octokit.hook.before('request', async (options: any) => {
    console.log('hook:  octokit before')
  })

  octokit.hook.after('request', async (response: any, options: any) => {
    console.log('hook:   octokit after')
  })

  octokit.hook.error('request', async (error: any, options: any) => {
    console.log('hook:   octokit error')
    throw error
  })

  octokit.hook.wrap('request', async (request: any, options: any) => {
    // add logic before, after, catch errors or replace the request altogether
    console.log('hook:   octokit wrap')
    return request(options)
  })
}
