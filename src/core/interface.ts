interface Links {
  git: string;
  html: string;
  self: string;
}

/**
 * download_url: "https://raw.githubusercontent.com/moyuderen/octokit-cdn/main/test1/test1/1-1Z1131K117.jpg"
 * git_url: "https://api.github.com/repos/moyuderen/octokit-cdn/git/blobs/d654dd38d687e61b865b2b9e220792bef7f02bfc"
 * html_url: "https://github.com/moyuderen/octokit-cdn/blob/main/test1/test1/1-1Z1131K117.jpg"
 * name: "1-1Z1131K117.jpg"
 * path: "test1/test1/1-1Z1131K117.jpg"
 * sha: "d654dd38d687e61b865b2b9e220792bef7f02bfc"
 * size: 480456
 * type: "file"
 * url: "https://api.github.com/repos/moyuderen/octokit-cdn/contents/test1/test1/1-1Z1131K117.jpg?ref=main"
 */

export interface GithubRep {
  download_url: string;
  git_url: string;
  html_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
  url: string;
  __links: Links;
}

export enum DirectoryType {
  File = 'file',
  Dir = 'dir',
}

export type DirectoryTypeValue<T> = T[keyof T];
