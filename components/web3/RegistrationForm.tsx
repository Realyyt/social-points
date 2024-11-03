import { FC, useState, useEffect } from 'react'
import { useAccount, usePublicClient } from "wagmi"
import Button from '@/components/ui/Button'
import { useGameContract } from '@/hooks/useContract'
import { parseEther, stringToHex, pad } from 'viem'

interface GameFormData {
  username: string
  pseudonym: string
}

const RegistrationForm: FC = () => {
  const [formData, setFormData] = useState<GameFormData>({
    username: '',
    pseudonym: ''
  })
  const [entryFee, setEntryFee] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const contract = useGameContract()
  const publicClient = usePublicClient()

  // Fetch entry fee on component mount
  useEffect(() => {
    const fetchEntryFee = async () => {
      if (!contract) return
      try {
        const fee = await contract.read.getEntryFee()
        setEntryFee(fee.toString())
      } catch (error) {
        console.error('Failed to fetch entry fee:', error)
      }
    }
    fetchEntryFee()
  }, [contract])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!contract) throw new Error('Contract not initialized')
      if (!address) throw new Error('Wallet not connected')

      // Convert strings to bytes32
      const usernameBytes = pad(stringToHex(formData.username), { size: 32 })
      const pseudonymBytes = pad(stringToHex(formData.pseudonym), { size: 32 })

      const hash = await contract.write.register(
        [usernameBytes, pseudonymBytes],
        {
          account: address,
          value: BigInt(entryFee)
        }
      )

      if (!publicClient) throw new Error('Public client not initialized')
      await publicClient.waitForTransactionReceipt({ hash })
      
      // Success notification or redirect could go here
    } catch (error) {
      console.error('Registration failed:', error)
      // Error notification could go here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register for Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            maxLength={31} // Leave room for null termination in bytes32
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="pseudonym" className="block text-sm font-medium text-gray-700 mb-1">
            Pseudonym
          </label>
          <input
            type="text"
            id="pseudonym"
            value={formData.pseudonym}
            onChange={(e) => setFormData(prev => ({ ...prev, pseudonym: e.target.value }))}
            maxLength={31} // Leave room for null termination in bytes32
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Register ({entryFee} wei)
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm