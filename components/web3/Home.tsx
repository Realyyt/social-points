import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useGameContract } from '@/hooks/useContract'
import PlayerProfile from './PlayerProfile'
import RegistrationForm from './RegistrationForm'
import { Player } from '@/types/player'
import { TaskTracker } from './TaskTracker'

export default function Home() {
  const { address, isConnected } = useAccount()
  const contract = useGameContract()
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
          <PlayerProfile 
            player={{
              id: Number(playerData[0]),
              pseudonym: playerData[1],
              score: Number(playerData[2]),
              lives: Number(playerData[3]),
              lastInteractionTime: Number(playerData[4])
            }} 
          />
        </div>
      ) : (
        <div className="mt-4">
          <RegistrationForm />
        </div>
      )}
      {playerData && (
        <div className="mt-4">
          <TaskTracker />
        </div>
      )}
    </div>
  )
} 