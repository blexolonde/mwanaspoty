import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      {" "}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-3">
            Customer Service
          </h3>{" "}
          <ul className="space-y-2 text-sm">
            {" "}
            <li>
              <Link href="/account" className="hover:text-white">
                My Account
              </Link>
            </li>{" "}
            <li>
              <Link href="/account/orders" className="hover:text-white">
                Track My Order
              </Link>
            </li>{" "}
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-3">Shop</h3>{" "}
          <ul className="space-y-2 text-sm">
            {" "}
            <li>
              <Link href="/shop" className="hover:text-white">
                All Jerseys
              </Link>
            </li>{" "}
            <li>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>{" "}
            <li>
              <Link href="/best-sellers" className="hover:text-white">
                Best Sellers
              </Link>
            </li>{" "}
            <li>
              <Link href="/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-3">Company</h3>{" "}
          <ul className="space-y-2 text-sm">
            {" "}
            <li>
              <Link href="/register" className="hover:text-white">
                Create Account
              </Link>
            </li>{" "}
            <li>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>{" "}
          <div className="flex gap-4">
            {" "}
            <span>Facebook</span> <span>Instagram</span>{" "}
            <span>Twitter</span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="border-t border-slate-700 py-4 text-center text-xs text-gray-500">
        {" "}
        © {new Date().getFullYear()} MwanaSpoty. All rights reserved.{" "}
      </div>{" "}
    </footer>
  );
}
