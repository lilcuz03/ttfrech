import { WhyItem } from "@/types/home";

interface Props {
  why: WhyItem[];
}

export default function WhyUsSection({ why }: Props) {
  return (
    <section className="bg-[#F5F0E8] py-24 px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-[#182338] mb-10">
          Why Choose Us
        </h2>

        <div className="space-y-6">
          {why.map((w) => (
            <div
              key={w.t}
              className="border-b border-black/10 pb-4"
            >
              <h4 className="font-semibold text-[#182338]">{w.t}</h4>
              <p className="text-sm text-gray-600">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
