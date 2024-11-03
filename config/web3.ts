import '@rainbow-me/rainbowkit/styles.css'
import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID')
}

export const config = getDefaultConfig({
  appName: 'Social Points',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})
