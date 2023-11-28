import React from "react";
import type { Props } from "./types";

export const ChevronUp: React.FC<Props> = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      stroke="currentColor"
    >
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
