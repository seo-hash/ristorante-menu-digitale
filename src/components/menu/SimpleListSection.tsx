'use client'

import type { MenuSection } from '@/types/menu'

interface SimpleListSectionProps {
  section: MenuSection
}

export default function SimpleListSection({ section }: SimpleListSectionProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-14">
      <div className="text-center mb-5 sm:mb-6 md:mb-8 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-primary tracking-wide leading-tight">
          {section.title}
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2">
          <div className="h-px bg-secondary/50 w-10 sm:w-12 md:w-16" />
          <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
          <div className="h-px bg-secondary/50 w-10 sm:w-12 md:w-16" />
        </div>
      </div>
      <div className="space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-0 text-center">
        {section.items.map((item) => {
          const subItems = item.description
            ? item.description.split(',').map((s) => s.trim())
            : []

          return (
            <div key={item.id}>
              <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold text-dark tracking-wide leading-snug break-words uppercase">
                {item.name}
              </h3>
              {subItems.length > 0 && (
                <div className="mt-2 space-y-1">
                  {subItems.map((sub, i) => (
                    <p key={i} className="text-sm sm:text-base md:text-lg font-serif text-dark tracking-wide leading-snug break-words">
                      {sub}
                    </p>
                  ))}
                </div>
              )}
              <div className="h-px bg-gray-200 mt-3 sm:mt-4 max-w-xs mx-auto" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
