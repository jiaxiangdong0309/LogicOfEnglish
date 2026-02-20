import { useState } from 'react';
import CoreLessonsCN from '@/components/CoreLessonsCN';
import PhonogramCardCN from '@/components/PhonogramCardCN';
import { phonogramsCN } from '@/lib/phonogramDataCN';
import { BookOpen, Zap } from 'lucide-react';

export default function HomeCN() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'letters'>('lessons');

  const vowels = phonogramsCN.filter((p) => p.type === 'vowel');
  const consonants = phonogramsCN.filter((p) => p.type === 'consonant');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              英语音标学习指南
            </h1>
          </div>
          <p className="text-gray-600">
            基于 Logic of English 体系，通过逻辑而非死记硬背掌握 26 个字母的发音
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'lessons'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Zap className="w-5 h-5" />
            核心逻辑
          </button>
          <button
            onClick={() => setActiveTab('letters')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'letters'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            26 个字母
          </button>
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                基础：理解英语发音逻辑
              </h2>
              <p className="text-blue-800">
                在学习单个字母之前，先掌握这两个核心概念，它们可以解释英语发音的 80%。
              </p>
            </div>
            <CoreLessonsCN />
          </div>
        )}

        {/* Letters Tab */}
        {activeTab === 'letters' && (
          <div className="space-y-8">
            {/* Vowels Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">元音 (A, E, I, O, U, Y)</h2>
                <p className="text-gray-600">
                  元音是英语发音的基础。每个元音根据音节类型和周围字母的不同，可能有多个发音。
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vowels.map((vowel) => (
                  <PhonogramCardCN key={vowel.letter} phonogram={vowel} />
                ))}
              </div>
            </section>

            {/* Consonants Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-900 mb-2">辅音 (B-Z)</h2>
                <p className="text-gray-600">
                  大多数辅音的发音相对稳定。有些字母（如 C 和 G）会根据后面的字母改变发音。
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consonants.map((consonant) => (
                  <PhonogramCardCN key={consonant.letter} phonogram={consonant} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container text-center">
          <p className="text-sm">
            基于 Logic of English (LoE) 体系 • 75 个音标 + 31 条拼写规则 = 98% 的英文单词
          </p>
        </div>
      </footer>
    </div>
  );
}
