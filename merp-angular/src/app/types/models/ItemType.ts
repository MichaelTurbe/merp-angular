export const ItemTypes = {
  Weapon: 'Weapon',
  ProtectiveEquipment: 'Protective Equipment',
  Accessory: 'Accessory',
} as const;

export type ItemType = typeof ItemTypes[keyof typeof ItemTypes];
