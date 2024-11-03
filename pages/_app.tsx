
import '@rainbow-me/rainbowkit/styles.css'
import {  WagmiProvider } from 'wagmi'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/config/web3'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  
  return (
    
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
       </QueryClientProvider>
    </WagmiProvider>  
  )
}

export default MyApp 