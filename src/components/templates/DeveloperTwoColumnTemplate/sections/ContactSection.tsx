"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { AboutSectionData } from "@/types/portfolio";
import { ContactForm } from "../components/ContactForm";
import { ContactInfo } from "../components/ContactInfo";
import { SectionHeading } from "../components/SectionHeading";

interface ContactSectionProps {
  aboutData: AboutSectionData;
}

export function ContactSection({ aboutData }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactItems = [];
  
  // Note: phone is not currently in AboutSectionData type, but may be added in the future
  // Using type assertion for now if needed, or remove this check if phone is not used
  const aboutDataWithPhone = aboutData as AboutSectionData & { phone?: string };
  if (aboutDataWithPhone.phone) {
    contactItems.push({
      icon: Phone,
      title: "Call Us On",
      value: aboutDataWithPhone.phone,
    });
  }
  
  if (aboutData.email) {
    contactItems.push({
      icon: Mail,
      title: "Email Us At",
      value: aboutData.email,
    });
  }
  
  if (aboutData.location) {
    contactItems.push({
      icon: MapPin,
      title: "Visit Office",
      value: aboutData.location,
    });
  }

  const hasContactInfo = contactItems.length > 0;
  const gridCols = hasContactInfo ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
  const formMaxWidth = hasContactInfo ? "" : "max-w-2xl mx-auto";

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // You can add form submission logic here
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />

        <div className={`grid ${gridCols} gap-12 md:gap-16`}>
          {hasContactInfo && <ContactInfo items={contactItems} />}

          <div className={`space-y-6 ${formMaxWidth}`}>
            <ContactForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
