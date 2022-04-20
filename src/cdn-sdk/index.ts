import { Sdk, Config } from './cdn/index'

let sdk: Sdk

export function createSdk(config: Config) {
  if (sdk) {
    return sdk
  }

  sdk = new Sdk(config)
  return sdk
}
