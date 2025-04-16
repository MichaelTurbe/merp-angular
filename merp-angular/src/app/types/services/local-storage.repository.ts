import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { StorageEntity } from "../utilities/storage-entity";
import { DataResult } from "../utilities/data-result";

export class LocalStorageRepository<T extends StorageEntity> {
  storageType = '';

  constructor(storageType: string) {
    this.storageType = storageType;
  }

  setItem(item: T): void {
    const storageKey = this.generateStorageKeyForItem(item);
    localStorage.setItem(storageKey, JSON.stringify(item));
  }

  getItem(id: number): DataResult<T> {
    let dataResult = { success: false } as DataResult<T>;
    const storageKey = this.generateStorageKey(id);
    console.log(`trying to get an item with storageKey: ${storageKey}`);
    const item = localStorage.getItem(storageKey);
    if (item) {
      dataResult.success = true;
      dataResult.value = JSON.parse(item) as T;
    } else {
      dataResult.message = 'Could not find an item with that key';
    }
    return dataResult;
    // return item ? JSON.parse(item) as T : null;
  }

  generateStorageKeyForItem(item: T): string {
    return this.generateStorageKey(item.id);
  }

  generateStorageKey(id: number) {
    return `${this.storageType}_${id.toString()}`;
  }

  getNextAvailableIdForType(): number {
    let usedId = 1;
    let foundNextId = false;
    while (!foundNextId) {
      const nextResult = this.getItem(usedId);
      if (nextResult.success) {
        usedId++;
      } else {
        foundNextId = true;
      }
    }
    return usedId;
  }

  getAllItems(): Array<T> {
    let allItems = new Array<T>();
    let usedId = 1;
    let foundNextId = false;
    while (!foundNextId) {
      const nextResult = this.getItem(usedId);
      if (nextResult.success) {
        allItems.push(nextResult.value);
        usedId++;
      } else {
        foundNextId = true;
      }
    }
    return allItems;
  }
}
