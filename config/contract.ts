export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
export const GAME_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_GAME_FACTORY_ADDRESS

export const gameFactoryABI = [
  {
    name: 'createGame',
    inputs: [
      { name: '_duration', type: 'uint32' },
      { name: '_entryFee', type: 'uint256' }
    ],
    outputs: [{ type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const