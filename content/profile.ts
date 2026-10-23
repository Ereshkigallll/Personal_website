/** Bilingual string — always use the `t()` helper from useLanguage to pick the right value */
export type BiText = { en: string; zh: string }

export const profile = {
  name:           'Yutong Zhang',
  id:             'DEV-001-A',

  department:     { en: 'ROBOTICS RESEARCH & ENGINEERING', zh: '机器人研究与工程' } satisfies BiText,
  specialization: { en: 'Robot Learning / Locomotion / Sim-to-Real', zh: '机器人学习 · 运动控制 · 仿真到现实' } satisfies BiText,

  bio: {
    en: 'From learned policies to reliable motion in the real world.',
    zh: '让学到的策略，在真实世界中化为可靠的行动。',
  } satisfies BiText,

  clearanceLevel: 5,
  status:         'in-post' as const,
  statusLabel:    { en: 'Currently in Post', zh: '现已在职' } satisfies BiText,

  /** Current directions, grounded in the robotics appointment in experience.ts. */
  currentFocus: [
    {
      key: 'FOCUS_01',
      title: { en: 'Sim-to-Real Deployment', zh: '仿真训练与真机部署' } satisfies BiText,
      sub: { en: 'Isaac Lab / C++ / Hardware Evaluation', zh: 'Isaac Lab · C++ · 仿真与真机对照' } satisfies BiText,
    },
    {
      key: 'FOCUS_02',
      title: { en: 'Load-Adaptive Locomotion', zh: '负载自适应运动控制' } satisfies BiText,
      sub: { en: 'MPC / Whole-Body Control', zh: '模型预测控制 · 全身控制' } satisfies BiText,
    },
    {
      key: 'FOCUS_03',
      title: { en: 'Wheeled-Legged Policy Learning', zh: '轮足机器人策略学习' } satisfies BiText,
      sub: { en: 'Teacher Demonstrations / Policy Evaluation', zh: '教师示范 · 策略训练与评估' } satisfies BiText,
    },
  ],

  contact: {
    email:   'your@email.com',
    github:  'https://github.com/yourhandle',
    scholar: '',
    resume:  '/resume.pdf',
  },
}
