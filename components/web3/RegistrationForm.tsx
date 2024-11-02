import { FC, useState } from 'react'
import { useAccount } from "wagmi"
import Button from '@/components/ui/Button'
import { useSocialPointsContract } from '@/hooks/useContract'
import { ethers } from 'ethers'

const RegistrationForm: FC = () => {
  const [pseudonym, setPseudonym] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const contract = useSocialPointsContract()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pseudonym.trim()) return

    setIsLoading(true)
    try {
      const tx = await contract.register(pseudonym, {
        value: ethers.utils.parseEther('0.1')
      })
      await tx.wait()
      // Handle success (e.g., refresh page or show success message)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Join the Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pseudonym" className="block text-sm font-medium text-gray-700 mb-1">
            Choose your pseudonym
          </label>
          <input
            type="text"
            id="pseudonym"
            value={pseudonym}
            onChange={(e) => setPseudonym(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your game name"
            required
          />
        </div>
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!pseudonym.trim()}
            className="w-full"
          >
            Register (0.1 ETH)
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm 