import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function ButtonLink({ text, to, className }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .fh-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1.5px solid rgba(74, 46, 26, 0.25);
          color: #4A2E1A;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 3px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .fh-btn-link:hover {
          border-color: #D4820A;
          color: #D4820A;
          background: rgba(212, 130, 10, 0.05);
        }

        .fh-btn-link svg {
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .fh-btn-link:hover svg {
          transform: translateX(3px);
        }
      `}</style>

      <Link to={to} className={`fh-btn-link ${className || ""}`}>
        {text}
        <ChevronRight size={13} />
      </Link>
    </>
  );
}