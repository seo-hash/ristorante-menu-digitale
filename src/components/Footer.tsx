import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-6 sm:py-8 text-center mt-auto px-4">
      <p className="text-secondary font-semibold text-sm sm:text-lg mb-1">Iside - Events | Lounge | Living</p>
      <p className="text-gray-400 text-xs sm:text-sm mb-1 leading-relaxed">Un servizio di Promotergroup S.p.A.</p>
      <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed">Promoter srl - P.IVA: 01376750889</p>
      <div className="flex justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
        <Link href="/privacy" className="text-secondary hover:text-white transition-colors">Privacy Policy</Link>
        <span className="text-gray-500">|</span>
        <Link href="/cookie" className="text-secondary hover:text-white transition-colors">Cookie Policy</Link>
      </div>
    </footer>
  )
}
