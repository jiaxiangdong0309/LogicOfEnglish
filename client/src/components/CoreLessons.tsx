import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CoreLessons() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>('open-closed-syllables');

  const lessons = [
    {
      id: 'open-closed-syllables',
      title: 'Open vs Closed Syllables',
      description: 'The foundation for understanding vowel sounds',
      sections: [
        {
          concept: 'Closed Syllable',
          definition: 'A syllable ending with one or more consonants.',
          result: 'Vowels usually say their first sound (short sound).',
          examples: ['cat', 'bed', 'sit', 'dog', 'map']
        },
        {
          concept: 'Open Syllable',
          definition: 'A syllable ending with a vowel.',
          result: 'Vowels usually say their second sound (long sound).',
          examples: ['me', 'go', 'ba-by', 'pa-per', 'ta-ble']
        }
      ]
    },
    {
      id: 'silent-final-e',
      title: 'Silent Final E - 9 Reasons',
      description: 'Why E appears at the end of English words',
      sections: [
        {
          rule: '12.1',
          reason: 'Makes vowels long',
          explanation: 'E crosses over a consonant to make the vowel say its long sound.',
          examples: ['bake', 'time', 'gate', 'hope', 'make']
        },
        {
          rule: '12.2',
          reason: 'Avoids V/U endings',
          explanation: 'English words cannot end in V or U, so E protects them.',
          examples: ['have', 'blue', 'give', 'love', 'move']
        },
        {
          rule: '12.3',
          reason: 'Softens C/G',
          explanation: 'E forces C and G to say their soft sounds.',
          examples: ['face', 'page', 'ice', 'race', 'cage']
        },
        {
          rule: '12.4',
          reason: 'Syllable needs vowel',
          explanation: 'Every syllable must have a written vowel.',
          examples: ['table', 'little', 'bottle', 'apple', 'simple']
        },
        {
          rule: '12.5',
          reason: 'Prevents plural confusion',
          explanation: 'Keeps singular words ending in S from looking plural.',
          examples: ['house', 'mouse', 'rose', 'base', 'case']
        },
        {
          rule: '12.6',
          reason: 'Makes word look bigger',
          explanation: 'Adds visual length to very short words.',
          examples: ['awe', 'are', 'owe', 'axe', 'ace']
        },
        {
          rule: '12.7',
          reason: 'Voices TH',
          explanation: 'Makes TH say its voiced sound.',
          examples: ['teethe', 'breathe', 'bathe', 'lathe', 'soothe']
        },
        {
          rule: '12.8',
          reason: 'Clarifies meaning',
          explanation: 'Distinguishes words that sound the same but have different meanings.',
          examples: ['bye', 'dye', 'die', 'lie', 'tie']
        },
        {
          rule: '12.9',
          reason: 'Historical reasons',
          explanation: 'Rare cases where E remains from language evolution.',
          examples: ['come', 'some', 'love', 'done', 'gone']
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
        >
          <button
            onClick={() =>
              setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)
            }
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">{lesson.title}</h3>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedLesson === lesson.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedLesson === lesson.id && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 space-y-6">
              {lesson.sections.map((section, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="mb-3">
                    {('concept' in section) && section.concept && (
                      <h4 className="font-bold text-gray-900 text-base">{section.concept}</h4>
                    )}
                    {('reason' in section) && section.reason && (
                      <div className="flex items-center gap-2">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          Rule {('rule' in section) ? section.rule : ''}
                        </span>
                        <h4 className="font-bold text-gray-900 text-base">{section.reason}</h4>
                      </div>
                    )}
                  </div>

                  {('definition' in section) && section.definition && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Definition:</span> {section.definition}
                      </p>
                    </div>
                  )}

                  {('explanation' in section) && section.explanation && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Explanation:</span> {section.explanation}
                      </p>
                    </div>
                  )}

                  {('result' in section) && section.result && (
                    <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Result:</span> {section.result}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {section.examples.map((example, i) => (
                        <span
                          key={i}
                          className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
