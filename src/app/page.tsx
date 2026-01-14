"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  LayoutTemplate,
  Zap,
  Globe,
  Code,
  ArrowRight,
  CheckCircle,
  Users,
  Rocket,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Multiple Templates",
      description:
        "Choose from beautiful, professionally designed templates that showcase your work perfectly.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Themes",
      description:
        "Personalize your portfolio with custom colors and themes that match your brand.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Editing",
      description:
        "See your changes instantly with our live preview editor. No coding required.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Publish Instantly",
      description:
        "Share your portfolio with a custom URL. Go live in seconds, not hours.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "GSAP Animations",
      description:
        "Stunning animations powered by GSAP that make your portfolio stand out.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Professional Showcase",
      description:
        "Showcase your projects, skills, and experience in a professional format.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in seconds with just your email.",
    },
    {
      number: "02",
      title: "Choose Template",
      description:
        "Select from our collection of beautiful portfolio templates.",
    },
    {
      number: "03",
      title: "Customize & Add Content",
      description: "Add your projects, skills, and customize your theme.",
    },
    {
      number: "04",
      title: "Publish & Share",
      description: "Publish your portfolio and share it with the world.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #40E0D0 0%, transparent 50%), radial-gradient(circle at 80% 80%, #20B2AA 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(64, 224, 208, 0.1)",
                color: "#40E0D0",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Create Stunning Portfolios
              </span>
            </motion.div>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0F172A",
                letterSpacing: "-0.03em",
              }}
            >
              Build Your Portfolio
              <br />
              <span style={{ color: "#40E0D0" }}>In Minutes, Not Hours</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
              style={{ color: "#64748B" }}
            >
              The modern portfolio builder for designers, developers, and
              creatives. No coding required. Just creativity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "#40E0D0",
                    color: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#20B2AA";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(64, 224, 208, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#40E0D0";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              Everything You Need to
              <br />
              <span style={{ color: "#40E0D0" }}>Showcase Your Work</span>
            </h2>
            <p className="text-lg" style={{ color: "#64748B" }}>
              Powerful features designed to make portfolio creation effortless
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white border transition-all duration-300"
                style={{
                  borderColor: "#E5E7EB",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#40E0D0";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(64, 224, 208, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "rgba(64, 224, 208, 0.1)",
                    color: "#40E0D0",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#0F172A",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#64748B" }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              Get Started in
              <span style={{ color: "#40E0D0" }}> 4 Simple Steps</span>
            </h2>
            <p className="text-lg" style={{ color: "#64748B" }}>
              From signup to published portfolio in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-12 left-full w-full h-0.5"
                    style={{
                      backgroundColor: "#E5E7EB",
                      transform: "translateX(-50%)",
                      width: "calc(100% - 4rem)",
                    }}
                  />
                )}
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold"
                    style={{
                      backgroundColor: "#40E0D0",
                      color: "#FFFFFF",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#0F172A",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "#64748B" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              Beautiful Templates
              <br />
              <span style={{ color: "#40E0D0" }}>For Every Creative</span>
            </h2>
            <p className="text-lg" style={{ color: "#64748B" }}>
              Choose from our collection of professionally designed templates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Modern Creative",
                description:
                  "Bold hero sections with animated cards. Perfect for designers & developers.",
                gradient: "linear-gradient(135deg, #40E0D0 0%, #20B2AA 100%)",
              },
              {
                name: "Minimal Showcase",
                description:
                  "Clean, typography-focused layout. Great for simple portfolios.",
                gradient: "linear-gradient(135deg, #48D1CC 0%, #40E0D0 100%)",
              },
              {
                name: "Developer Two-Column",
                description:
                  "Dark, professional layout with sidebar navigation and focused content.",
                gradient: "linear-gradient(135deg, #20B2AA 0%, #008B8B 100%)",
              },
            ].map((template, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden border transition-all duration-300 bg-white"
                style={{ borderColor: "#E5E7EB" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(64, 224, 208, 0.2)";
                  e.currentTarget.style.borderColor = "#40E0D0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{ background: template.gradient }}
                >
                  <LayoutTemplate className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#0F172A",
                    }}
                  >
                    {template.name}
                  </h3>
                  <p style={{ color: "#64748B" }}>{template.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #40E0D0 0%, #20B2AA 100%)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-64 h-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                  transform: "translate(50%, 50%)",
                }}
              />
            </div>
            <div className="relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Ready to Build Your Portfolio?
              </h2>
              <p className="text-xl mb-8 text-white opacity-90">
                Join thousands of creatives showcasing their work with
                Motionfolio
              </p>
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#40E0D0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
