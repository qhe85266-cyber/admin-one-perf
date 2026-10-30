"use client";

import { mdiChartPie, mdiReload } from "@mdi/js";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "../../../_components/Button";
import CardBox from "../../../_components/CardBox";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import { sampleChartData } from "./config";

function ChartPlaceholder() {
  return (
    <div
      className="h-96 animate-pulse rounded bg-gray-100 dark:bg-slate-800"
      role="status"
      aria-label="Loading chart"
    />
  );
}

const ChartLineSample = dynamic(() => import("."), {
  ssr: false,
  loading: ChartPlaceholder,
});

export default function ChartLineSampleComponentBlock() {
  const [chartData, setChartData] = useState(sampleChartData);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();

    setChartData(sampleChartData());
  };

  return (
    <>
      <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
        <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
      </SectionTitleLineWithButton>

      <div ref={sectionRef}>
        <CardBox className="mb-6">
          <div className="h-96">
            {visible ? <ChartLineSample data={chartData} /> : <ChartPlaceholder />}
          </div>
        </CardBox>
      </div>
    </>
  );
}
