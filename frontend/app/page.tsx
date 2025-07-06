"use client"

import dynamic from 'next/dynamic'

const LandingPageClient = dynamic(() => import('./landing-page-client'), {
  ssr: false,
})

export default function LandingPage() {
  return <LandingPageClient />
}
