import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { type Chain } from 'viem'

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID')
}

const availableChains = [goerli] as const

const { chains, publicClient, webSocketPublicClient } = configureChains(
  availableChains,
  [
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Social Points',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
export type AppChain = (typeof availableChains)[number] 