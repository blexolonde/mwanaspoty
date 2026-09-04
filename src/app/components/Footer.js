import Link from "next/link";

const SOCIALS = [
  { image: "/facebook-logo.png", label: "Facebook", href: "#" },
  { image: "/instagram-logo.png", label: "Instagram", href: "#" },
  { image: "/x-logo.png", label: "X (Twitter)", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-gray-300 mt-16">
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
              <Link href="/account" className="hover:text-accent">
                My Account
              </Link>
            </li>{" "}
            <li>
              <Link href="/account/orders" className="hover:text-accent">
                Track My Order
              </Link>
            </li>{" "}
            <li>
              <Link href="/cart" className="hover:text-accent">
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
              <Link href="/shop" className="hover:text-accent">
                All Jerseys
              </Link>
            </li>{" "}
            <li>
              <Link href="/categories" className="hover:text-accent">
                Categories
              </Link>
            </li>{" "}
            <li>
              <Link href="/best-sellers" className="hover:text-accent">
                Best Sellers
              </Link>
            </li>{" "}
            <li>
              <Link href="/wishlist" className="hover:text-accent">
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
              <Link href="/register" className="hover:text-accent">
                Create Account
              </Link>
            </li>{" "}
            <li>
              <Link href="/login" className="hover:text-accent">
                Login
              </Link>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>{" "}
          <div className="flex gap-3">
            {" "}
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-accent transition-colors"
              >
                <img
                  src={social.image}
                  alt={social.label}
                  className="h-5 w-5 object-contain"
                />
              </a>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        {" "}
        © {new Date().getFullYear()} MwanaSpoty. All rights reserved.{" "}
      </div>{" "}
    </footer>
  );
}
