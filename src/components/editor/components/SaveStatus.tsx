// src/components/editor/SaveStatus.tsx
"use client";

import { SaveStatus as StatusType } from "@/hooks/usePortfolioSync";

interface Props {
  status: StatusType;
}

export const SaveStatus = ({ status }: Props) => {
  if (status === "saving")
    return <span className='text-sm text-yellow-500'>Saving...</span>;
  if (status === "saved")
    return <span className='text-sm text-green-500'>Saved ✓</span>;
  if (status === "error")
    return <span className='text-sm text-red-500'>Save failed</span>;
  return null;
};
