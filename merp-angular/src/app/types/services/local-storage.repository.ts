import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { StorageEntity } from "../utilities/storage-entity";

export class LocalStorageRepository<T extends StorageEntity>  {
  constructor() {

  }

  setItem(item: T): void {
    const storageKey = this.generateStorageKey(item);
    localStorage.setItem(storageKey, JSON.stringify(item));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  generateStorageKey(item: T): string{
    return `${item.storageType}_${item.id}`
  }
}
