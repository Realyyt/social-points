import { useWriteContract } from 'wagmi'
import { GAME_FACTORY_ADDRESS, gameFactoryABI } from '@/config/contract'

export function useCreateGame() {
  return useWriteContract({
      address: GAME_FACTORY_ADDRESS,
      abi: gameFactoryABI,
      functionName: 'createGame'
  })
} 