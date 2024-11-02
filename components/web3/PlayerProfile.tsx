import { FC } from 'react'
import { Player } from '@/types/player'

interface PlayerProfileProps {
  player: Player
}

const PlayerProfile: FC<PlayerProfileProps> = ({ player }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Player Profile</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          ID: #{player.id}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Pseudonym</span>
          <span className="font-medium text-gray-900">{player.pseudonym}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Score</span>
          <span className="font-medium text-gray-900">{player.score} points</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Lives</span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className={`h-4 w-4 rounded-full ${i < player.lives ? 'bg-green-500' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Last Interaction</span>
          <span className="font-medium text-gray-900">
            {new Date(player.lastInteractionTime * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile 