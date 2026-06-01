import Link from 'next/link'
import { getPublicMenu } from '@/lib/supabase/menu'
import MenuPageLayout from '@/components/menu/MenuPageLayout'
import WeeklyMenuCard from '@/components/menu/WeeklyMenuCard'
import SimpleListSection from '@/components/menu/SimpleListSection'
import StandardMenuSection from '@/components/menu/StandardMenuSection'
import type { MenuDisplayItem, MenuSection } from '@/types/menu'

export const dynamic = 'force-dynamic'

function renderDbSection(item: MenuDisplayItem) {
  const section = item as MenuSection
  return (
    <div key={section.id}>
      {section.type === 'weekly' ? (
        <WeeklyMenuCard section={section} />
      ) : section.type === 'buffet' ? (
        <SimpleListSection section={section} />
      ) : (
        <StandardMenuSection section={section} />
      )}
    </div>
  )
}

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function MenuEventiPage({ searchParams }: PageProps) {
  const { tab } = await searchParams
  const activeTab = tab === 'buffet' ? 'buffet' : 'young'
  const items = await getPublicMenu('eventi')

  const youngItems = items.filter(
    (item) => item.type !== 'group' && (item as MenuSection).title === 'Young Menu'
  )
  const buffetItems = items.filter(
    (item) => item.type !== 'group' && (item as MenuSection).title === 'Buffet Menu'
  )

  const nav = (
    <nav className="bg-primary text-[#ECE4D4] px-4 py-3 text-center backdrop-blur-sm border-b border-primary/20 sticky bottom-0 left-0 right-0 z-10 sm:sticky sm:top-0 sm:z-10">
      <div className="flex justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
        <Link
          href="/menueventi"
          className={`text-sm sm:text-base transition-colors ${
            activeTab === 'young'
              ? 'text-[#ECE4D4] font-semibold border-b-2 border-[#ECE4D4] pb-1'
              : 'text-[#ECE4D4]/70 hover:text-[#ECE4D4]'
          }`}
        >
          Young Menu
        </Link>
        <Link
          href="/menueventi?tab=buffet"
          className={`text-sm sm:text-base transition-colors ${
            activeTab === 'buffet'
              ? 'text-[#ECE4D4] font-semibold border-b-2 border-[#ECE4D4] pb-1'
              : 'text-[#ECE4D4]/70 hover:text-[#ECE4D4]'
          }`}
        >
          Buffet Menu
        </Link>
      </div>
    </nav>
  )

  return (
    <MenuPageLayout title="Menu Eventi" customNav={nav}>
      {activeTab === 'young' ? (
        youngItems.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg px-4">
            Nessun menu young disponibile al momento.
          </p>
        ) : (
          <div className="space-y-14">{youngItems.map(renderDbSection)}</div>
        )
      ) : (
        <div>
          {buffetItems.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg px-4">
              Nessun buffet disponibile al momento.
            </p>
          ) : (
            <div className="space-y-14">{buffetItems.map(renderDbSection)}</div>
          )}
        </div>
      )}
    </MenuPageLayout>
  )
}
