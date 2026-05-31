import Link from "next/link";
import { Service } from "@/types/home";

interface Props {
  services: Service[];
}

export default function ServicesSection({ services }: Props) {
  return (
    <section className="bg-[#101828] py-24 px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-white text-4xl font-bold mb-10">Our Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 bg-white/5 border border-white/10"
            >
              <div className="text-[#C4A248] text-3xl">{s.n}</div>
              <h3 className="text-white text-xl mt-2">{s.title}</h3>
              <p className="text-white/60 text-sm mt-2">{s.desc}</p>

              <Link
                href="/services"
                className="text-[#C4A248] text-xs mt-4 inline-block"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
