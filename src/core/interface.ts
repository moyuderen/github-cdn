export interface BaseConfig {
  /** github token */
  token: string;
  /** github用户名称 */
  owner: string;
  /** 仓库名称 */
  repo: string;
  /** 分支名称 */
  branch?: string;
  /** 路径 */
  path?: string;
}
