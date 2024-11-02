import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract'
import { getContract } from 'viem'
import { walletClient } from './client'

export function useSocialPointsContract() {

  const contractABI = [
    // Add this entry to your existing ABI
    {
      inputs: [{ type: "address", name: "account" }],
      name: "players",
      outputs: [
        { type: "uint256", name: "id" },
        { type: "string", name: "pseudonym" },
        { type: "uint256", name: "score" },
        { type: "uint256", name: "lives" },
        { type: "uint256", name: "lastInteractionTime" }
      ],
      stateMutability: "view",
      type: "function"
    }
  ] as const

  return getContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    client:walletClient
  })
} 