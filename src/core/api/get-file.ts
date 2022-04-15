import Octokit from '../octokit';
import { BaseConfig } from '../interface';

const defConfig = {
  path: '',
  branch: 'main',
};

export default async function getFile(octokit: Octokit, config: BaseConfig) {
  const { owner, repo, path, branch } = Object.assign(defConfig, {}, config);
  const url = `GET /repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  return await octokit.request(url, {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
  });
}
