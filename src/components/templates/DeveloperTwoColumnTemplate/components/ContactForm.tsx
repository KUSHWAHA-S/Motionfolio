"use client";

import { ContactFormProps } from "../types";

export function ContactForm({
  formData,
  onFormDataChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            value={formData.name}
            onChange={(e) =>
              onFormDataChange({ ...formData, name: e.target.value })
            }
            placeholder="Your name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="contact-email"
            value={formData.email}
            onChange={(e) =>
              onFormDataChange({ ...formData, email: e.target.value })
            }
            placeholder="Your email..."
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900 bg-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          value={formData.subject}
          onChange={(e) =>
            onFormDataChange({ ...formData, subject: e.target.value })
          }
          placeholder="Your Subject.."
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900 bg-white"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) =>
            onFormDataChange({ ...formData, message: e.target.value })
          }
          placeholder="Your message..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900 bg-white resize-none"
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full md:w-auto px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 rounded-sm text-sm"
      >
        Send Message
      </button>
    </div>
  );
}
