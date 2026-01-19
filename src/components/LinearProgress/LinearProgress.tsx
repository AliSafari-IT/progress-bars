import React, { forwardRef, useMemo } from "react";
import type { ProgressTone } from "../ProgressTrack";
import styles from "./LinearProgress.module.css";

export type LinearProgressSize = "sm" | "md" | "lg";
export type LinearProgressVariant = "determinate" | "indeterminate";

export interface LinearProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: LinearProgressVariant;
  size?: LinearProgressSize;
  tone?: ProgressTone;

  /**
   * Determinate only. Clamped to [min, max].
   */
  value?: number;

  /**
   * Determinate only.
   */
  min?: number;

  /**
   * Determinate only.
   */
  max?: number;

  /**
   * Show striped pattern on the progress bar.
   */
  striped?: boolean;

  /**
   * Animate the striped pattern (only if striped=true).
   */
  animated?: boolean;

  /**
   * Override track height in pixels.
   */
  thickness?: number;

  /**
   * Accessible name. Prefer ariaLabelledBy when a visible label exists.
   */
  ariaLabel?: string;

  /**
   * Accessible name via element id.
   */
  ariaLabelledBy?: string;

  /**
   * Indeterminate only. Defaults to "Loading".
   */
  ariaValueText?: string;
}

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(function LinearProgress(
  {
    variant = "determinate",
    size = "md",
    tone = "brand",
    value = 0,
    min = 0,
    max = 100,
    striped = false,
    animated = false,
    thickness,
    ariaLabel,
    ariaLabelledBy,
    ariaValueText,
    className,
    style,
    ...rest
  },
  ref
) {
  const isDeterminate = variant === "determinate";

  const computed = useMemo(() => {
    const safeMin = Number.isFinite(min) ? min : 0;
    const safeMax = Number.isFinite(max) ? max : safeMin + 100;
    const normalizedMax = safeMax <= safeMin ? safeMin + 100 : safeMax;

    const v = clamp(Number(value), safeMin, normalizedMax);
    const pct = ((v - safeMin) / (normalizedMax - safeMin)) * 100;

    return {
      min: safeMin,
      max: normalizedMax,
      value: v,
      percent: clamp(pct, 0, 100)
    };
  }, [value, min, max]);

  const rootClassName = [
    styles.root,
    styles[`size_${size}`],
    styles[tone],
    isDeterminate ? styles.variant_determinate : styles.variant_indeterminate,
    striped && styles.striped,
    animated && styles.animated,
    className
  ]
    .filter(Boolean)
    .join(" ");

  const barStyle: React.CSSProperties | undefined = isDeterminate
    ? { width: `${computed.percent}%` }
    : undefined;

  const rootStyle: React.CSSProperties = {
    ...style,
    ...(thickness ? { '--lp-track-height': `${thickness}px` } as any : {})
  };

  const ariaProps: Record<string, any> = {
    role: "progressbar"
  };

  if (isDeterminate) {
    ariaProps["aria-valuemin"] = computed.min;
    ariaProps["aria-valuemax"] = computed.max;
    ariaProps["aria-valuenow"] = computed.value;
  } else {
    ariaProps["aria-valuetext"] = ariaValueText ?? "Loading";
  }

  if (ariaLabelledBy) {
    ariaProps["aria-labelledby"] = ariaLabelledBy;
  } else if (ariaLabel) {
    ariaProps["aria-label"] = ariaLabel;
  } else {
    ariaProps["aria-label"] = "Progress";
  }

  return (
    <div ref={ref} className={rootClassName} style={rootStyle} {...(ariaProps as React.AriaAttributes)} {...rest}>
      <div className={styles.track} style={thickness ? { height: `${thickness}px` } : undefined} aria-hidden="true">
        <div className={styles.bar} style={barStyle} />
      </div>
    </div>
  );
});
