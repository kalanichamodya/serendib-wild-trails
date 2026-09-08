"use client";

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Quote,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

type Testimonial = {
  id: number;
  category: string;
  title: string;
  review: string;
  traveller: string;
  icon: "traveller" | "family" | "photographer";
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    category: "Wildlife Safari",
    title: "A peaceful wildlife experience",
    review:
      "The journey was comfortable, well organised and filled with memorable wildlife moments. The route felt relaxed and respectful towards the animals.",
    traveller: "International Traveller",
    icon: "traveller",
  },
  {
    id: 2,
    category: "Family Journey",
    title: "A wonderful day for the family",
    review:
      "The combination of wildlife, village activities and local food created an enjoyable experience for every member of our family.",
    traveller: "Family Traveller",
    icon: "family",
  },
  {
    id: 3,
    category: "Nature Photography",
    title: "Excellent opportunities for photography",
    review:
      "The changing landscapes and quiet wildlife encounters offered many opportunities to capture meaningful photographs throughout the journey.",
    traveller: "Nature Photographer",
    icon: "photographer",
  },
];

export default function Testimonials() {
  const [currentReview, setCurrentReview] = useState(0);

  const showPreviousReview = () => {
    setCurrentReview((previousReview) =>
      previousReview === 0 ? testimonials.length - 1 : previousReview - 1
    );
  };

  const showNextReview = () => {
    setCurrentReview((previousReview) =>
      previousReview === testimonials.length - 1 ? 0 : previousReview + 1
    );
  };

  const selectedTestimonial = testimonials[currentReview];

  const TravellerIcon =
    selectedTestimonial.icon === "family"
      ? Users
      : selectedTestimonial.icon === "photographer"
        ? Camera
        : Star;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#173f35] px-5 py-24"
    >
      {/* Decorative background */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full border border-white/10" />

      <div className="absolute -bottom-52 right-10 h-96 w-96 rounded-full border border-[#d9902f]/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-[#e7ad4a]">
                Sample Testimonials ---
              </p>
            </div>

            <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
              The kind of experience we aim to create.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl leading-7 text-white/65">
              These testimonials are sample content used to demonstrate the
              website layout. They should be replaced with verified guest
              feedback before publishing a real business website.
            </p>
          </div>
        </div>

        {/* Review area */}
        <div className="mt-14 grid overflow-hidden rounded-3xl bg-[#f8f5ee] lg:grid-cols-[0.8fr_2fr]">
          {/* Left profile panel */}
          <div className="flex flex-col justify-between bg-[#d9902f] p-8 text-white md:p-10">
            <div>
              <span className="inline-flex rounded-full border border-white/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                Demo Review
              </span>

              <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                <TravellerIcon size={30} strokeWidth={1.8} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Traveller Type
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {selectedTestimonial.traveller}
              </h3>
            </div>

            {/* Review count */}
            <div className="mt-10 border-t border-white/25 pt-6">
              <p className="text-4xl font-bold">
                {String(currentReview + 1).padStart(2, "0")}
              </p>

              <p className="mt-1 text-sm text-white/70">
                of {String(testimonials.length).padStart(2, "0")} testimonials
              </p>
            </div>
          </div>

          {/* Right review panel */}
          <div className="relative flex min-h-[420px] flex-col justify-between p-8 md:p-12">
            <Quote
              size={70}
              strokeWidth={1.3}
              className="absolute right-8 top-8 text-[#d9902f]/15"
            />

            <div className="relative">
              {/* Stars */}
              <div
                className="flex gap-1 text-[#d9902f]"
                aria-label="Five-star sample rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={19} fill="currentColor" />
                ))}
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#d9902f]">
                {selectedTestimonial.category}
              </p>

              <h3 className="mt-4 max-w-2xl text-3xl font-bold text-[#173f35] md:text-4xl">
                {selectedTestimonial.title}
              </h3>

              <blockquote className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl md:leading-9">
                “{selectedTestimonial.review}”
              </blockquote>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between border-t border-[#ded7c9] pt-6">
              {/* Slider dots */}
              <div className="flex gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => setCurrentReview(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    className={`h-2 rounded-full transition ${
                      currentReview === index
                        ? "w-8 bg-[#d9902f]"
                        : "w-2 bg-[#cfc7b8] hover:bg-[#173f35]"
                    }`}
                  />
                ))}
              </div>

              {/* Arrow controls */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={showPreviousReview}
                  aria-label="Show previous testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8d1c3] text-[#173f35] transition hover:border-[#173f35] hover:bg-[#173f35] hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={showNextReview}
                  aria-label="Show next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173f35] text-white transition hover:bg-[#d9902f]"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
