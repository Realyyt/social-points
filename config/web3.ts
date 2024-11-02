import { configureChains, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const { chains, publicClient } = configureChains(
  [goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Social Points',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export { chains } 