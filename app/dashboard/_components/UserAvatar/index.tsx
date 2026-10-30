import React, { ReactNode } from "react";

type Props = {
  username: string;
  className?: string;
  children?: ReactNode;
};

export default function UserAvatar({ username, className = "", children }: Props) {
  const initials =
    username
      .trim()
      .split(/[\s._-]+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className={className}>
      <span
        role="img"
        aria-label={username}
        className="flex aspect-square w-full items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-800 dark:bg-slate-700 dark:text-blue-100"
      >
        {initials}
      </span>
      {children}
    </div>
  );
}
