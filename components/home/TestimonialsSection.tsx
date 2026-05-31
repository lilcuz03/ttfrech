import { Testimonial } from "@/types/home";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  return (
    <section className="bg-[#182338] py-24 px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-white text-4xl font-bold mb-10">Client Reviews</h2>

        <div className="grid lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 p-6 border border-white/10"
            >
              <p className="text-white/70 italic mb-4">&quot;{t.q}&quot;</p>
              <h4 className="text-[#C4A248]">{t.name}</h4>
              <p className="text-white/40 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
