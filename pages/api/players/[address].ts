import type { NextApiRequest, NextApiResponse } from 'next'

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
    switch (req.method) {
      case 'GET':
        // Implement get player data
        break
      case 'POST':
        // Implement player registration
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
} 