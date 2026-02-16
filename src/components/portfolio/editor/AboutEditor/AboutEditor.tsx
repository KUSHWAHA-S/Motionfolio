"use client";

import { useTranslation } from "react-i18next";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Link as LinkIcon } from "lucide-react";
import { AboutSectionData } from "@/types/portfolio";

export function AboutEditor() {
  const { t } = useTranslation();
  const { sections, updateSection, addSection } = usePortfolioStore();

  const aboutSection = sections.find((s) => s.type === "about");
  const aboutData: AboutSectionData = (aboutSection?.data as AboutSectionData) || {
    bio: "",
    email: "",
    location: "",
    website: "",
  };

  const updateAboutData = (updates: any) => {
    if (aboutSection) {
      updateSection(aboutSection.id, { data: { ...aboutData, ...updates } });
    } else {
      addSection({
        id: `about-${Date.now()}`,
        type: "about",
        data: { ...aboutData, ...updates },
        animation: {},
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
        >
          <User className="w-5 h-5" style={{ color: "#40E0D0" }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
            {t("about.title")}
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            {t("about.subtitle")}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("about.bio")}
          </label>
          <Textarea
            value={aboutData.bio || ""}
            onChange={(e) => updateAboutData({ bio: e.target.value })}
            placeholder={t("about.bioPlaceholder")}
            rows={6}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("about.characters", { count: (aboutData.bio || "").length })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t("about.email")}
            </label>
            <Input
              type="email"
              value={aboutData.email || ""}
              onChange={(e) => updateAboutData({ email: e.target.value })}
              placeholder={t("about.emailPlaceholder")}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t("about.location")}
            </label>
            <Input
              value={aboutData.location || ""}
              onChange={(e) => updateAboutData({ location: e.target.value })}
              placeholder={t("about.locationPlaceholder")}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            {t("about.website")}
          </label>
          <Input
            type="url"
            value={aboutData.website || ""}
            onChange={(e) => updateAboutData({ website: e.target.value })}
            placeholder={t("about.websitePlaceholder")}
            className="w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
