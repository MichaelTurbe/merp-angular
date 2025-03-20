import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
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

  getItem(id: string): DataResult<T> {
    let dataResult = { success: false } as DataResult<T>;
    const storageKey = this.generateStorageKey(id);
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

  generateStorageKey(id: string) {
    return `${this.storageType}_${id}`;
  }

  getNextAvailableIdForType(): string {
    let usedId = 1;
    let foundNextId = false;
    while (!foundNextId) {
      const key = this.generateStorageKey(usedId.toString());
      console.log(`looking for key: ${key}`);
      const nextResult = this.getItem(key);
      if (nextResult.success) {
        usedId++;
      } else {
        foundNextId = true;
      }
    }
    return usedId.toString();
  }
}
