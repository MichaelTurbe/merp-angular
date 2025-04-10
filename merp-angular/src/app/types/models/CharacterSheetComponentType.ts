export const CharacterSheetComponentTypes = {
  Epithet: 'Epithet',
  Stats: 'Stats',
  Skills: 'Skills',
  Inventory: 'Inventory'
} as const;

export type CharacterSheetComponentType = typeof CharacterSheetComponentTypes[keyof typeof CharacterSheetComponentTypes];
