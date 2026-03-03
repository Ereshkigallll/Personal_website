'use client'

interface StatusDotProps {
  color?: 'green' | 'yellow' | 'red'
  label?: string
}

export default function StatusDot({ color = 'green', label }: StatusDotProps) {
  const colorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-500',
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${colorMap[color]} animate-breathe`} />
      {label && (
        <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
          {label}
        </span>
      )}
    </span>
  )
}
