"use client";

import { useState } from "react";
import { safaris } from "../../lib/content/safaris";
import { destinationCards } from "../../lib/content/destinations";
import styles from "./QuickBooking.module.css";

export default function QuickBooking() {
  const [experience, setExperience] = useState("Jeep Safari");
  const [destination, setDestination] = useState("Minneriya National Park");

  const bookingLink = `/booking?${new URLSearchParams({ experience, destination })}`;

  return (
    <section className="relative z-20 mx-auto -mb-16 w-full max-w-[1180px] -translate-y-1/4 px-5">
      <div className="grid overflow-hidden rounded-[26px] bg-[#f3efe9] shadow-[0_18px_35px_rgba(0,0,0,0.18)] ring-1 ring-[#d6c8b4] lg:grid-cols-[0.9fr_1.9fr_0.8fr]">
        <div className="bg-[#2f3f1e] p-5 text-white md:p-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#e0b566]">
            Start Your Journey ---
          </p>

          <h2 className="mt-4 max-w-[220px] text-[2.2rem] font-bold leading-[0.94] tracking-[-0.05em]">
            Plan the perfect day.
          </h2>

          <p className="mt-4 max-w-[220px] text-sm leading-6 text-[#dfe5d7]">
            Select your preferred experience and destination.
          </p>
        </div>

        <div className="grid gap-5 bg-[#f3efe9] p-5 md:p-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="experience"
              className="mb-3 block text-[15px] font-semibold text-[#2b2d2b]"
            >
              Experience
            </label>

            <div className="relative">
              <select
                id="experience"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className={styles.select}
              >
                <option>Jeep Safari</option>
                <option>Village Tour</option>
                <option>Cultural Tour</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-[#2b2d2b]">
                ▾
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="destination"
              className="mb-3 block text-[15px] font-semibold text-[#2b2d2b]"
            >
              Destination
            </label>

            <div className="relative">
              <select
                id="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={styles.select}
              >
                {safaris.map(safari => <option key={safari.location}>{safari.location}</option>)}
                {destinationCards.map(destination => <option key={destination.name}>{destination.name}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-[#2b2d2b]">
                ▾
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-[#f3efe9] p-5 md:p-6">
          <a
            href={bookingLink}
            className="whitespace-nowrap rounded-full bg-[#c69a4b] px-6 py-4 text-center text-[1.1rem] font-semibold text-white shadow-sm transition hover:bg-[#a97c32]"
          >
            Check Availability →
          </a>

          <p className="mt-3 text-center text-[12px] text-[#5c5a57]">
            Send your booking request
          </p>
        </div>
      </div>
    </section>
  );
}
