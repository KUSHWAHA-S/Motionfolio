/**
 * Centralized color constants for the application
 * Change colors here to update them everywhere
 */

// Primary brand colors
export const colors = {
  // Primary palette
  primary: "#40E0D0", // Turquoise
  primaryHover: "#20B2AA", // Darker turquoise for hover
  secondary: "#20B2AA", // Teal green
  secondaryHover: "#1A9B94", // Darker teal for hover

  // Background colors
  background: "#F9FAFB", // Light grey background
  backgroundCream: "#FFF7DD", // Cream background (alternative)
  card: "#FFFFFF", // White for cards
  cardHover: "#F9FAFB", // Light grey for card hover

  // Text colors
  text: "#1A1A1A", // Soft black
  textMuted: "#6B7280", // Muted grey text
  textLight: "#64748B", // Light grey text
  textDark: "#0F172A", // Dark text

  // Border and divider colors
  border: "#E5E7EB", // Light grey border
  borderLight: "#F3F4F6", // Very light border

  // Status colors
  success: "#20B2AA", // Teal for success
  warning: "#F59E0B", // Amber for warning
  error: "#EF4444", // Red for errors
  info: "#40E0D0", // Turquoise for info

  // RGBA variants for transparency
  primaryRgba: {
    "10": "rgba(64, 224, 208, 0.1)",
    "20": "rgba(64, 224, 208, 0.2)",
    "30": "rgba(64, 224, 208, 0.3)",
    "40": "rgba(64, 224, 208, 0.4)",
  },
  secondaryRgba: {
    "10": "rgba(32, 178, 170, 0.1)",
    "20": "rgba(32, 178, 170, 0.2)",
    "30": "rgba(32, 178, 170, 0.3)",
    "40": "rgba(32, 178, 170, 0.4)",
  },

  // Neutral colors
  grey: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

// Default theme for portfolios
export const defaultTheme = {
  primary: colors.primary,
  secondary: colors.secondary,
} as const;
