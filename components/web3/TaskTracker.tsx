import { useAccount } from 'wagmi'
import { useGameContract } from '@/hooks/useContract'
import { handleNFCInteraction } from '@/lib/nfc'

export function TaskTracker() {
  const { address } = useAccount()
  const contract = useGameContract()

  const handleNFCScan = async () => {
    if (!address) return
    try {
      const reader = await (navigator as any).nfc.watch()
      await handleNFCInteraction(reader, address)
    } catch (error) {
      console.error('NFC scan failed:', error)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Task Tracker</h2>
      <button 
        onClick={handleNFCScan}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Scan NFC Tag
      </button>
    </div>
  )
} 