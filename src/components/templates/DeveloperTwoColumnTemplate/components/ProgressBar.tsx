"use client";

import { ProgressBarProps } from "../types";

interface ProgressBarComponentProps extends ProgressBarProps {
  progressBarRef: (el: HTMLDivElement | null) => void;
}

export function ProgressBar({
  skill,
  percentage,
  progressBarRef,
}: ProgressBarComponentProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-800 capitalize">
          {skill}
        </span>
        <span className="text-sm text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gray-800 rounded-full"
          style={{ width: "0%" }}
          data-percentage={percentage}
        />
      </div>
    </div>
  );
}
