import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-8 text-center">
        <img src="/logo.png" alt="Logo" className="h-24 sm:h-32 md:h-40 mx-auto mb-2" />
        <p className="text-xl text-secondary">Menu Digitale</p>
      </header>

      <img
        src="/locale.jpg"
        alt="ISIDE"
        className="w-full h-48 sm:h-64 md:h-80 object-cover"
      />

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif text-dark mb-6">Benvenuti</h2>
        <p className="text-lg text-gray-700 mb-8">
          Scopri il nostro menu e lasciati conquistare dai sapori autentici della nostra cucina.
        </p>

        <Link
          href="/menu"
          className="inline-block bg-primary text-white px-10 py-5 rounded-lg text-xl font-semibold hover:bg-[#003D5A] transition-colors shadow-lg"
        >
          Scopri il Menu
        </Link>
      </section>

    </main>
  )
}
