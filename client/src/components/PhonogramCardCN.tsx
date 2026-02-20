import { useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';
import type { Phonogram } from '@/lib/phonogramDataCN';
import { getTTSService } from '@/lib/tts';
import { toast } from 'sonner';

interface PhonogramCardProps {
  phonogram: Phonogram;
}

export default function PhonogramCardCN({ phonogram }: PhonogramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const isVowel = phonogram.type === 'vowel';
  const bgColor = isVowel ? 'bg-blue-50' : 'bg-green-50';
  const borderColor = isVowel ? 'border-blue-200' : 'border-green-200';
  const textColor = isVowel ? 'text-blue-700' : 'text-green-700';
  const hoverColor = isVowel ? 'hover:bg-blue-100' : 'hover:bg-green-100';

  /**
   * 播放音标语音
   */
  const handlePlaySound = async (phoneme: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    
    if (playingSound === phoneme) {
      return;
    }

    try {
      setPlayingSound(phoneme);
      const ttsService = getTTSService();
      await ttsService.speak(phoneme);
    } catch (error) {
      console.error('播放音标失败:', error);
      toast.error('播放失败，请检查网络连接或配置');
    } finally {
      setPlayingSound(null);
    }
  };

  /**
   * 播放单词示例语音
   */
  const handlePlayExample = async (example: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (playingSound === example) {
      return;
    }

    try {
      setPlayingSound(example);
      const ttsService = getTTSService();
      await ttsService.speak(example);
    } catch (error) {
      console.error('播放单词失败:', error);
      toast.error('播放失败，请检查网络连接或配置');
    } finally {
      setPlayingSound(null);
    }
  };

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
            <button
              key={idx}
              onClick={() => handlePlaySound(sound.phoneme)}
              disabled={playingSound === sound.phoneme}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                playingSound === sound.phoneme
                  ? 'opacity-70 cursor-not-allowed'
                  : `${isVowel ? 'bg-blue-50 hover:bg-blue-100' : 'bg-green-50 hover:bg-green-100'} cursor-pointer`
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <p className={`font-bold text-lg ${textColor}`}>
                  {sound.phoneme}
                  {sound.label && <span className="text-sm ml-1">（{sound.label}）</span>}
                </p>
                <Volume2 
                  className={`w-4 h-4 ${textColor} ${playingSound === sound.phoneme ? 'animate-pulse' : ''}`} 
                />
              </div>
              <p className="text-sm text-gray-700 mb-3">{sound.description}</p>
              <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                {sound.examples.map((example, i) => {
                  const display = typeof example === 'string' ? example : example.display;
                  const pronunciation = typeof example === 'string' ? example : example.pronunciation;
                  const isPlaying = playingSound === pronunciation;
                  
                  return (
                    <button
                      key={i}
                      onClick={(e) => handlePlayExample(pronunciation, e)}
                      disabled={isPlaying}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                        isPlaying
                          ? 'opacity-50 cursor-not-allowed'
                          : isVowel
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title="播放单词"
                    >
                      <span>{display}</span>
                      <Volume2 className={`w-3 h-3 ${isPlaying ? 'animate-pulse' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
