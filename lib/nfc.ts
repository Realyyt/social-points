import { useGameContract } from '@/hooks/useContract'
import { NFC } from '@/types/nfc'

export async function handleNFCInteraction(reader: NFC, playerAddress: string) {
  const contract = useGameContract()
  
  try {
    const nfcData = await reader.read()
    return await recordInteraction(playerAddress, nfcData.interactionType)
  } catch (error) {
    console.error('NFC interaction failed:', error)
    throw error
  }
}

async function recordInteraction(playerAddress: string, interactionType: number) {
  const contract = useGameContract()
  
  switch(interactionType) {
    case 1:
      return contract.write.interact([playerAddress])
    case 2:
      return contract.write.recordMeetup([playerAddress])
    case 3:
      return contract.write.completeTask([playerAddress])
    default:
      throw new Error('Unknown interaction type')
  }
} 