"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, X } from "lucide-react";

export function SkillsEditor() {
  const { sections, updateSection, addSection } = usePortfolioStore();
  const [newSkill, setNewSkill] = useState("");

  const skillsSection = sections.find((s) => s.type === "skills");
  const skills: string[] = Array.isArray(skillsSection?.data?.skills)
    ? skillsSection.data.skills
    : [];

  const updateSkills = (newSkills: string[]) => {
    if (skillsSection) {
      updateSection(skillsSection.id, {
        data: { skills: newSkills },
      });
    } else {
      addSection({
        id: `skills-${Date.now()}`,
        type: "skills",
        data: { skills: newSkills },
        animation: {},
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(skills.filter((s: string) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-yellow-100 rounded-lg'>
          <Star className='w-5 h-5 text-yellow-600' />
        </div>
        <div>
          <h2 className='text-xl font-semibold text-gray-900'>Skills</h2>
          <p className='text-sm text-gray-500'>Showcase your expertise</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='space-y-4'
      >
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Add Skill
          </label>
          <div className='flex gap-2'>
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='e.g., React, TypeScript, Node.js'
              className='flex-1'
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSkill}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Add
            </motion.button>
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Your Skills ({skills.length})
          </label>
          {skills.length === 0 ? (
            <div className='text-center py-12 border-2 border-dashed border-gray-300 rounded-lg'>
              <Star className='w-12 h-12 text-gray-400 mx-auto mb-3' />
              <p className='text-gray-500'>No skills added yet</p>
            </div>
          ) : (
            <div className='flex flex-wrap gap-2'>
              <AnimatePresence>
                {skills.map((skill: string, index: number) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.02 }}
                    className='group relative inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium'
                  >
                    <span>{skill}</span>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSkill(skill)}
                      className='opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-blue-200 rounded-full'
                    >
                      <X className='w-3 h-3' />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
