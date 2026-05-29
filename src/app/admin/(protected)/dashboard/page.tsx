'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

interface MenuItem {
  id: string
  category: string
  name: string
  description: string | null
  price: number
  available: boolean
}

interface Category {
  id: string
  name: string
  type: 'cibo' | 'vini'
  order: number
}

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'cibo' | 'vini'>('cibo')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [openCategoryForAdd, setOpenCategoryForAdd] = useState<string | null>(null)
  const [itemForm, setItemForm] = useState({ name: '', description: '', price: '', available: true })

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    const { data: items } = await supabase.from('menu_items').select('*')
    const { data: cats } = await supabase.from('category_order').select('*').order('order', { ascending: true })

    if (items) setMenuItems(items)
    if (cats) setCategories(cats)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchData() }, [fetchData])

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  const filteredCategories = categories.filter(c => c.type === activeTab)

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    const maxOrder = categories.reduce((max, c) => Math.max(max, c.order), -1)
    const { data } = await supabase.from('category_order').insert([{ name: newCategoryName.trim(), type: activeTab, order: maxOrder + 1 }]).select().single()
    if (data) { setCategories([...categories, data]); setNewCategoryName(''); setShowAddCategory(false) }
  }

  const handleUpdateCategoryName = async (id: string) => {
    const old = categories.find(c => c.id === id)
    if (!old || !editingCategoryName.trim()) return
    await supabase.from('category_order').update({ name: editingCategoryName.trim() }).eq('id', id)
    await supabase.from('menu_items').update({ category: editingCategoryName.trim() }).eq('category', old.name)
    setCategories(categories.map(c => c.id === id ? { ...c, name: editingCategoryName.trim() } : c))
    setMenuItems(menuItems.map(i => i.category === old.name ? { ...i, category: editingCategoryName.trim() } : i))
    setEditingCategory(null)
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Eliminare questa sezione e tutti i suoi piatti?')) return
    const cat = categories.find(c => c.id === id)
    if (!cat) return
    await supabase.from('menu_items').delete().eq('category', cat.name)
    await supabase.from('category_order').delete().eq('id', id)
    setCategories(categories.filter(c => c.id !== id))
    setMenuItems(menuItems.filter(i => i.category !== cat.name))
  }

  const handleMoveCategory = async (id: string, dir: 'up' | 'down') => {
    const filtered = categories.filter(c => c.type === activeTab)
    const idx = filtered.findIndex(c => c.id === id)
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === filtered.length - 1)) return
    const current = filtered[idx]
    const swap = filtered[dir === 'up' ? idx - 1 : idx + 1]
    await supabase.from('category_order').update({ order: swap.order }).eq('id', current.id)
    await supabase.from('category_order').update({ order: current.order }).eq('id', swap.id)
    fetchData()
  }

  const handleSaveItem = async (category: string) => {
    if (!itemForm.name.trim() || !itemForm.price) return
    const data = { category, name: itemForm.name.trim(), description: itemForm.description.trim() || null, price: parseFloat(itemForm.price), available: itemForm.available }
    if (editingItemId) { await supabase.from('menu_items').update(data).eq('id', editingItemId) } else { await supabase.from('menu_items').insert([data]) }
    resetItemForm()
    fetchData()
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItemId(item.id)
    setOpenCategoryForAdd(item.category)
    setItemForm({ name: item.name, description: item.description || '', price: item.price.toString(), available: item.available })
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Eliminare questo piatto?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    fetchData()
  }

  const resetItemForm = () => { setEditingItemId(null); setOpenCategoryForAdd(null); setItemForm({ name: '', description: '', price: '', available: true }) }

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = '/admin/login' }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-xl font-serif">Caricamento...</p></div>

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-dark text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 sm:h-12" />
          <span className="text-lg sm:text-xl font-serif hidden sm:inline">Editor Menu</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/menu/cibo" className="text-secondary hover:text-white text-sm">Vedi Menu Pubblico</Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">Esci</button>
        </div>
      </header>

      <div className="flex border-b bg-white">
        <button onClick={() => setActiveTab('cibo')} className={`flex-1 py-3 text-center font-medium ${activeTab === 'cibo' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Menu Cucina</button>
        <button onClick={() => setActiveTab('vini')} className={`flex-1 py-3 text-center font-medium ${activeTab === 'vini' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Menu Vini & Bevande</button>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-semibold">{activeTab === 'cibo' ? 'Sezioni Cucina' : 'Sezioni Vini & Bevande'}</h2>
          <button onClick={() => setShowAddCategory(true)} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#003D5A] text-sm">+ Nuova Sezione</button>
        </div>

        {showAddCategory && (
          <div className="bg-white rounded-lg shadow p-4 mb-4 flex gap-2">
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nome sezione (es. Antipasti, Vini Rossi...)" className="flex-1 px-3 py-2 border rounded-lg text-base" autoFocus />
            <button onClick={handleAddCategory} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#003D5A]">Aggiungi</button>
            <button onClick={() => { setShowAddCategory(false); setNewCategoryName('') }} className="bg-gray-200 px-4 py-2 rounded-lg">Annulla</button>
          </div>
        )}

        {filteredCategories.map((cat, idx) => (
          <div key={cat.id} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleMoveCategory(cat.id, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-primary disabled:opacity-30 text-lg sm:text-xs leading-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded">▲</button>
                  <button onClick={() => handleMoveCategory(cat.id, 'down')} disabled={idx === filteredCategories.length - 1} className="text-gray-400 hover:text-primary disabled:opacity-30 text-lg sm:text-xs leading-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded">▼</button>
                </div>
                {editingCategory === cat.id ? (
                  <input type="text" value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} onBlur={() => handleUpdateCategoryName(cat.id)} onKeyDown={(e) => { if (e.key === 'Enter') handleUpdateCategoryName(cat.id) }} className="font-serif font-semibold text-base px-2 py-1 border rounded w-48" autoFocus />
                ) : (
                  <h3 className="font-serif font-semibold text-lg cursor-pointer hover:text-primary" onClick={() => { setEditingCategory(cat.id); setEditingCategoryName(cat.name) }}>{cat.name}</h3>
                )}
                <span className="text-gray-400 text-sm">({groupedMenu[cat.name]?.length || 0})</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setOpenCategoryForAdd(openCategoryForAdd === cat.name ? null : cat.name)} className="text-primary hover:text-red-900 text-sm font-medium">+ Aggiungi</button>
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700 text-sm">Elimina</button>
              </div>
            </div>

            {openCategoryForAdd === cat.name && (
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="font-medium mb-3 text-sm">{editingItemId ? 'Modifica Piatto' : 'Nuovo Piatto'}</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input type="text" value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} placeholder="Nome *" className="px-3 py-2 border rounded-lg text-base" />
                  <input type="number" step="0.01" value={itemForm.price} onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })} placeholder="Prezzo (€) *" className="px-3 py-2 border rounded-lg text-base" />
                </div>
                <input type="text" value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} placeholder="Descrizione (opzionale)" className="w-full px-3 py-2 border rounded-lg mb-3 text-base" />
                <label className="flex items-center gap-2 cursor-pointer text-sm mb-3">
                  <input type="checkbox" checked={itemForm.available} onChange={(e) => setItemForm({ ...itemForm, available: e.target.checked })} />
                  Disponibile
                </label>
                <div className="flex gap-2">
                  <button onClick={() => handleSaveItem(cat.name)} disabled={!itemForm.name || !itemForm.price} className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-[#003D5A]">{editingItemId ? 'Salva' : 'Aggiungi'}</button>
                  <button onClick={resetItemForm} className="bg-gray-200 px-4 py-2 rounded-lg">Annulla</button>
                </div>
              </div>
            )}

            <div className="divide-y">
              {(groupedMenu[cat.name] || []).map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${!item.available ? 'opacity-40' : ''}`}>{item.name}</span>
                      {!item.available && <span className="text-xs text-gray-400 italic">Non disponibile</span>}
                    </div>
                    {item.description && <p className="text-sm text-gray-500 italic">{item.description}</p>}
                  </div>
                  <span className="font-semibold text-primary mr-4">€{item.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditItem(item)} className="text-blue-600 hover:text-blue-800 text-sm">Modifica</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700 text-sm">Elimina</button>
                  </div>
                </div>
              ))}
              {(!groupedMenu[cat.name] || groupedMenu[cat.name].length === 0) && (
                <div className="px-4 py-6 text-center text-gray-400 text-sm italic">Nessun piatto. Clicca "+ Aggiungi" per aggiungere.</div>
              )}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Nessuna sezione creata</p>
            <p className="text-sm mt-1">Clicca "Nuova Sezione" per iniziare</p>
          </div>
        )}
      </section>
    </main>
  )
}
