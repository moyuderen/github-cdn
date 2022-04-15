import Octokit, { getOctokitInstance } from './octokit';
import createFile, { CreateConfig } from './api/create-file';
import getFile, { getReposConfig } from './api/get-file';

// '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'
// ('moyuderen/octokit-cdn/contents/test1/test.jpg');

interface CdnConfig {
  token: string;
}

export default class Cdn {
  private octokit: Octokit;
  private config: CdnConfig;

  constructor(config: CdnConfig) {
    this.config = config;
    // init
    this.octokit = getOctokitInstance({
      auth: this.config.token,
    });
  }

  public getConfig() {
    return this.config;
  }

  public getFile(config: getReposConfig) {
    return getFile(this.octokit, config);
  }

  public async createFile(config: CreateConfig, content: string) {
    return createFile(this.octokit, config, content);
  }
}
