const stringify = JSON.stringify;
const parse = JSON.parse;

const PREFIX = '_CDN_';
export const Config_Key = 'config';

abstract class Storage {
  abstract get(key: string): any;
  abstract set(key: string, value: any): void;
  abstract remove(key: string): void;
}

class LocalStorage implements Storage {
  prefix: string;
  constructor(prefix: string = PREFIX) {
    this.prefix = prefix;
  }

  private relkey(key: string) {
    return this.prefix + key;
  }

  get(key: string) {
    key = this.relkey(key);
    return parse(window.localStorage.getItem(key) || '{}');
  }

  set(key: string, value: any) {
    key = this.relkey(key);
    window.localStorage.setItem(key, stringify(value));
  }

  remove(key: string): void {
    key = this.relkey(key);
    window.localStorage.removeItem(key);
  }
}

const storage = new LocalStorage();

export { storage };
