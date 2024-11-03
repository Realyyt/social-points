'use client'

import ClientOnly from '@/components/web3/ClientOnly'
import dynamic from 'next/dynamic'

const DynamicHome = dynamic(
  () => import('@/components/web3/Home'),
  { ssr: false }
)

export default function Page() {
  return (
    <ClientOnly>
      <DynamicHome />
    </ClientOnly>
  )
}
