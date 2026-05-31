import { ProcessItem } from "@/types/home";

interface Props {
  process: ProcessItem[];
}

export default function ProcessSection({ process }: Props) {
  return (
    <section className="bg-white py-24 px-[5%]">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Process</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {process.map((p) => (
            <div key={p.n}>
              <div className="w-14 h-14 mx-auto border border-[#C4A248] flex items-center justify-center font-bold">
                {p.n}
              </div>
              <h4 className="mt-4 font-semibold">{p.t}</h4>
              <p className="text-sm text-gray-600">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
