// @ts-ignore
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

let octokit: Octokit;

export function getOctokitInstance(auth: string) {
  return octokit || new Octokit({ auth });
}

export default Octokit;
