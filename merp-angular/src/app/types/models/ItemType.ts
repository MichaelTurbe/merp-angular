const ItemType = {
  Weapon: 'Weapon',
  ProtectiveEquipment: 'Protective Equipment',
  Accessory: 'Accessory',
} as const;

export type ItemType = typeof ItemType[keyof typeof ItemType];
