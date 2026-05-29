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
    <main className={`${montserrat.className} flex-1 bg-cream`}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var t=new Date().getTime();if(!location.search.includes('_t=')){location.replace(location.pathname+'?_t='+t)}})()`,
        }}
      />
      <header className="bg-primary text-white py-5 sm:py-6 px-4 text-center">
        <img src="/logo.png" alt="Logo" className="h-16 sm:h-20 md:h-24 lg:h-28 mx-auto mb-1" />
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary">Menu Digitale</p>
      </header>

      <MenuNav items={items} />
    </main>
  )
}
