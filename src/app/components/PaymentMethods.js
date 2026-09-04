import { Wallet } from "lucide-react";

const METHODS = [
  { image: "/mpesaa.png", label: "M-Pesa" },
  { image: "/Airtel-Money.png", label: "Airtel Money" },
  { image: "/visa.png", label: "Visa" },
  { image: "/mastercard.png", label: "Mastercard" },
  { image: "/paypal.png", label: "PayPal" },
  { image: "/payoneer.png", icon: Wallet, label: "Payoneer" },
];

export default function PaymentMethods() {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-6 text-navy">
        We Accept
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
        {METHODS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-center border border-line rounded-full px-5 py-3 h-12 sm:h-14"
              title={item.label}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              ) : (
                <Icon size={22} className="text-ink" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
