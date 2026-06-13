import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";
import { track } from "./track";

function report(metric: Metric): void {
  track("web_vitals", {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
  });
}

export function initWebVitals(): void {
  onCLS(report);
  onINP(report);
  onLCP(report);
  onFCP(report);
  onTTFB(report);
}
