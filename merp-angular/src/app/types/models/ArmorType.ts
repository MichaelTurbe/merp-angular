export const ArmorTypes = {
  NoArmor: 'No Armor',
  SoftLeather: 'Soft Leather',
  RigidLeather: 'Rigid Leather',
  Chain: 'Chain',
  Plate: 'Plate'
} as const;

export type ArmorType = typeof ArmorTypes[keyof typeof ArmorTypes];
