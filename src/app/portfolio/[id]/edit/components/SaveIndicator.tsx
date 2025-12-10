"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SaveStatus } from "@/hooks/usePortfolioSync";

interface SaveIndicatorProps {
  status: SaveStatus;
}

export function SaveIndicator({ status }: SaveIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "saving":
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: "Saving...",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        };
      case "saved":
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          text: "All changes saved",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: "Error saving",
          color: "text-red-600",
          bgColor: "bg-red-50",
        };
      default:
        return {
          icon: null,
          text: "Ready",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${config.bgColor} ${config.color}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </motion.div>
  );
}

