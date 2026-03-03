/** Merge class names (minimal implementation, no external dep) */
export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(' ')
}

/** Format a date string "YYYY-MM-DD" → "Jan 15, 2025" */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
