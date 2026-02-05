"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <>
      <h2
        className={`text-4xl md:text-5xl font-bold text-center mb-4 text-black ${className}`}
      >
        {title}
      </h2>
      <div className="text-center mb-4">
        <span className="text-2xl text-black">*</span>
      </div>
      {subtitle && (
        <p className="text-center text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </>
  );
}
