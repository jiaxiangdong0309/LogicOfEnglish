export interface PhonogramSound {
  sound: string;
  description: string;
  examples: string[];
}

export interface Phonogram {
  letter: string;
  type: 'vowel' | 'consonant';
  sounds: PhonogramSound[];
}

export const coreLessonsCN = [
  {
    id: 'open-closed-syllables',
    title: '开音节 vs 闭音节',
    description: '理解元音发音的基础',
    content: [
      {
        concept: '闭音节',
        definition: '以一个或多个辅音结尾的音节。',
        result: '元音通常发第一个音（短音）。',
        examples: ['cat', 'bed', 'sit']
      },
      {
        concept: '开音节',
        definition: '以元音结尾的音节。',
        result: '元音通常发第二个音（长音）。',
        examples: ['me', 'go', 'ba-by']
      }
    ]
  },
  {
    id: 'silent-final-e',
    title: '不发音的结尾 E - 9 大理由',
    description: '为什么英文单词末尾会有不发音的 E',
    content: [
      {
        rule: '12.1',
        reason: '使元音变长',
        explanation: 'E 跨过一个辅音，让前面的元音发长音。',
        examples: ['bake', 'time', 'gate']
      },
      {
        rule: '12.2',
        reason: '避免 V/U 结尾',
        explanation: '英文单词不能以 V 或 U 结尾，所以 E 保护它们。',
        examples: ['have', 'blue', 'give']
      },
      {
        rule: '12.3',
        reason: '使 C/G 变软',
        explanation: 'E 强制 C 和 G 发软音。',
        examples: ['face', 'page', 'ice']
      },
      {
        rule: '12.4',
        reason: '音节必须有元音',
        explanation: '每个音节必须有一个书面元音。',
        examples: ['table', 'little', 'bottle']
      },
      {
        rule: '12.5',
        reason: '防止单数变复数',
        explanation: '防止以 S 结尾的单数词看起来像复数。',
        examples: ['house', 'mouse', 'rose']
      },
      {
        rule: '12.6',
        reason: '增加单词长度',
        explanation: '增加极短单词的视觉长度。',
        examples: ['awe', 'are', 'owe']
      },
      {
        rule: '12.7',
        reason: '使 TH 浊化',
        explanation: '让 TH 发浊辅音。',
        examples: ['teethe', 'breathe']
      },
      {
        rule: '12.8',
        reason: '区分词义',
        explanation: '用 E 来区分发音相同但意义不同的词。',
        examples: ['bye', 'dye', 'die']
      },
      {
        rule: '12.9',
        reason: '历史遗留',
        explanation: '极少数历史演变留下的 E。',
        examples: ['come', 'some', 'love']
      }
    ]
  }
];

export const phonogramsCN: Phonogram[] = [
  {
    letter: 'A',
    type: 'vowel',
    sounds: [
      {
        sound: '/ă/（短音）',
        description: '闭音节逻辑：当 A 被辅音"关"在音节内部时，发短音。',
        examples: ['cat', 'map', 'sad', 'bag']
      },
      {
        sound: '/ā/（长音）',
        description: '规则 4：开音节末尾发长音。规则 12.1：结尾有不发音 E 时发长音。',
        examples: ['ba-by', 'bake', 'cake', 'gate']
      },
      {
        sound: '/ä/（宽音）',
        description: '规则 10：A 在 W 之后、L 之前，或作为单词结尾时读宽音。',
        examples: ['wa-ter', 'ball', 'wall', 'wash']
      }
    ]
  },
  {
    letter: 'B',
    type: 'consonant',
    sounds: [
      {
        sound: '/b/',
        description: '基础辅音：浊辅音，发音极其稳定。',
        examples: ['bat', 'big', 'bus', 'cab']
      }
    ]
  },
  {
    letter: 'C',
    type: 'consonant',
    sounds: [
      {
        sound: '/k/（硬音）',
        description: '规则 1：默认发硬音。只要后面不是 E, I, Y。',
        examples: ['cat', 'cup', 'can', 'cake']
      },
      {
        sound: '/s/（软音）',
        description: '规则 1：后面紧跟 E, I, Y 时必须变软。规则 12.3：结尾 E 负责让 C 变软。',
        examples: ['cent', 'ci-ty', 'face', 'ice']
      }
    ]
  },
  {
    letter: 'D',
    type: 'consonant',
    sounds: [
      {
        sound: '/d/',
        description: '基础辅音：浊辅音。在过去时后缀 -ed 中受浊音影响保持 /d/。',
        examples: ['dog', 'dad', 'bed', 'red']
      }
    ]
  },
  {
    letter: 'E',
    type: 'vowel',
    sounds: [
      {
        sound: '/ĕ/（短音）',
        description: '闭音节逻辑：被辅音封在音节内时发短音。',
        examples: ['egg', 'bed', 'met', 'pen']
      },
      {
        sound: '/ē/（长音）',
        description: '规则 4：开音节末尾发长音。规则 12.1：结尾有不发音 E 时发长音。',
        examples: ['me', 'be', 'he', 'these']
      }
    ]
  },
  {
    letter: 'F',
    type: 'consonant',
    sounds: [
      {
        sound: '/f/',
        description: '基础辅音：清辅音。规则 30：短元音后常双写。',
        examples: ['fan', 'fox', 'off', 'cliff']
      }
    ]
  },
  {
    letter: 'G',
    type: 'consonant',
    sounds: [
      {
        sound: '/g/（硬音）',
        description: '规则 2：默认发硬音。只要后面不是 E, I, Y。',
        examples: ['go', 'get', 'bag', 'big']
      },
      {
        sound: '/j/（软音）',
        description: '规则 2：后面紧跟 E, I, Y 时可能变软。规则 12.3：结尾 E 负责让 G 变软。',
        examples: ['gem', 'gym', 'page', 'cage']
      }
    ]
  },
  {
    letter: 'H',
    type: 'consonant',
    sounds: [
      {
        sound: '/h/',
        description: '基础辅音：清辅音，通常只出现在音节开头。',
        examples: ['hat', 'hen', 'hot', 'hug']
      }
    ]
  },
  {
    letter: 'I',
    type: 'vowel',
    sounds: [
      {
        sound: '/ĭ/（短音）',
        description: '闭音节逻辑：被辅音封在音节内时发短音。',
        examples: ['it', 'in', 'big', 'sit']
      },
      {
        sound: '/ī/（长音）',
        description: '规则 5：音节末尾可能读长音。规则 12.1：结尾有不发音 E 时发长音。',
        examples: ['hi', 'like', 'time', 'find']
      }
    ]
  },
  {
    letter: 'J',
    type: 'consonant',
    sounds: [
      {
        sound: '/j/',
        description: '基础辅音：浊辅音。规则 3：英文单词通常不以 J 结尾。',
        examples: ['jam', 'jet', 'job', 'jump']
      }
    ]
  },
  {
    letter: 'K',
    type: 'consonant',
    sounds: [
      {
        sound: '/k/',
        description: '基础辅音：用于在 E, I, Y 前代替 C 发 /k/ 音。',
        examples: ['kit', 'kid', 'keep', 'bake']
      }
    ]
  },
  {
    letter: 'L',
    type: 'consonant',
    sounds: [
      {
        sound: '/l/',
        description: '基础辅音：浊辅音。规则 30：短元音后常双写。',
        examples: ['lip', 'leg', 'bell', 'fill']
      }
    ]
  },
  {
    letter: 'M',
    type: 'consonant',
    sounds: [
      {
        sound: '/m/',
        description: '基础辅音：鼻音，发音非常稳定。',
        examples: ['map', 'men', 'mom', 'him']
      }
    ]
  },
  {
    letter: 'N',
    type: 'consonant',
    sounds: [
      {
        sound: '/n/',
        description: '基础辅音：鼻音。',
        examples: ['net', 'not', 'pen', 'sun']
      }
    ]
  },
  {
    letter: 'O',
    type: 'vowel',
    sounds: [
      {
        sound: '/ŏ/（短音）',
        description: '闭音节逻辑：被辅音封在音节内时发短音。',
        examples: ['on', 'hot', 'top', 'box']
      },
      {
        sound: '/ō/（长音）',
        description: '规则 4：开音节末尾发长音。规则 12.1：结尾有不发音 E 时发长音。',
        examples: ['go', 'no', 'hope', 'note']
      },
      {
        sound: '/ö/（长u音）',
        description: '特殊逻辑：O 的第三种发音，读起来像长音 u 或 oo。',
        examples: ['do', 'to', 'who', 'move']
      }
    ]
  },
  {
    letter: 'P',
    type: 'consonant',
    sounds: [
      {
        sound: '/p/',
        description: '基础辅音：清辅音。',
        examples: ['pig', 'pen', 'pot', 'top']
      }
    ]
  },
  {
    letter: 'Q',
    type: 'consonant',
    sounds: [
      {
        sound: '/kw/',
        description: '规则 11：Q 永远需要 U 陪着它，共同发 /kw/ 音。',
        examples: ['quit', 'quiz', 'quick', 'queen']
      }
    ]
  },
  {
    letter: 'R',
    type: 'consonant',
    sounds: [
      {
        sound: '/r/',
        description: '基础辅音：浊辅音。',
        examples: ['rat', 'red', 'run', 'car']
      }
    ]
  },
  {
    letter: 'S',
    type: 'consonant',
    sounds: [
      {
        sound: '/s/（清音）',
        description: '基础发音：清辅音。规则 30：短元音后常双写。',
        examples: ['sun', 'sit', 'stop', 'glass']
      },
      {
        sound: '/z/（浊音）',
        description: '浊化逻辑：在两个元音之间或词尾常浊化。',
        examples: ['is', 'his', 'as', 'rose']
      }
    ]
  },
  {
    letter: 'T',
    type: 'consonant',
    sounds: [
      {
        sound: '/t/',
        description: '基础辅音：清辅音。',
        examples: ['ten', 'top', 'tap', 'hot']
      }
    ]
  },
  {
    letter: 'U',
    type: 'vowel',
    sounds: [
      {
        sound: '/ŭ/（短音）',
        description: '闭音节逻辑：被辅音封在音节内时发短音。',
        examples: ['up', 'cup', 'bus', 'sun']
      },
      {
        sound: '/ū/（长音u）',
        description: '规则 4：开音节末尾发长音。',
        examples: ['u-nit', 'mu-sic', 'mu-te']
      },
      {
        sound: '/ö/（长oo音）',
        description: '规则 12.1：结尾有不发音 E 时可能发长音 oo。',
        examples: ['blue', 'rule', 'flu', 'true']
      },
      {
        sound: '/ü/（短oo音）',
        description: '特殊逻辑：U 的第四种发音，读起来较短促。',
        examples: ['put', 'full', 'bull', 'push']
      }
    ]
  },
  {
    letter: 'V',
    type: 'consonant',
    sounds: [
      {
        sound: '/v/',
        description: '规则 12.2：英文单词不能以 V 结尾，必须加不发音 E。',
        examples: ['van', 'vet', 'have', 'live']
      }
    ]
  },
  {
    letter: 'W',
    type: 'consonant',
    sounds: [
      {
        sound: '/w/',
        description: '基础辅音：浊辅音。',
        examples: ['wet', 'win', 'wig', 'web']
      }
    ]
  },
  {
    letter: 'X',
    type: 'consonant',
    sounds: [
      {
        sound: '/ks/',
        description: '复合音逻辑：实际上是 /k/ 和 /s/ 的快速组合。',
        examples: ['six', 'box', 'fox', 'tax']
      }
    ]
  },
  {
    letter: 'Y',
    type: 'vowel',
    sounds: [
      {
        sound: '/y/（辅音）',
        description: '辅音逻辑：出现在音节开头时作为辅音。',
        examples: ['yes', 'yam', 'yet', 'yell']
      },
      {
        sound: '/ĭ/（短i）',
        description: '规则 5：在词中作为元音时常发短音 i。',
        examples: ['gym', 'sys-tem', 'myth']
      },
      {
        sound: '/ī/（长i）',
        description: '规则 6：单音节词以 Y 结尾时发长音 /ī/。',
        examples: ['my', 'by', 'fly', 'try']
      },
      {
        sound: '/ē/（长e）',
        description: '规则 7.1：多音节词非重读结尾读长音 /ē/。',
        examples: ['ba-by', 'hap-py', 'ci-ty']
      }
    ]
  },
  {
    letter: 'Z',
    type: 'consonant',
    sounds: [
      {
        sound: '/z/',
        description: '规则 29：词首发 /z/ 音必须用 Z。规则 30：词尾常双写。',
        examples: ['zoo', 'zip', 'buzz', 'quiz']
      }
    ]
  }
];
