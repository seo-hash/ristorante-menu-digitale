import { getPublicMenu } from '@/lib/supabase/menu'
import type { MenuDisplayItem } from '@/types/menu'

export async function getMenuData(): Promise<MenuDisplayItem[]> {
  return getPublicMenu('all')
}
