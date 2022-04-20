// @ts-ignore
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

interface OctokitConfig {
  auth: string;
  onsuccess?: (response: any, options: any) => void;
  onerror?: (error: Error, options: object) => void;
}
let octokit: Octokit;

export function getOctokitInstance(conifg: OctokitConfig) {
  if (octokit) {
    return octokit;
  }

  // instance
  octokit = new Octokit({
    auth: conifg.auth,
  });

  return octokit;
}

export default Octokit;
