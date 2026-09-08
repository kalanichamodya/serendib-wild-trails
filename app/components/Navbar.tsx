"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top information bar */}
      <div className="bg-[#2e3812] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-sm">
          <p> Habarana, Sri Lanka</p>

          <div className="hidden gap-5 sm:flex">
            <a href="tel:+94762801972">+94 76 280 1972</a>
            <a href="tel:+94767632044">+94 76 7632044</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Temporary text logo */}
          <a href="#home" className="text-lg font-bold text-[#173f35]">
            Serendib Wild Trails
            <span className="block text-xs font-medium text-[#d9902f]">
               SAFARI & EXPERIENCES
            </span>
          </a>

          {/* Desktop navigation links */}
            <div className="hidden items-center gap-6 text-sm font-medium text-[#2e3812] lg:flex">
            <a className="nav-link" href="#home">
              Home
            </a>

            <a className="nav-link" href="#about">
              About Us
            </a>

            <a className="nav-link" href="#safaris">
              Jeep Safaris
            </a>

            <a className="nav-link" href="#village">
              Village Tour
            </a>

            <a className="nav-link" href="#destinations">
              Destinations
            </a>

            <a className="nav-link" href="#gallery">
              Gallery
            </a>

            <a className="nav-link" href="#reviews">
              Reviews
            </a>

            <a className="nav-link" href="#contact">
              Contact
            </a>
          </div>

          {/* Desktop booking button */}
          <a
            href="https://wa.me/94762801972"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[#d9902f] px-6 py-3 font-semibold text-white transition hover:bg-[#b87420] lg:block"
          >
            Book Now →
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-2xl text-[#173f35] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 font-medium text-[#2e3812]">
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#safaris">Jeep Safaris</a>
              <a href="#village">Village Tour</a>
              <a href="#destinations">Destinations</a>
              <a href="#gallery">Gallery</a>
              <a href="#reviews">Reviews</a>
              <a href="#contact">Contact</a>

              <a
                href="https://wa.me/94767632044"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#c69a4b] px-5 py-3 text-center font-semibold text-white"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}