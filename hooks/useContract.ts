import { CONTRACT_ADDRESS } from '@/config/contract'
import { getContract } from 'viem'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { useState, useEffect } from 'react'

// Import the Game contract ABI
const gameABI = [
  // From Game.sol contract
  {
    inputs: [
      { name: "username", type: "bytes32" },
      { name: "pseudonym", type: "bytes32" }
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "getEntryFee",
    outputs: [{ type: "uint96" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "player2", type: "address" }],
    name: "interact",
    outputs: [],
    stateMutability: "nonpayable", 
    type: "function"
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "actionType", type: "uint8" },
      { indexed: false, name: "score", type: "uint32" }
    ],
    name: "PlayerAction",
    type: "event"
  }
] as const

export function useGameContract() {
  const [contract, setContract] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      })

      const newContract = getContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: gameABI,
        client: walletClient
      })

      setContract(newContract)
    }
  }, [])

  return contract
}