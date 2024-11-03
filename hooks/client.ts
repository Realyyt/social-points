'use client'

import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export function useWalletClient() {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (!window.ethereum) {
    return undefined
  }

  return createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
  })
}