import { createClient } from '@/lib/supabase-server'
import MenuPageLayout from '@/components/menu/MenuPageLayout'
import MenuSection from '@/components/MenuSection'

interface MenuItem {
  id: string
  category: string
  name: string
  description: string | null
  price: number
  available: boolean
}

interface Category {
  name: string
  order: number
}

export const dynamic = 'force-dynamic'

export default async function MenuCiboPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('category_order')
    .select('name, order')
    .eq('type', 'cibo')
    .order('order', { ascending: true })

  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('available', true)

  const groupedMenu = (menuItems || []).reduce((acc, item: MenuItem) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  const { data: { session } } = await supabase.auth.getSession()

  const orderedCategories = (categories || []).map((c: Category) => ({
    name: c.name,
    items: groupedMenu[c.name] || []
  })).filter(c => c.items.length > 0)

  return (
    <MenuPageLayout
      title="Menu Cucina"
      navItems={[
        { href: '/menu/cibo', label: 'Cucina', active: true },
        { href: '/menu/vini', label: 'Vini & Bevande' },
      ]}
      banner={
        session ? (
          <div className="bg-dark text-white py-2 px-3 text-center text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-1">
            <span>Modalità admin</span>
            <a href="/admin/dashboard" className="text-secondary hover:text-white underline">Torna all'editor →</a>
          </div>
        ) : null
      }
    >
      {orderedCategories.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg px-4">Menu in aggiornamento, torna presto!</p>
      ) : (
        orderedCategories.map(({ name, items }) => (
          <MenuSection key={name} category={name} items={items} />
        ))
      )}
    </MenuPageLayout>
  )
}
