import Octokit, { getOctokitInstance } from './octokit';
import { defConfig } from './constants';
import createFile from './api/create-file';
import getFile from './api/get-file';

// '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'
// ('moyuderen/octokit-cdn/contents/test1/test.jpg');

interface CdnConfig {
  token: string;
}

export default class Cdn {
  private octokit: Octokit;
  private config: CdnConfig;

  constructor(config: CdnConfig) {
    this.config = Object.assign(defConfig, {}, config);
    this.octokit = getOctokitInstance(this.config.token);
  }

  public getConfig() {
    return this.config;
  }

  public getFile() {
    const response = getFile(this.octokit);
  }

  public async createFile(content: string) {
    return await createFile(this.octokit, this.config, content);
  }
}
