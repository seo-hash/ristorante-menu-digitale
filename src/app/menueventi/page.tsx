import { Montserrat } from 'next/font/google'
import { getPublicMenu } from '@/lib/supabase/menu'
import MenuPageLayout from '@/components/menu/MenuPageLayout'
import EventMenuTabs from '@/components/menu/EventMenuTabs'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export default async function MenuEventiPage() {
  const items = await getPublicMenu('eventi')

  return (
    <MenuPageLayout
      title="Menu Eventi"
      navItems={[
        { href: '/menu/bar', label: 'Bar & Colazione' },
        { href: '/menuristorante', label: 'Ristorante' },
        { href: '/menu/vini', label: 'Vini & Bevande' },
        { href: '/menu/proteico', label: 'Menu Proteico' },
      ]}
    >
      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg px-4">
          Il menu eventi è in aggiornamento, torna presto!
        </p>
      ) : (
        <EventMenuTabs items={items} />
      )}
    </MenuPageLayout>
  )
}
