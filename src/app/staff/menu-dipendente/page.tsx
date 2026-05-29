import { getStaffDipendenteMenu } from '@/lib/supabase/menu'
import MenuPageLayout from '@/components/menu/MenuPageLayout'
import StandardMenuSection from '@/components/menu/StandardMenuSection'
import type { MenuSection } from '@/types/menu'

export const dynamic = 'force-dynamic'

export default async function StaffMenuDipendentePage() {
  const menuByDay = await getStaffDipendenteMenu()
  const sections: MenuSection[] = menuByDay.map((day) => ({
    id: `dipendente-${day.day.toLowerCase().replace(/\s+/g, '-')}`,
    title: day.day,
    type: 'employee',
    basePrice: 5.5,
    items: day.items.map((item) => ({
      ...item,
      price: 5.5,
    })),
    order: 0,
  }))

  return (
    <MenuPageLayout title="Menu Dipendente" subtitle="Pagina riservata al personale, prezzo fisso 5,50€.">
      {sections.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg px-4">
          Nessun menu dipendente disponibile al momento.
        </p>
      ) : (
        sections.map((section) => <StandardMenuSection key={section.id} section={section} />)
      )}
    </MenuPageLayout>
  )
}
