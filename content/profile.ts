/** Bilingual string — always use the `t()` helper from useLanguage to pick the right value */
export type BiText = { en: string; zh: string }

export const profile = {
  name:           'Yutong Zhang',
  id:             'DEV-001-A',

  department:     { en: 'HCI RESEARCH & ENGINEERING', zh: 'HCI 研究与工程'           } satisfies BiText,
  specialization: { en: 'VR / Robotics / IoT Systems', zh: 'VR · 机器人 · 物联网系统' } satisfies BiText,

  bio: {
    en: 'Building at the intersection of physical and digital — from haptic feedback systems to autonomous robots.',
    zh: '在物理与数字的交汇处构建 — 从触觉反馈系统到自主机器人。',
  } satisfies BiText,

  clearanceLevel: 5,
  status:         'open-for-work' as const,
  statusLabel:    { en: 'Open for Work', zh: '寻求合作' } satisfies BiText,

  /** Pinned projects shown in the profile panel — order matters */
  activeProjects: [
    { slug: 'vr-haptic',  key: 'KEY_01', sub: { en: 'PhD — In Progress', zh: 'PhD — 进行中'   } satisfies BiText },
    { slug: 'robot-arm',  key: 'KEY_02', sub: { en: 'Robotics — Active',  zh: '机器人 — 进行中' } satisfies BiText },
    { slug: 'iot-env',    key: 'KEY_03', sub: { en: 'ESP32 / Flutter',    zh: 'ESP32 / Flutter' } satisfies BiText },
  ],

  contact: {
    email:   'your@email.com',
    github:  'https://github.com/yourhandle',
    scholar: '',
    resume:  '/resume.pdf',
  },
}
