import type { Metadata } from 'next'
import ProfileContent from './ProfileContent'

export const metadata: Metadata = {
  title: 'Profile — Portfolio',
}

export default function ProfilePage() {
  return <ProfileContent />
}
