import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Pete Campus Bites</h3>
            <p className="text-gray-600 mb-4">Delicious food delivered to your doorstep on campus.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-red-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-red-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-red-600">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-600 hover:text-red-600">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-red-600">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">123 Campus Drive</li>
              <li className="text-gray-600">University City, ST 12345</li>
              <li>
                <a href="tel:+11234567890" className="text-gray-600 hover:text-red-600">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@petecampusbites.com" className="text-gray-600 hover:text-red-600">
                  info@petecampusbites.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Pete Campus Bites. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
