import { Truck, Footprints, Bike } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Delivery Fee", subtext: "KES 350 Flat Rate" },
  { icon: Footprints, title: "CBD Delivery", subtext: "KES 100 (Nairobi)" },
  { icon: Bike, title: "Within Nairobi", subtext: "Delivered in 4hrs" },
  { icon: Truck, title: "Rest of Kenya", subtext: "Delivered in 24hrs" },
];

export default function DeliveryInfoBar() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:justify-center md:gap-16 max-w-6xl mx-auto">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent-dark" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-navy">
                  {item.title}
                </p>
                <p className="text-xs text-muted">{item.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
