"use client";

import React, { useEffect, useRef, useState } from "react";
import numeral from "numeral";

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

const NumberDynamic = ({ prefix = "", suffix = "", value, duration = 500 }: Props) => {
  const [newValue, setNewValue] = useState(0);

  const newValueFormatted = newValue < 1000 ? newValue : numeral(newValue).format("0,0");

  const currentValue = useRef(0);

  useEffect(() => {
    const from = currentValue.current;
    if (from === value) return;
    if (duration <= 0) {
      currentValue.current = value;
      setNewValue(value);
      return;
    }

    let frameId: number;
    const startedAt = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const nextValue = progress === 1 ? value : Math.round(from + (value - from) * progress);
      currentValue.current = nextValue;
      setNewValue(nextValue);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return (
    <div>
      {prefix}
      {newValueFormatted}
      {suffix}
    </div>
  );
};

export default NumberDynamic;
