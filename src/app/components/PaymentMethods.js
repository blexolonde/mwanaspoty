import { Smartphone, CreditCard, Wallet } from "lucide-react";

const METHODS = [
  { icon: Smartphone, label: "M-Pesa" },
  { icon: Smartphone, label: "Airtel Money" },
  { icon: CreditCard, label: "Visa" },
  { icon: CreditCard, label: "Mastercard" },
  { icon: CreditCard, label: "PayPal" },
  { icon: Wallet, label: "Payoneer" },
];

export default function PaymentMethods() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-xl font-bold text-center mb-6">We Accept</h2>
      <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:gap-4 max-w-4xl mx-auto">
        {METHODS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2"
            >
              <Icon size={20} className="text-gray-700" />
              <span className="text-sm font-semibold text-gray-700">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
