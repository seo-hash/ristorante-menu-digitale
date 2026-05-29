import { Montserrat } from 'next/font/google'
import { getMenuData } from '@/lib/menu-service'
import MenuNav from '@/components/menu/MenuNav'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export default async function MenuPage() {
  const items = await getMenuData()

  return (
    <main className={`${montserrat.className} flex-1 bg-iside`}>
      <header className="bg-iside-primary text-white py-12 sm:py-14 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase">
          Il Nostro Menu
        </h1>
      </header>

      <MenuNav items={items} />
    </main>
  )
}
