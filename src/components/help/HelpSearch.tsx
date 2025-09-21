"use client";

import { useRef, useState } from "react";
import { useHelp } from "./HelpContext";
import { FaSearch } from "react-icons/fa";
import HelpSuggestions from "./HelpSuggestions";

export default function HelpSearch() {
  const { searchTerm, setSearchTerm } = useHelp();
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);

  return (
    <div className="max-w-2xl mx-auto relative">
      <div ref={anchorRef} className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--cp-cyan)]" />
        <input
          type="text"
          placeholder="Busca tu duda en el cyberespacio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          // no cierres en blur: el cierre lo maneja click-outside en Suggestions
          className="w-full pl-12 pr-6 py-4 bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.3)] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--cp-cyan)] focus:ring-2 focus:ring-[var(--cp-cyan)]/20 transition-all duration-300"
        />
      </div>

      {/* Dropdown en portal, posicionado bajo el input */}
      <HelpSuggestions anchorRef={anchorRef} focused={focused} />
    </div>
  );
}
