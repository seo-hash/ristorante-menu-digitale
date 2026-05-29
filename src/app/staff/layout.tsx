import type { ReactNode } from 'react'

export const metadata = {
  title: 'ISIDE - Area Staff',
}

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {children}
    </div>
  )
}
