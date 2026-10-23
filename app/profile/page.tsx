import type { Metadata } from 'next'
import ProfileContent from './ProfileContent'

export const metadata: Metadata = {
  title: 'Yutong Zhang — Robotics Research & Engineering',
  description: 'Robot learning, locomotion control, and sim-to-real deployment. The personal portfolio of Yutong Zhang.',
}

export default function ProfilePage() {
  return <ProfileContent />
}
