import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Freshify. All rights reserved.
        </p>
        
        <div className="flex space-x-6 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-orange-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-orange-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-orange-600 transition-colors">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}