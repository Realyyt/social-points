import { NextApiRequest, NextApiResponse } from 'next'
import { createPublicClient, http, createWalletClient, custom, stringToHex, pad } from 'viem'
import { mainnet } from 'viem/chains'
import { CONTRACT_ADDRESS } from '@/config/contract'

// Reference Game.sol contract events and functions
const gameABI = [
  {
    inputs: [
      { name: "username", type: "bytes32" },
      { name: "pseudonym", type: "bytes32" }
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ name: "player", type: "address" }],
    name: "getPlayer",
    outputs: [
      { name: "score", type: "uint32" },
      { name: "lastInteractionTime", type: "uint32" },
      { name: "username", type: "bytes32" },
      { name: "pseudonym", type: "bytes32" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTopPlayers",
    outputs: [
      { name: "addresses", type: "address[]" },
      { name: "scores", type: "uint32[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const

type Data = {
  success: boolean
  data?: any
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query

  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http()
    })

    switch (req.method) {
      case 'GET':
        if (!address) {
          // Get top players if no address specified
          const [addresses, scores] = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: gameABI,
            functionName: 'getTopPlayers'
          })

          const topPlayers = addresses.map((addr, i) => ({
            address: addr,
            score: scores[i]
          }))

          res.status(200).json({ 
            success: true, 
            data: topPlayers 
          })
        } else {
          // Get specific player data
          const [score, lastInteractionTime, username, pseudonym] = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: gameABI,
            functionName: 'getPlayer',
            args: [address as `0x${string}`]
          })

          res.status(200).json({
            success: true,
            data: {
              score,
              lastInteractionTime,
              username: Buffer.from(username.slice(2), 'hex').toString().replace(/\0+$/, ''),
              pseudonym: Buffer.from(pseudonym.slice(2), 'hex').toString().replace(/\0+$/, '')
            }
          })
        }
        break

      case 'POST':
        const { username, pseudonym, entryFee } = req.body
        if (!username || !pseudonym || !address) {
          res.status(400).json({ 
            success: false, 
            error: 'Missing required fields' 
          })
          return
        }

        // Convert strings to bytes32
        const usernameBytes = pad(stringToHex(username), { size: 32 })
        const pseudonymBytes = pad(stringToHex(pseudonym), { size: 32 })

        const walletClient = createWalletClient({
          chain: mainnet,
          transport: custom(window.ethereum)
        })

        const hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS,
          abi: gameABI,
          functionName: 'register',
          args: [usernameBytes, pseudonymBytes],
          value: BigInt(entryFee)
        })

        res.status(200).json({
          success: true,
          data: { hash }
        })
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ 
          success: false, 
          error: `Method ${req.method} Not Allowed` 
        })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Internal Server Error' 
    })
  }
}