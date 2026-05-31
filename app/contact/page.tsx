"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#101828] text-[#F5F0E8]">
      {/* HERO */}
      <section className="relative py-24 px-6 lg:px-10 border-b border-[rgba(196,162,72,.08)]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[11px] tracking-[2.5px] uppercase text-[#C4A248] mb-4">
            Contact TtFRECH
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Let&apos;s Build Something{" "}
            <span className="text-[#C4A248]">Together</span>
          </h1>
          <p className="mt-6 text-[rgba(245,240,232,.5)] max-w-[600px] mx-auto text-sm md:text-base leading-relaxed">
            Get in touch for residential builds, renovations, roofing, and full
            project management across Durban &amp; KwaZulu-Natal.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* FORM */}
        <div className="bg-[#182338] border border-[rgba(196,162,72,.12)] p-8">
          <h2 className="text-xl font-semibold mb-6">Request a Free Quote</h2>

          {/* Success state */}
          {status === "success" && (
            <div className="mb-6 p-4 bg-[rgba(196,162,72,.08)] border border-[rgba(196,162,72,.3)] text-sm text-[#C4A248]">
              ✓ Message sent! We&apos;ll get back to you within 24 hours.
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="mb-6 p-4 bg-[rgba(255,80,80,.06)] border border-[rgba(255,80,80,.25)] text-sm text-red-400">
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#101828] border border-[rgba(245,240,232,.08)] text-sm outline-none focus:border-[#C4A248] transition-colors"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#101828] border border-[rgba(245,240,232,.08)] text-sm outline-none focus:border-[#C4A248] transition-colors"
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#101828] border border-[rgba(245,240,232,.08)] text-sm outline-none focus:border-[#C4A248] transition-colors"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#101828] border border-[rgba(245,240,232,.08)] text-sm outline-none focus:border-[#C4A248] transition-colors text-[rgba(245,240,232,.6)]"
            >
              <option value="">Select a Service</option>
              <option value="Residential Construction">
                Residential Construction
              </option>
              <option value="Commercial Builds">Commercial Builds</option>
              <option value="Renovations & Upgrades">
                Renovations &amp; Upgrades
              </option>
              <option value="Roofing & Waterproofing">
                Roofing &amp; Waterproofing
              </option>
              <option value="Project Management">Project Management</option>
              <option value="Site Inspections">Site Inspections</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-[#101828] border border-[rgba(245,240,232,.08)] text-sm outline-none focus:border-[#C4A248] transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#C4A248] text-[#101828] py-3 text-[11px] font-semibold tracking-[1.5px] uppercase hover:bg-[#DFC05A] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="space-y-10">
          {/* Contact Details */}
          <div>
            <h3 className="text-[11px] tracking-[2.5px] uppercase text-[#C4A248] mb-4">
              Contact Details
            </h3>
            <div className="space-y-2 text-sm text-[rgba(245,240,232,.7)]">
              <p>📞 073 610 1014</p>
              <p>📞 081 353 2248</p>
              <p>✉️ contact@ttfrech.co.za</p>
              <p>📍 Durban, KwaZulu-Natal</p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-[11px] tracking-[2.5px] uppercase text-[#C4A248] mb-4">
              Business Hours
            </h3>
            <div className="text-sm text-[rgba(245,240,232,.7)] space-y-1">
              <p>Monday – Friday: 08:00 – 17:00</p>
              <p>Saturday: 08:00 – 13:00</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-[11px] tracking-[2.5px] uppercase text-[#C4A248] mb-4">
              Service Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Durban",
                "Umhlanga",
                "Ballito",
                "Westbrook",
                "Tongaat",
                "Verulam",
                "Pinetown",
                "La Lucia",
              ].map((area) => (
                <span
                  key={area}
                  className="text-[11px] px-3 py-1 border border-[rgba(245,240,232,.1)] text-[rgba(245,240,232,.6)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#182338] border border-[rgba(196,162,72,.12)] p-6">
            <h3 className="text-lg font-semibold mb-2">
              Need urgent assistance?
            </h3>
            <p className="text-sm text-[rgba(245,240,232,.6)] mb-4">
              Call us directly for fast project support.
            </p>
            <a
              href="tel:+270736101014"
              className="inline-block bg-[#C4A248] text-[#101828] px-6 py-3 text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-[#DFC05A] transition"
            >
              Call Now
            </a>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="text-sm text-[rgba(245,240,232,.4)] hover:text-[#C4A248] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
