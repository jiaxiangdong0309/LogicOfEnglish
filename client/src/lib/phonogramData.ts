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

export const coreLessons = [
  {
    id: 'open-closed-syllables',
    title: 'Open vs Closed Syllables',
    description: 'The foundation for understanding vowel sounds',
    content: [
      {
        concept: 'Closed Syllable',
        definition: 'A syllable ending with one or more consonants.',
        result: 'Vowels usually say their first sound (short sound).',
        examples: ['cat', 'bed', 'sit']
      },
      {
        concept: 'Open Syllable',
        definition: 'A syllable ending with a vowel.',
        result: 'Vowels usually say their second sound (long sound).',
        examples: ['me', 'go', 'ba-by']
      }
    ]
  },
  {
    id: 'silent-final-e',
    title: 'Silent Final E - 9 Reasons',
    description: 'Why E appears at the end of English words',
    content: [
      {
        rule: '12.1',
        reason: 'Makes vowels long',
        explanation: 'E crosses over a consonant to make the vowel say its long sound.',
        examples: ['bake', 'time', 'gate']
      },
      {
        rule: '12.2',
        reason: 'Avoids V/U endings',
        explanation: 'English words cannot end in V or U, so E protects them.',
        examples: ['have', 'blue', 'give']
      },
      {
        rule: '12.3',
        reason: 'Softens C/G',
        explanation: 'E forces C and G to say their soft sounds.',
        examples: ['face', 'page', 'ice']
      },
      {
        rule: '12.4',
        reason: 'Syllable needs vowel',
        explanation: 'Every syllable must have a written vowel.',
        examples: ['table', 'little', 'bottle']
      },
      {
        rule: '12.5',
        reason: 'Prevents plural confusion',
        explanation: 'Keeps singular words ending in S from looking plural.',
        examples: ['house', 'mouse', 'rose']
      },
      {
        rule: '12.6',
        reason: 'Makes word look bigger',
        explanation: 'Adds visual length to very short words.',
        examples: ['awe', 'are', 'owe']
      },
      {
        rule: '12.7',
        reason: 'Voices TH',
        explanation: 'Makes TH say its voiced sound.',
        examples: ['teethe', 'breathe']
      },
      {
        rule: '12.8',
        reason: 'Clarifies meaning',
        explanation: 'Distinguishes words that sound the same but have different meanings.',
        examples: ['bye', 'dye', 'die']
      },
      {
        rule: '12.9',
        reason: 'Historical reasons',
        explanation: 'Rare cases where E remains from language evolution.',
        examples: ['come', 'some', 'love']
      }
    ]
  }
];

export const phonograms: Phonogram[] = [
  {
    letter: 'A',
    type: 'vowel',
    sounds: [
      {
        sound: '/ă/ (short)',
        description: 'Closed syllable logic: When A is enclosed by consonants, it says its short sound.',
        examples: ['cat', 'map', 'sad', 'bag']
      },
      {
        sound: '/ā/ (long)',
        description: 'Rule 4: A at the end of a syllable says long sound. Rule 12.1: Silent E makes A long.',
        examples: ['ba-by', 'bake', 'cake', 'gate']
      },
      {
        sound: '/ä/ (broad)',
        description: 'Rule 10: A after W, before L, or at word end often says broad sound.',
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
        description: 'Basic consonant: A voiced consonant with stable pronunciation.',
        examples: ['bat', 'big', 'bus', 'cab']
      }
    ]
  },
  {
    letter: 'C',
    type: 'consonant',
    sounds: [
      {
        sound: '/k/ (hard)',
        description: 'Rule 1: Default sound. C says /k/ unless followed by E, I, or Y.',
        examples: ['cat', 'cup', 'can', 'cake']
      },
      {
        sound: '/s/ (soft)',
        description: 'Rule 1: When C is followed by E, I, or Y, it must soften. Rule 12.3: Silent E softens C.',
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
        description: 'Basic consonant: A voiced consonant. In past tense -ed, it stays /d/ after voiced sounds.',
        examples: ['dog', 'dad', 'bed', 'red']
      }
    ]
  },
  {
    letter: 'E',
    type: 'vowel',
    sounds: [
      {
        sound: '/ĕ/ (short)',
        description: 'Closed syllable logic: When E is enclosed by consonants, it says its short sound.',
        examples: ['egg', 'bed', 'met', 'pen']
      },
      {
        sound: '/ē/ (long)',
        description: 'Rule 4: E at the end of a syllable says long sound. Rule 12.1: Silent E makes E long.',
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
        description: 'Basic consonant: A voiceless consonant. Rule 30: Often doubles after short vowels.',
        examples: ['fan', 'fox', 'off', 'cliff']
      }
    ]
  },
  {
    letter: 'G',
    type: 'consonant',
    sounds: [
      {
        sound: '/g/ (hard)',
        description: 'Rule 2: Default sound. G says /g/ unless followed by E, I, or Y.',
        examples: ['go', 'get', 'bag', 'big']
      },
      {
        sound: '/j/ (soft)',
        description: 'Rule 2: When G is followed by E, I, or Y, it may soften. Rule 12.3: Silent E softens G.',
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
        description: 'Basic consonant: A voiceless consonant, usually at the beginning of syllables.',
        examples: ['hat', 'hen', 'hot', 'hug']
      }
    ]
  },
  {
    letter: 'I',
    type: 'vowel',
    sounds: [
      {
        sound: '/ĭ/ (short)',
        description: 'Closed syllable logic: When I is enclosed by consonants, it says its short sound.',
        examples: ['it', 'in', 'big', 'sit']
      },
      {
        sound: '/ī/ (long)',
        description: 'Rule 5: I at the end of a syllable may say long sound. Rule 12.1: Silent E makes I long.',
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
        description: 'Basic consonant: A voiced consonant. Rule 3: English words rarely end in J.',
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
        description: 'Basic consonant: Used before E, I, Y to say /k/ sound (since C would soften).',
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
        description: 'Basic consonant: A voiced consonant. Rule 30: Often doubles after short vowels.',
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
        description: 'Basic consonant: A nasal sound with stable pronunciation.',
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
        description: 'Basic consonant: A nasal sound.',
        examples: ['net', 'not', 'pen', 'sun']
      }
    ]
  },
  {
    letter: 'O',
    type: 'vowel',
    sounds: [
      {
        sound: '/ŏ/ (short)',
        description: 'Closed syllable logic: When O is enclosed by consonants, it says its short sound.',
        examples: ['on', 'hot', 'top', 'box']
      },
      {
        sound: '/ō/ (long)',
        description: 'Rule 4: O at the end of a syllable says long sound. Rule 12.1: Silent E makes O long.',
        examples: ['go', 'no', 'hope', 'note']
      },
      {
        sound: '/ö/ (long u)',
        description: 'Special logic: O\'s third sound, pronounced like long u or oo.',
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
        description: 'Basic consonant: A voiceless consonant.',
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
        description: 'Rule 11: Q always needs U. Together they make the /kw/ sound.',
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
        description: 'Basic consonant: A voiced consonant.',
        examples: ['rat', 'red', 'run', 'car']
      }
    ]
  },
  {
    letter: 'S',
    type: 'consonant',
    sounds: [
      {
        sound: '/s/ (voiceless)',
        description: 'Basic sound: A voiceless consonant. Rule 30: Often doubles after short vowels.',
        examples: ['sun', 'sit', 'stop', 'glass']
      },
      {
        sound: '/z/ (voiced)',
        description: 'Voicing logic: S between vowels or at word end often becomes voiced.',
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
        description: 'Basic consonant: A voiceless consonant.',
        examples: ['ten', 'top', 'tap', 'hot']
      }
    ]
  },
  {
    letter: 'U',
    type: 'vowel',
    sounds: [
      {
        sound: '/ŭ/ (short)',
        description: 'Closed syllable logic: When U is enclosed by consonants, it says its short sound.',
        examples: ['up', 'cup', 'bus', 'sun']
      },
      {
        sound: '/ū/ (long u)',
        description: 'Rule 4: U at the end of a syllable says long sound.',
        examples: ['u-nit', 'mu-sic', 'mu-te']
      },
      {
        sound: '/ö/ (long oo)',
        description: 'Rule 12.1: Silent E may make U say long oo sound.',
        examples: ['blue', 'rule', 'flu', 'true']
      },
      {
        sound: '/ü/ (short oo)',
        description: 'Special logic: U\'s fourth sound, pronounced like short oo.',
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
        description: 'Rule 12.2: English words cannot end in V, so silent E must follow.',
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
        description: 'Basic consonant: A voiced consonant.',
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
        description: 'Compound sound logic: X is actually /k/ and /s/ combined quickly.',
        examples: ['six', 'box', 'fox', 'tax']
      }
    ]
  },
  {
    letter: 'Y',
    type: 'vowel',
    sounds: [
      {
        sound: '/y/ (consonant)',
        description: 'Consonant logic: When Y appears at the beginning of a syllable.',
        examples: ['yes', 'yam', 'yet', 'yell']
      },
      {
        sound: '/ĭ/ (short i)',
        description: 'Rule 5: When Y acts as a vowel in the middle of a word, it often says short i.',
        examples: ['gym', 'sys-tem', 'myth']
      },
      {
        sound: '/ī/ (long i)',
        description: 'Rule 6: When a one-syllable word ends in Y, it says long i.',
        examples: ['my', 'by', 'fly', 'try']
      },
      {
        sound: '/ē/ (long e)',
        description: 'Rule 7.1: In multi-syllable words, Y at the unstressed end says long e.',
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
        description: 'Rule 29: At word beginning, /z/ sound must use Z, not S. Rule 30: Often doubles.',
        examples: ['zoo', 'zip', 'buzz', 'quiz']
      }
    ]
  }
];
