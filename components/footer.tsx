import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Lezzet Dünyası. Tüm hakları saklıdır.
        </p>
        <div className="flex space-x-6 text-sm text-slate-500">
          <Link href="/gizlilik" className="hover:text-orange-600 transition-colors">Gizlilik Politikası</Link>
          <Link href="/kullanim" className="hover:text-orange-600 transition-colors">Kullanım Şartları</Link>
          <Link href="/iletisim" className="hover:text-orange-600 transition-colors">İletişim</Link>
        </div>
      </div>
    </footer>
  );
}