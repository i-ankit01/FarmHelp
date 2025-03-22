import React from "react";
import { Link } from "react-router-dom";

export function ButtonLink({ text, to, className }) {
  return (
    <Link
      to={to}
      className={`inline-block text-center bg-black border text-white px-4 py-2 rounded-md transition ${className}`}
    >
      {text}
    </Link>
  );
}
