"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { colors } from "@/lib/colors";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setOpen(false);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: "rgba(241, 245, 249, 0.6)",
            color: "#0F172A",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(241, 245, 249, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(241, 245, 249, 0.6)";
          }}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-semibold hidden sm:inline">
             {currentLanguage.name}
          </span>
          <span className="text-sm font-semibold sm:hidden">
            {currentLanguage.flag}
          </span>
        </motion.button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              asChild
              sideOffset={5}
              align="end"
              className="min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-200 p-1 z-50"
              style={{
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map((lang) => (
                  <DropdownMenu.Item
                    key={lang.code}
                    asChild
                    className="outline-none"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                        i18n.language === lang.code
                          ? "text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor:
                          i18n.language === lang.code
                            ? colors.primary
                            : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (i18n.language !== lang.code) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(241, 245, 249, 0.8)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (i18n.language !== lang.code) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="flex-1 text-left">{lang.name}</span>
                      {i18n.language === lang.code && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  </DropdownMenu.Item>
                ))}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
