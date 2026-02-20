import { useState } from 'react';
import CoreLessons from '@/components/CoreLessons';
import PhonogramCard from '@/components/PhonogramCard';
import { phonograms } from '@/lib/phonogramData';
import { BookOpen, Zap } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'letters'>('lessons');

  const vowels = phonograms.filter((p) => p.type === 'vowel');
  const consonants = phonograms.filter((p) => p.type === 'consonant');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Logic of English
            </h1>
          </div>
          <p className="text-gray-600">
            Master the 26 letters and their sounds through logic, not memorization
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
            Core Lessons
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
            26 Letters
          </button>
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Foundation: Understanding English Sound Logic
              </h2>
              <p className="text-blue-800">
                Before learning individual letters, master these two core concepts that explain 80% of English pronunciation.
              </p>
            </div>
            <CoreLessons />
          </div>
        )}

        {/* Letters Tab */}
        {activeTab === 'letters' && (
          <div className="space-y-8">
            {/* Vowels Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Vowels (A, E, I, O, U, Y)</h2>
                <p className="text-gray-600">
                  Vowels are the foundation of English pronunciation. Each can have multiple sounds depending on syllable type and surrounding letters.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vowels.map((vowel) => (
                  <PhonogramCard key={vowel.letter} phonogram={vowel} />
                ))}
              </div>
            </section>

            {/* Consonants Section */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-900 mb-2">Consonants (B-Z)</h2>
                <p className="text-gray-600">
                  Most consonants have consistent sounds. Some (like C and G) change based on the following letter.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consonants.map((consonant) => (
                  <PhonogramCard key={consonant.letter} phonogram={consonant} />
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
            Based on Logic of English (LoE) system • 75 Phonograms + 31 Spelling Rules = 98% of English words
          </p>
        </div>
      </footer>
    </div>
  );
}
