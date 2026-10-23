import type { BiText } from '@/content/profile'

export type ExperienceCategory = 'education' | 'work' | 'research' | 'teaching'

export type Experience = {
  id: string
  serial: string
  category: ExperienceCategory
  role: BiText
  organization: BiText
  department?: BiText
  project?: BiText
  startDate: string // YYYY-MM
  endDate: string | null // null = current appointment
  summary: BiText
  timelineTitle: BiText
  // A period is a continuous band; events sit beneath their surrounding period.
  period?: boolean
  parentId?: string
  highlights: BiText[]
  tags: string[]
  publication?: { title: string; href: string }
}

/**
 * Based on the adopted CV entries, 22 October 2026.
 * Keep overlapping appointments separate and preserve each role's dates.
 * Summaries describe the appointment; detailed technical cases belong in Research / Projects.
 */
export const experiences: Experience[] = [
  {
    id: 'ucl-masters',
    serial: 'EXP-EDU-001',
    category: 'education',
    role: { en: 'MSc Connected Environments', zh: '互联互通环境学理学硕士' },
    timelineTitle: { en: 'UCL · MSc', zh: '伦敦大学学院 · 硕士' },
    organization: { en: 'University College London', zh: '伦敦大学学院' },
    department: { en: 'The Bartlett · Centre for Advanced Spatial Analysis (CASA)', zh: '巴特莱特学院 · 高级空间分析中心（CASA）' },
    startDate: '2023-09',
    endDate: '2024-09',
    period: true,
    summary: {
      en: 'Connected environments, physical computing and interactive sensing at The Bartlett’s CASA.',
      zh: '在巴特莱特学院 CASA 学习互联环境、物理计算与交互感知，开展软硬件系统研究。',
    },
    highlights: [
      { en: 'Completed the MSc Connected Environments programme with an overall mark of 69/100 and ranked second in the programme.', zh: '完成互联互通环境学硕士课程，总分 69/100，综合排名专业第二。' },
      { en: 'Awarded Distinction for the final project, which accounted for one third of the programme credits.', zh: '毕业项目获得 Distinction，项目占总学分的三分之一。' },
    ],
    tags: ['Connected Environments', 'Physical Computing', 'IoT', 'HCI'],
  },
  {
    id: 'warwick-bachelors',
    serial: 'EXP-EDU-002',
    category: 'education',
    role: { en: 'BSc MORSE', zh: 'MORSE 理学学士' },
    timelineTitle: { en: 'Warwick · BSc', zh: '华威大学 · 本科' },
    organization: { en: 'University of Warwick', zh: '华威大学' },
    department: { en: 'Mathematics, Operational Research, Statistics and Economics', zh: '数学、运筹学、统计学与经济学' },
    startDate: '2020-09',
    endDate: '2023-07',
    period: true,
    summary: {
      en: 'A foundation in mathematics, operational research, statistics and economics.',
      zh: '通过数学、运筹学、统计学与经济学的交叉学习，建立定量分析基础。',
    },
    highlights: [
      { en: 'Completed the BSc MORSE programme, combining mathematics, operational research, statistics and economics.', zh: '完成 MORSE 理学学士课程，系统学习数学、运筹学、统计学与经济学。' },
      { en: 'Received the Warwick Award at Silver level.', zh: '获得 Warwick Award 银奖认证。' },
    ],
    tags: ['Mathematics', 'Operational Research', 'Statistics', 'Economics'],
  },
  {
    id: 'westlake-robotics',
    serial: 'EXP-WRK-001',
    category: 'work',
    role: { en: 'Robotics Algorithm Engineer', zh: '机器人算法工程师' },
    organization: { en: 'Westlake University', zh: '西湖大学' },
    department: { en: 'Intelligent Industry Research Institute', zh: '智能产业研究院' },
    startDate: '2026-04',
    endDate: null,
    period: true,
    timelineTitle: { en: 'Robotics & Control', zh: '机器人学习与控制' },
    summary: { en: 'From Isaac Lab training to hardware deployment, with load-adaptive control and wheeled-legged policy learning.', zh: '从 Isaac Lab 训练到真机部署，探索负载自适应控制与轮足机器人策略学习。' },
    highlights: [
      {
        en: 'Migrated a 45 kg quadruped model and 24 existing training tasks to Isaac Lab, adapted C++ deployment interfaces, and established matched simulation–hardware evaluations.',
        zh: '将 45 kg 级四足机器人模型及 24 项既有训练任务迁移至 Isaac Lab，适配 C++ 部署接口，建立统一指令下的仿真与真机对照流程。',
      },
      {
        en: 'Adapted model predictive and whole-body control for online load estimation; refined gait timing and joint damping using hardware torque logs.',
        zh: '移植并改造模型预测控制与全身控制模块，实现在线负载辨识；结合真机力矩日志调整步态时序与关节阻尼。',
      },
      {
        en: 'Trained wheeled-legged policies using teacher-generated support corrections, and investigated turning behavior through controlled policy-parameter and wheel-output interventions.',
        zh: '利用教师控制器生成支撑纠正示范，训练轮足机器人策略，并通过策略参数与轮速输出干预实验分析转向行为。',
      },
    ],
    tags: ['Isaac Lab', 'Sim-to-Real', 'MPC', 'Whole-Body Control', 'Policy Learning'],
  },
  {
    id: 'warwick-research',
    serial: 'EXP-RES-001',
    category: 'research',
    role: { en: 'Research Assistant', zh: '研究助理' },
    organization: { en: 'University of Warwick', zh: '华威大学' },
    department: { en: 'School of Engineering', zh: '工程学院' },
    project: { en: 'VR & wearable vibration feedback', zh: 'VR 与可穿戴振动反馈' },
    startDate: '2025-04',
    endDate: '2026-02',
    period: true,
    timelineTitle: { en: 'VR & Haptics', zh: 'VR 与振动反馈' },
    summary: { en: 'Connecting measured bridge vibrations with virtual environments and wearable feedback.', zh: '将实测桥梁振动连接到虚拟环境与可穿戴反馈，研究多感官振动感知。' },
    highlights: [
      {
        en: 'Led footbridge modal testing and developed sensor arrays to map measured structural responses into a Unity bridge model, with deformation relative error within 5%.',
        zh: '主导人行桥模态测试，开发传感器阵列，将实测结构响应映射至 Unity 桥梁模型，虚拟与真实桥梁的形变量相对误差在 5% 以内。',
      },
      {
        en: 'Designed multisensory vibration-perception experiments comparing real environments, 360° video, and VR passthrough to study visual and auditory influences on perception thresholds.',
        zh: '设计多感官振动感知实验，对比真实环境、360° 视频与 VR 头显透视，考察视觉和听觉线索对感知阈值的影响。',
      },
    ],
    tags: ['VR', 'Haptics', 'Unity', 'Sensor Systems', 'Modal Analysis'],
  },
  {
    id: 'warwick-teaching',
    serial: 'EXP-TCH-001',
    category: 'teaching',
    role: { en: 'Teaching Assistant', zh: '助教' },
    organization: { en: 'University of Warwick', zh: '华威大学' },
    department: { en: 'School of Engineering · Postgraduate course', zh: '工程学院 · 研究生课程' },
    startDate: '2025-04',
    endDate: '2026-02',
    timelineTitle: { en: 'Teaching · Warwick', zh: '华威大学 · 助教' },
    summary: { en: 'Five postgraduate labs for 48 students, from bridge sensing to modal analysis and Unity visualisation.', zh: '面向 48 名研究生开展 5 次实验课，涵盖桥梁传感、模态分析与 Unity 可视化。' },
    highlights: [
      {
        en: 'Delivered five laboratory sessions for 48 postgraduate students on sensor setup, bridge-vibration measurements, structural-response analysis, and Unity visualisation.',
        zh: '面向 48 名研究生组织 5 次实验课，指导传感器布置、桥梁振动采集、结构响应分析及 Unity 可视化。',
      },
      {
        en: 'Taught modal analysis with MATLAB and MACEC, supporting parameter identification, experimental reports, and debugging.',
        zh: '讲解 MATLAB 与 MACEC 模态分析流程，指导参数识别、实验报告，并提供编程与实验调试支持。',
      },
    ],
    tags: ['Teaching', 'MATLAB', 'MACEC', 'Structural Dynamics'],
  },
  {
    id: 'princeton-teaching',
    serial: 'EXP-TCH-002',
    category: 'teaching',
    role: { en: 'Teaching Assistant', zh: '助教' },
    organization: { en: 'Princeton University', zh: '普林斯顿大学' },
    department: {
      en: 'Mechanical & Aerospace Engineering · Short-term teaching project',
      zh: '机械与航空航天工程系 · 短期教学项目',
    },
    startDate: '2025-01',
    endDate: '2025-03',
    timelineTitle: { en: 'Teaching · Princeton', zh: '普林斯顿 · 短期助教' },
    summary: { en: 'A short-term teaching project in electronics, Arduino control and digital fabrication.', zh: '围绕电路、Arduino 控制与数字制造开展短期教学项目。' },
    highlights: [
      {
        en: 'Guided 10 undergraduates through 10 laboratory sessions on circuit simulation, physical electronics, and Arduino pendulum-balance control.',
        zh: '面向 10 名本科生开展 10 次实验课，指导电路仿真、实物电路搭建及 Arduino 单摆平衡控制。',
      },
      {
        en: 'Supported Fusion 360 mechanical design, fabrication under 3D-printing and CNC constraints, and integration with electronic control systems.',
        zh: '指导 Fusion 360 机械建模，结合 3D 打印与 CNC 加工约束优化设计，并完成结构与电路控制系统集成。',
      },
    ],
    tags: ['Teaching', 'Arduino', 'Control', 'Fusion 360', 'Digital Fabrication'],
  },
  {
    id: 'ucl-hydrotrack',
    serial: 'EXP-RES-002',
    category: 'research',
    role: { en: 'Independent Researcher', zh: '独立研究员' },
    organization: { en: 'University College London', zh: '伦敦大学学院' },
    department: { en: 'Centre for Advanced Spatial Analysis (CASA)', zh: '高级空间分析中心（CASA）' },
    project: { en: 'HydroTrack · Non-contact hydration sensing', zh: 'HydroTrack · 非接触式饮水监测' },
    startDate: '2024-04',
    endDate: '2024-09',
    parentId: 'ucl-masters',
    timelineTitle: { en: 'HydroTrack', zh: 'HydroTrack' },
    summary: { en: 'Non-contact hydration sensing, combining ultrasound, CO₂ and vision in a detachable device.', zh: '融合超声波、CO₂ 与视觉感知，以可拆卸设备实现非接触式饮水监测。' },
    highlights: [
      {
        en: 'Built an ultrasonic hydration-sensing system with event-triggered CO₂ and vision-based drink recognition, combining embedded sensing with lightweight learning.',
        zh: '开发超声波饮水监测系统，结合事件触发的 CO₂ 与视觉饮品识别，集成嵌入式传感与轻量化学习模型。',
      },
      {
        en: 'Integrated a detachable sensor attachment and magnetic desktop base, and completed a two-week ceramic-cup deployment with 10 participants.',
        zh: '集成可拆卸传感附件与磁吸式桌面底座，完成 10 名参与者、为期两周的陶瓷杯桌面部署验证。',
      },
    ],
    tags: ['IoT', 'Ultrasound', 'Multimodal Sensing', 'Edge ML'],
    publication: {
      title: 'HydroTrack',
      href: 'https://doi.org/10.1109/SENSYS-ADJUNCT71932.2026.00035',
    },
  },
  {
    id: 'living-scroll',
    serial: 'EXP-RES-003',
    category: 'research',
    role: { en: 'Computer Vision & IoT Developer', zh: '计算机视觉与物联网算法开发员' },
    organization: {
      en: 'Nanjing Grand Bao’en Temple Digital Heritage Competition',
      zh: '南京大报恩寺数字遗产沉浸式文化创新大赛',
    },
    project: { en: 'Living Scroll · Multi-user heritage storytelling', zh: 'Living Scroll · 多用户数字遗产交互叙事' },
    startDate: '2024-04',
    endDate: '2024-07',
    // Temporal context only: the competition was not a UCL appointment.
    parentId: 'ucl-masters',
    timelineTitle: { en: 'Living Scroll', zh: 'Living Scroll' },
    summary: { en: 'Six-user infrared tracking and spatial audio for an interactive digital heritage installation.', zh: '以六人红外追踪与空间音频，构建数字遗产交互叙事体验。' },
    highlights: [
      {
        en: 'Developed frequency-coded ESP32 infrared flashlights and a Python optical-tracking pipeline for six simultaneous users, using FFT decoding and Kalman filtering.',
        zh: '开发频率编码的 ESP32 红外手电筒与 Python 光学追踪流程，结合 FFT 解码和卡尔曼滤波，支持 6 名用户同步交互。',
      },
      {
        en: 'Built personalised spatial audio and tracking-data communication, supported Unity integration, and completed a five-day deployment at the heritage museum.',
        zh: '开发个性化空间音频与追踪数据通信，协助 Unity 交互集成，并在遗址博物馆完成为期 5 天的现场部署。',
      },
    ],
    tags: ['Computer Vision', 'ESP32', 'Optical Tracking', 'Spatial Audio', 'HCI'],
    publication: {
      title: 'Living Scroll',
      href: 'https://doi.org/10.1145/3772363.3798323',
    },
  },
  {
    id: 'shiyuan-vision',
    serial: 'EXP-WRK-002',
    category: 'work',
    role: { en: 'Computer Vision Algorithm Intern', zh: '计算机视觉算法开发实习生' },
    organization: { en: '识渊科技 · Shanghai', zh: '上海市识渊科技有限公司' },
    project: { en: 'Illumination transfer for SMT inspection', zh: 'SMT 工业质检光照迁移' },
    startDate: '2023-06',
    endDate: '2023-09',
    period: true,
    timelineTitle: { en: 'Industrial Vision', zh: '工业视觉算法' },
    summary: { en: 'GAN-based illumination transfer and automatic illumination labels for SMT inspection images.', zh: '通过 GAN 光照迁移与自动光照类别标注，支持 SMT 工业图像检测。' },
    highlights: [
      {
        en: 'Implemented GAN-based illumination transfer and fine-tuned pretrained models on company SMT images for the final inspection solution.',
        zh: '实现基于 GAN 的光照迁移算法，使用企业 SMT 图像微调预训练模型，完成跨光照图像转换并用于最终检测方案。',
      },
      {
        en: 'Used ResNet to assign illumination-category labels to unlabeled images from a small labeled set captured under white and RGB lighting.',
        zh: '利用白光与 RGB 光照下的小批已标注图像，通过 ResNet 为其余图像自动生成光照类别标签，扩充带标注数据集。',
      },
    ],
    tags: ['Computer Vision', 'GAN', 'ResNet', 'Industrial Inspection'],
  },
]
