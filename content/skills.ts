import type { Skill } from '@/lib/types'

export const skills: Skill[] = [
  // Languages
  { name: 'Python',       level: 90, category: 'language'  },
  { name: 'TypeScript',   level: 82, category: 'language'  },
  { name: 'C++',          level: 75, category: 'language'  },
  { name: 'Dart',         level: 70, category: 'language'  },
  { name: 'C#',           level: 65, category: 'language'  },

  // Frameworks & tools
  { name: 'ROS2',         level: 80, category: 'framework' },
  { name: 'Flutter',      level: 78, category: 'framework' },
  { name: 'Next.js',      level: 75, category: 'framework' },
  { name: 'Unity (VR)',   level: 72, category: 'framework' },
  { name: 'TensorFlow',   level: 60, category: 'framework' },

  // Hardware
  { name: 'ESP32/ESP8266', level: 88, category: 'hardware' },
  { name: 'Raspberry Pi',  level: 85, category: 'hardware' },
  { name: 'Arduino',       level: 85, category: 'hardware' },
  { name: 'STM32',         level: 60, category: 'hardware' },
]
