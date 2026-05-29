import Link from 'next/link'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function ScopriDipendentiPage() {
  return (
    <main className={`${montserrat.className} min-h-screen bg-slate-50 text-slate-900`}>
      <header className="bg-slate-900 text-white py-8 text-center">
        <p className="text-xl text-slate-200">Scopri il Menu Dipendenti</p>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif text-slate-900 mb-6">Benvenuto Area Staff</h2>
        <p className="text-lg text-slate-700 mb-8">
          Accedi al menu riservato ai dipendenti con le proposte proteiche e giornaliere.
        </p>
        <Link
          href="/staff/menu-dipendente"
          className="inline-block bg-slate-900 text-white px-10 py-5 rounded-lg text-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg"
        >
          Scopri il Menu Dipendenti
        </Link>
      </section>
    </main>
  )
}
