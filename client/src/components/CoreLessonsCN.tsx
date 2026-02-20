import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CoreLessonsCN() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>('open-closed-syllables');

  const lessons = [
    {
      id: 'open-closed-syllables',
      title: '开音节 vs 闭音节',
      description: '理解元音发音的基础',
      sections: [
        {
          concept: '闭音节',
          definition: '以一个或多个辅音结尾的音节。',
          result: '元音通常发第一个音（短音）。',
          examples: ['cat', 'bed', 'sit', 'dog', 'map']
        },
        {
          concept: '开音节',
          definition: '以元音结尾的音节。',
          result: '元音通常发第二个音（长音）。',
          examples: [
            'me',
            'go',
            { display: 'ba-by', pronunciation: 'baby' },
            { display: 'pa-per', pronunciation: 'paper' },
            { display: 'ta-ble', pronunciation: 'table' }
          ]
        }
      ]
    },
    {
      id: 'silent-final-e',
      title: '不发音的结尾 E - 9 大理由',
      description: '为什么英文单词末尾会有不发音的 E',
      sections: [
        {
          rule: '12.1',
          reason: '使元音变长',
          explanation: 'E 跨过一个辅音，让前面的元音发长音。',
          examples: ['bake', 'time', 'gate', 'hope', 'make']
        },
        {
          rule: '12.2',
          reason: '避免 V/U 结尾',
          explanation: '英文单词不能以 V 或 U 结尾，所以 E 保护它们。',
          examples: ['have', 'blue', 'give', 'love', 'move']
        },
        {
          rule: '12.3',
          reason: '使 C/G 变软',
          explanation: 'E 强制 C 和 G 发软音。',
          examples: ['face', 'page', 'ice', 'race', 'cage']
        },
        {
          rule: '12.4',
          reason: '音节必须有元音',
          explanation: '每个音节必须有一个书面元音。',
          examples: [
            { display: 'ta-ble', pronunciation: 'table' },
            { display: 'lit-tle', pronunciation: 'little' },
            { display: 'bot-tle', pronunciation: 'bottle' },
            { display: 'ap-ple', pronunciation: 'apple' },
            { display: 'sim-ple', pronunciation: 'simple' }
          ]
        },
        {
          rule: '12.5',
          reason: '防止单数变复数',
          explanation: '防止以 S 结尾的单数词看起来像复数。',
          examples: ['house', 'mouse', 'rose', 'base', 'case']
        },
        {
          rule: '12.6',
          reason: '增加单词长度',
          explanation: '增加极短单词的视觉长度。',
          examples: ['awe', 'are', 'owe', 'axe', 'ace']
        },
        {
          rule: '12.7',
          reason: '使 TH 浊化',
          explanation: '让 TH 发浊辅音。',
          examples: ['teethe', 'breathe', 'bathe', 'lathe', 'soothe']
        },
        {
          rule: '12.8',
          reason: '区分词义',
          explanation: '用 E 来区分发音相同但意义不同的词。',
          examples: ['bye', 'dye', 'die', 'lie', 'tie']
        },
        {
          rule: '12.9',
          reason: '历史遗留',
          explanation: '极少数历史演变留下的 E。',
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
                          规则 {('rule' in section) ? section.rule : ''}
                        </span>
                        <h4 className="font-bold text-gray-900 text-base">{section.reason}</h4>
                      </div>
                    )}
                  </div>

                  {('definition' in section) && section.definition && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">定义：</span> {section.definition}
                      </p>
                    </div>
                  )}

                  {('explanation' in section) && section.explanation && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">解释：</span> {section.explanation}
                      </p>
                    </div>
                  )}

                  {('result' in section) && section.result && (
                    <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">结果：</span> {section.result}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">示例：</p>
                    <div className="flex flex-wrap gap-2">
                      {section.examples.map((example, i) => {
                        const display = typeof example === 'string' ? example : example.display;
                        return (
                          <span
                            key={i}
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {display}
                          </span>
                        );
                      })}
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
