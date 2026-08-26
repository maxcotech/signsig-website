"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const PERIODS = ["Monthly", "Annual"] as const;
export type PricingPeriod = (typeof PERIODS)[number];

/**
 * The Monthly/Annual segmented control.
 *
 * The design has no annual pricing figures anywhere — only the monthly card
 * prices are shown — so this toggle changes its own selected state (real
 * keyboard-navigable tab behaviour) but does not change the displayed
 * prices. See docs/DECISIONS.md.
 */
export function PricingPeriodToggle({
  onChange,
}: {
  onChange?: (period: PricingPeriod) => void;
}) {
  const [period, setPeriod] = useState<PricingPeriod>("Monthly");

  return (
    <div
      role="tablist"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-pill border border-border bg-card p-1"
    >
      {PERIODS.map((option) => {
        const isSelected = option === period;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => {
              setPeriod(option);
              onChange?.(option);
            }}
            className={cn(
              "min-h-11 rounded-pill px-4 text-body-sm font-medium transition-colors duration-fast",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
