import type { Research } from '@/lib/types'

export const researchItems: Research[] = [
  {
    id:       'vr-haptic-phd',
    serial:   'RS-2024-001',
    title:    'Vibrotactile Feedback in VR Built Environments',
    subtitle: 'How haptic cues influence spatial perception in virtual architecture',
    status:   'in-progress',
    date:     'MAR 2024',
    abstract: 'Investigating how vibrotactile haptic cues influence spatial perception and user experience in virtual reality architectural walkthroughs. Focus on the intersection of built environment simulation and embodied interaction. Initial pilot studies suggest a statistically significant improvement in depth perception accuracy when paired with synchronized floor vibration.',
    tags:     ['VR', 'Haptics', 'Vibrotactile', 'Built Environment', 'HCI'],
    authors:  ['YOUR NAME'],
  },
  {
    id:       'iot-context-aware',
    serial:   'RS-2023-002',
    title:    'Context-Aware Sensor Fusion for Smart Environment Control',
    subtitle: 'Multi-modal IoT mesh for adaptive environmental response',
    status:   'submitted',
    date:     'NOV 2023',
    abstract: 'A lightweight sensor fusion architecture combining ESP32 mesh networks with ML-based context inference to enable adaptive control of building systems. The system achieves sub-200ms response latency while reducing false-positive trigger rates by 62% compared to threshold-based approaches.',
    tags:     ['IoT', 'ESP32', 'Sensor Fusion', 'Edge ML', 'Smart Buildings'],
    authors:  ['YOUR NAME'],
    venue:    'IEEE IoT Journal (under review)',
  },
]

export const researchCategories = ['ALL', 'VR', 'Haptics', 'HCI', 'IoT', 'Robotics'] as const
