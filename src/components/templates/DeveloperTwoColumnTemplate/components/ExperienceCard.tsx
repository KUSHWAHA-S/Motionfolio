"use client";

import { ExperienceCardProps } from "../types";

export function ExperienceCard({
  period,
  title,
  company,
  description,
}: ExperienceCardProps) {
  return (
    <div className="border border-gray-200 rounded-md px-6 py-5 bg-white shadow-sm">
      {period && (
        <p className="text-xs font-semibold text-gray-600 mb-1">{period}</p>
      )}
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        {title || "Role / Degree"}
      </h3>
      {company && (
        <p className="text-xs font-medium text-gray-800 mb-1">{company}</p>
      )}
      {description && (
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
