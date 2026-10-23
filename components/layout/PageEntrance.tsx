'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/lib/language'
import { usePageEntry } from '@/lib/page-entry'
import styles from './page-entrance.module.css'

type Theme = 'research' | 'projects' | 'database' | 'logs' | 'contact'
export type EntryRecord = { id: string; label: string; meta?: string }

const themes = {
  research: {
    code: '03 / RESEARCH ARCHIVE', command: 'query ./research --index',
    title: ['Indexing research', '建立研究索引'],
    stages: [['Reading archive', '读取研究档案'], ['Resolving references', '展开研究条目'], ['Research index ready', '研究索引就绪']],
  },
  projects: {
    code: '04 / PROJECT WORKSPACE', command: 'assemble ./projects',
    title: ['Assembling workspace', '组装项目工作区'],
    stages: [['Locating modules', '定位项目模块'], ['Assembling structure', '组合项目结构'], ['Workspace ready', '项目工作区就绪']],
  },
  database: {
    code: '05 / SKILL MATRIX', command: 'map ./skills --matrix',
    title: ['Mapping capabilities', '映射技能矩阵'],
    stages: [['Reading skill groups', '读取技能分类'], ['Scanning the matrix', '扫描技能矩阵'], ['Capability map ready', '技能映射就绪']],
  },
  logs: {
    code: '06 / DEVELOPMENT LOG', command: 'tail ./logs --archive',
    title: ['Opening the log stream', '展开开发日志流'],
    stages: [['Opening archive', '打开日志档案'], ['Ordering entries', '排列日志条目'], ['Log stream ready', '日志流就绪']],
  },
  contact: {
    code: '07 / COMMUNICATIONS', command: 'open ./contact --relay',
    title: ['Opening a channel', '打开通信频道'],
    stages: [['Locating contact panel', '定位通信面板'], ['Preparing the relay', '展开通信通道'], ['Contact interface ready', '通信界面就绪']],
  },
} as const

function EntryVisual({ theme, records }: { theme: Theme; records: EntryRecord[] }) {
  const { t } = useLanguage()

  if (theme === 'research') return (
    <div className={styles.research} aria-hidden="true">
      <div className={styles.paperStack}>
        {[0, 1, 2].map(index => <div key={index} className={styles.paper} style={{ '--index': index } as CSSProperties}>
          <span>{`REF_${String(index + 1).padStart(2, '0')}`}</span>
          <i /><i /><i />
          <b>{index === 2 ? 'INDEX' : '+'}</b>
        </div>)}
        <div className={styles.archiveScan} />
      </div>
      <div className={styles.indexRows}>
        {records.slice(0, 3).map((record, index) => <div key={record.id} style={{ '--index': index } as CSSProperties}>
          <span>{record.id}</span><strong>{record.label}</strong><b>↗</b>
        </div>)}
        {records.length === 0 && <p>{t('Archive ready for new research.', '研究档案已就绪，等待新条目。')}</p>}
      </div>
    </div>
  )

  if (theme === 'projects') return (
    <div className={styles.assembly} aria-hidden="true">
      <div className={styles.moduleDiagram}>
        <svg viewBox="0 0 440 160" fill="none"><path d="M72 80H368M220 25V135" /></svg>
        {['SOURCE', 'BUILD', 'TOOLS', 'ARCHIVE'].map((label, index) => <div key={label} className={styles.module} style={{ '--index': index } as CSSProperties}><i />{label}</div>)}
        <div className={styles.moduleCore}><span /><span /><span /></div>
      </div>
      <div className={styles.projectLabels}>{records.slice(0, 3).map((record, index) => <span key={record.id} style={{ '--index': index } as CSSProperties}>{record.label}</span>)}</div>
    </div>
  )

  if (theme === 'database') return (
    <div className={styles.matrix} aria-hidden="true">
      <div className={styles.matrixGrid}>
        {Array.from({ length: 32 }, (_, index) => <i key={index} style={{ '--index': index, '--level': [0.4, 0.7, 1, 0.6, 0.9][index % 5] } as CSSProperties} />)}
        <div className={styles.matrixSweep} />
      </div>
      <div className={styles.matrixLabels}>{records.map((record, index) => <div key={record.id} style={{ '--index': index } as CSSProperties}><span>{record.label}</span><strong>{record.meta}</strong></div>)}</div>
    </div>
  )

  if (theme === 'logs') return (
    <div className={styles.console} aria-hidden="true">
      <div className={styles.consoleHeader}><i /><i /><i /><span>archive / dev.log</span></div>
      <div className={styles.logLines}>
        {records.slice(0, 3).map((record, index) => <div key={record.id} style={{ '--index': index } as CSSProperties}><span>{record.id}</span><b>&gt;</b><strong>{record.label}</strong></div>)}
        {records.length === 0 && <div><span>[ARCHIVE]</span><strong>{t('No entries yet', '暂无日志条目')}</strong></div>}
        <p><span>&gt;</span> _<i /></p>
      </div>
    </div>
  )

  return (
    <div className={styles.relay} aria-hidden="true">
      <svg viewBox="0 0 440 160" fill="none">
        <path className={styles.relayGuide} d="M85 80H355" />
        <path className={styles.relaySignal} d="M85 80H355" />
        <path className={styles.relayReply} d="M355 92H85" />
        <rect x="38" y="56" width="48" height="48" /><rect x="354" y="56" width="48" height="48" />
        <rect className={styles.relayCore} x="55" y="73" width="14" height="14" />
        <rect className={styles.relayCore} x="371" y="73" width="14" height="14" />
        <text x="62" y="134" textAnchor="middle">VISITOR</text><text x="378" y="134" textAnchor="middle">YT / CONTACT</text>
      </svg>
      <div className={styles.relayChannels}><span>EMAIL</span><span>GITHUB</span><span>MESSAGE</span></div>
    </div>
  )
}

export default function PageEntrance({ page, records = [], children }: { page: Theme; records?: EntryRecord[]; children: ReactNode }) {
  const { t } = useLanguage()
  const { mode, finish, played } = usePageEntry(page, 2200)
  const [stage, setStage] = useState(0)
  const theme = themes[page]

  useEffect(() => {
    if (mode !== 'play') return
    const timers = [setTimeout(() => setStage(1), 650), setTimeout(() => setStage(2), 1600)]
    const skip = () => finish()
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') finish() }
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('keydown', keydown)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('keydown', keydown)
    }
  }, [mode, finish])

  return (
    <div data-page-entry={page} data-entry={mode} aria-busy={mode !== 'complete'}>
      {/* Keep archive content in server HTML; remount its small animations on reveal. */}
      <motion.div
        key={mode === 'complete' ? 'content' : 'preparing'}
        aria-hidden={mode !== 'complete' || undefined}
        style={{ visibility: mode === 'complete' ? 'visible' : 'hidden' }}
        initial={mode === 'complete' && played ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: mode === 'complete' ? 1 : 0, y: 0 }}
        transition={{ duration: played ? .35 : 0, ease: [.22, 1, .36, 1] }}
      >{children}</motion.div>
      {mode !== 'pending' && createPortal(<AnimatePresence>{mode === 'play' && <motion.div
        key={page}
        className={styles.overlay}
        data-entry-theme={page}
        data-entry-stage={stage}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: .2 }}
      >
        <div className={styles.panel}>
          <div className={styles.eyebrow}><span /><span>{theme.code}</span><b>INIT</b></div>
          <h2>{t(theme.title[0], theme.title[1])}</h2>
          <p className={styles.command}><span>&gt;</span> {theme.command}<i /></p>
          <EntryVisual theme={page} records={records} />
          <div className={styles.footer}>
            <span role="status">{t(theme.stages[stage][0], theme.stages[stage][1])}</span>
            <span>{String(stage + 1).padStart(2, '0')} / 03</span>
          </div>
          <div className={styles.progress}><span /></div>
          <button type="button" className={styles.skip} onClick={finish}>{t('Skip intro', '跳过动画')} <span>ESC</span></button>
        </div>
      </motion.div>}</AnimatePresence>, document.body)}
    </div>
  )
}
