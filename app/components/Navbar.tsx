"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "safaris", label: "Jeep Safaris" },
  { id: "village", label: "Village Tour" },
  { id: "destinations", label: "Destinations" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = links.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const previousMargins = sections.map((section) => section.style.scrollMarginTop);
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const offset = (navRef.current?.offsetHeight ?? 88) + 24;
      let current = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id ?? current;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    const updateOffsets = () => {
      const offset = (navRef.current?.offsetHeight ?? 88) + 16;
      sections.forEach((section) => { section.style.scrollMarginTop = `${offset}px`; });
      scheduleUpdate();
    };
    const observer = new ResizeObserver(updateOffsets);
    if (navRef.current) observer.observe(navRef.current);
    sections.forEach((section) => observer.observe(section));
    updateOffsets();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateOffsets);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateOffsets);
      window.removeEventListener("hashchange", scheduleUpdate);
      sections.forEach((section, index) => { section.style.scrollMarginTop = previousMargins[index]; });
    };
  }, []);

  const renderLinks = (mobile = false) => links.map(({ id, label }) => (
    <a
      key={id}
      href={`/#${id}`}
      aria-current={activeSection === id ? "location" : undefined}
      onClick={() => { setActiveSection(id); setMenuOpen(false); }}
      className={`relative rounded-lg font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9902f] ${mobile ? "px-4 py-3 text-sm" : "px-2 py-3 text-[13px] xl:px-2.5"} ${activeSection === id ? "bg-[#d9902f]/10 text-[#a46116]" : "text-[#344334] hover:bg-[#f5f3ec] hover:text-[#a46116]"}`}
    >
      {label}
      {activeSection === id && !mobile && <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[#d9902f]" />}
    </a>
  ));

  return (
    <>
      <div className="bg-[#2e3812] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:text-sm">
          <p className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" /> Habarana, Sri Lanka</p>
          <div className="hidden gap-5 sm:flex">
            <a href="tel:+94762801972" className="transition-colors hover:text-[#efbf78]">+94 76 280 1972</a>
            <a href="tel:+94767632044" className="transition-colors hover:text-[#efbf78]">+94 76 7632044</a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#173f35]/10 bg-[#fffdf8]/95 shadow-[0_4px_24px_rgba(23,63,53,0.05)] backdrop-blur-md">
        <nav ref={navRef} aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <a href="/#home" onClick={() => { setActiveSection("home"); setMenuOpen(false); }} className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9902f]">
            <Image
              src="/images/safari-logo-transparent.png"
              alt="Safari Travel elephant logo"
              width={664}
              height={683}
              sizes="64px"
              loading="eager"
              className="h-auto w-14 shrink-0 object-contain sm:w-16"
            />
            <span className="text-[15px] font-bold tracking-tight text-[#173f35] sm:text-lg lg:text-[15px] xl:text-lg">
              Serendib Wild Trails
              <span className="mt-1 block text-[8px] font-semibold tracking-[0.2em] text-[#a46116] sm:text-[9px]">SAFARI &amp; EXPERIENCES</span>
            </span>
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">{renderLinks()}</div>
          <a href="https://wa.me/94762801972" target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-2 rounded-full bg-[#d9902f] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b87420] lg:flex xl:px-5">
            Book Now <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button type="button" className="rounded-xl border border-[#173f35]/15 p-2.5 text-[#173f35] transition-colors hover:bg-[#173f35]/5 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
        {menuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-90px)] overflow-y-auto border-t border-[#173f35]/10 bg-[#fffdf8] px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {renderLinks(true)}
              <a href="https://wa.me/94767632044" target="_blank" rel="noopener noreferrer" className="mt-3 rounded-full bg-[#c69a4b] px-5 py-3 text-center font-semibold text-white">Book Now</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
