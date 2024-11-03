export const GAME_CONFIGS = [
  {
    name: 'MoonRaiders',
    duration: 7 * 24 * 60 * 60, // 1 week in seconds
    entryFee: '0.01',
    maxPlayers: 100
  },
  {
    name: 'DiamondClan',
    duration: 14 * 24 * 60 * 60, // 2 weeks
    entryFee: '0.025',
    maxPlayers: 50
  }
] as const 