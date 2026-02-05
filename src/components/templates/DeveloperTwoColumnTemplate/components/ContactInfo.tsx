"use client";

import { ContactInfoProps } from "../types";

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <div className="space-y-10">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="flex flex-col items-start">
            <div className="mb-4">
              <IconComponent className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
