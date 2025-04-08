import { DataResult } from "../utilities/data-result";

export class LocalStorageService {
  constructor() {
    
  }

  setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): DataResult<unknown> {
    let dataResult = { success: false } as DataResult<any>;
    const item = localStorage.getItem(key);
    if (item) {
      dataResult.success = true;
      dataResult.value = JSON.parse(item) as unknown;
    } else {
      dataResult.message = 'Could not find an item with that key';
    }
    return dataResult;
  }
}
