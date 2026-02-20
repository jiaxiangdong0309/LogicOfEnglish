import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Phonogram } from '@/lib/phonogramDataCN';

interface PhonogramCardProps {
  phonogram: Phonogram;
}

export default function PhonogramCardCN({ phonogram }: PhonogramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isVowel = phonogram.type === 'vowel';
  const bgColor = isVowel ? 'bg-blue-50' : 'bg-green-50';
  const borderColor = isVowel ? 'border-blue-200' : 'border-green-200';
  const textColor = isVowel ? 'text-blue-700' : 'text-green-700';
  const hoverColor = isVowel ? 'hover:bg-blue-100' : 'hover:bg-green-100';

  return (
    <div className={`border ${borderColor} rounded-lg overflow-hidden ${bgColor}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3 flex items-center justify-between ${hoverColor} transition-colors`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${isVowel ? 'bg-blue-200' : 'bg-green-200'} flex items-center justify-center`}>
            <span className={`text-2xl font-bold ${textColor}`}>{phonogram.letter}</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-500">
              {isVowel ? '元音' : '辅音'}
            </p>
            <p className={`font-semibold ${textColor}`}>
              {phonogram.sounds.length} 个音
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 ${textColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-4 space-y-4 bg-white">
          {phonogram.sounds.map((sound, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${isVowel ? 'bg-blue-50' : 'bg-green-50'}`}>
              <div className="mb-2">
                <p className={`font-bold text-lg ${textColor}`}>{sound.sound}</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">{sound.description}</p>
              <div className="flex flex-wrap gap-2">
                {sound.examples.map((example, i) => (
                  <span
                    key={i}
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      isVowel
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
