import { Truck, Footprints, Bike } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Delivery Fee", subtext: "KES 350 Flat Rate" },
  { icon: Footprints, title: "CBD Delivery", subtext: "KES 100 (Nairobi)" },
  { icon: Bike, title: "Within Nairobi", subtext: "Delivered in 4hrs" },
  { icon: Truck, title: "Rest of Kenya", subtext: "Delivered in 24hrs" },
];

export default function DeliveryInfoBar() {
  return (
    <section className="py-8 px-6">
      <div className="grid grid-cols-2 gap-6 md:flex md:justify-center md:gap-16 max-w-6xl mx-auto">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
