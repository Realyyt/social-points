import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useSocialPointsContract } from '@/hooks/useContract'

export default function Home() {
  const { address, isConnected } = useAccount()
  const contract = useSocialPointsContract()
  type PlayerData = readonly [bigint, string, bigint, bigint, bigint]
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (isConnected && address && contract) {
        try {
          const data = await contract.read.players([address])
          setPlayerData(data)
        } catch (error) {
          console.error('Error fetching player data:', error)
        }
      }
    }

    fetchPlayerData()
  }, [address, isConnected, contract])

  if (!isConnected) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to Social Points</h2>
        <p className="mt-4">Please connect your wallet to continue</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Your Profile</h2>
      {playerData ? (
        <div className="mt-4">
          {/* Display player data */}
        </div>
      ) : (
        <div className="mt-4">
          {/* Show registration form */}
        </div>
      )}
    </div>
  )
} 