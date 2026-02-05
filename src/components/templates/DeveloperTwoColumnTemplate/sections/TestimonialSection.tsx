"use client";

import { Carousel } from "@/components/ui/carousel";
import { User } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  avatar?: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

// Default testimonials if none provided
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Kirk McFall",
    company: "Google",
    quote:
      "The most well-known dummy text is the 'Lorem Ipsum', which is said originated the 16th century. This ancient dummy text is also incomprehensible, of most European in Latin script.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Microsoft",
    quote:
      "Working with this team has been an incredible experience. Their attention to detail and creative approach exceeded all our expectations.",
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "Apple",
    quote:
      "The quality of work and professionalism shown throughout the project was outstanding. Highly recommend their services.",
  },
];

export function TestimonialSection({
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialSectionProps) {
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section
      id="testimonials"
      className="relative py-12 md:py-20 px-4 md:px-8 overflow-hidden min-h-[600px] md:min-h-[700px]"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          Our Client
        </h2>

        {/* Separator with star */}
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="h-px w-12 sm:w-16 md:w-24 bg-white"></div>
          <span className="mx-2 sm:mx-4 text-xl sm:text-2xl">*</span>
          <div className="h-px w-12 sm:w-16 md:w-24 bg-white"></div>
        </div>

        {/* Introductory Text */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>

        {/* Testimonials Carousel */}
        <Carousel
          autoPlay={true}
          autoPlayInterval={6000}
          showIndicators={true}
          showArrows={true}
          className="mt-4 md:mt-8 w-full"
        >
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full px-2 sm:px-4 md:px-8 py-4 md:py-8 flex flex-col items-center box-border"
            >
              {/* User Icon/Avatar */}
              <div className="mb-4 md:mb-6">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/50"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                )}
              </div>

              {/* Client Name */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2 px-2">
                {testimonial.name}
              </h3>

              {/* Company */}
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-4 md:mb-6 px-2">
                {testimonial.company}
              </p>

              {/* Testimonial Quote */}
              <blockquote className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto italic px-4 sm:px-6 md:px-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
