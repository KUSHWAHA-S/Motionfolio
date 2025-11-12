"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingModal({
  open,
  message,
}: {
  open: boolean;
  message?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className='bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full'
          >
            <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4'></div>
            <p className='text-gray-800 font-medium'>
              {message || "Processing..."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
