import type { CVSSMetrics } from "@/types";

export const getSeverityFromDatabaseSpecific = (
  databaseSpecific?: Record<string, unknown>
): string | undefined => {
  if (!databaseSpecific) return undefined;
  const severity = databaseSpecific.severity;
  if (typeof severity === "string") {
    return severity;
  }
  return undefined;
};

export const getSeverityColorFromString = (severity?: string) => {
  if (!severity) return "bg-gray-500";

  const severityLower = severity.toLowerCase();
  if (severityLower === "critical") return "bg-red-600";
  if (severityLower === "high") return "bg-orange-600";
  if (severityLower === "moderate") return "bg-yellow-500";
  if (severityLower === "low") return "bg-blue-500";

  return "bg-gray-500";
};

export const getSeverityColor = (
  severity?: { type?: string; score?: string }[]
) => {
  if (!severity || !severity?.length) return "bg-gray-500";

  const firstSeverity = severity[0];
  const score = firstSeverity?.score;

  if (score) {
    const cvssScore = getCVSSScore(score);
    if (cvssScore !== null) {
      if (cvssScore >= 9.0) return "bg-red-600";
      if (cvssScore >= 7.0) return "bg-orange-600";
      if (cvssScore >= 4.0) return "bg-yellow-500";
      return "bg-blue-500";
    }
  }

  const type = firstSeverity?.type?.toLowerCase();
  if (type?.includes("critical") || type?.includes("high")) return "bg-red-600";
  if (type?.includes("medium")) return "bg-yellow-500";
  if (type?.includes("low")) return "bg-blue-500";

  return "bg-gray-500";
};

export const getSeverityLabel = (
  severity?: { type?: string; score?: string }[],
  databaseSeverity?: string
) => {
  if (databaseSeverity) {
    return databaseSeverity.charAt(0).toUpperCase() + databaseSeverity.slice(1);
  }

  if (!severity || !severity?.length) return "Unknown";

  const firstSeverity = severity[0];
  if (firstSeverity?.score) {
    const cvssScore = getCVSSScore(firstSeverity.score);
    if (cvssScore !== null) {
      return `CVSS ${cvssScore.toFixed(1)} (${getCVSSSeverityLabel(cvssScore)})`;
    }
    return `CVSS ${firstSeverity.score}`;
  }
  return firstSeverity?.type || "Unknown";
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const formatVersionRange = (range?: {
  events?: Array<{
    introduced?: string;
    fixed?: string;
    last_affected?: string;
  }>;
}) => {
  if (!range?.events || !range?.events?.length) return "N/A";

  const events = range.events;
  const introduced = events.find((e) => e.introduced)?.introduced;
  const fixed = events.find((e) => e.fixed)?.fixed;
  const lastAffected = events.find((e) => e.last_affected)?.last_affected;

  if (introduced && fixed) {
    return `${introduced} - ${fixed}`;
  }
  if (introduced && lastAffected) {
    return `${introduced} - ${lastAffected} (last affected)`;
  }
  if (introduced) {
    return `${introduced}+`;
  }
  if (fixed) {
    return `Fixed in ${fixed}`;
  }

  return "N/A";
};

export const parseCVSSVector = (vectorString?: string): CVSSMetrics | null => {
  if (!vectorString) return null;

  const metrics: CVSSMetrics = {};
  const parts = vectorString.split("/");

  parts.forEach((part) => {
    if (part.startsWith("CVSS:")) {
      metrics.version = part.replace("CVSS:", "");
    } else {
      const [key, value] = part.split(":");
      if (key && value) {
        metrics[key as keyof CVSSMetrics] = value;
      }
    }
  });

  return metrics;
};

export const calculateCVSSBaseScore = (metrics: CVSSMetrics): number => {
  const valueMap: Record<string, Record<string, number>> = {
    AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
    AC: { L: 0.77, H: 0.44 },
    PR: { N: 0.85, L: 0.62, H: 0.27 },
    UI: { N: 0.85, R: 0.62 },
    S: { U: 0, C: 1 },
    C: { N: 0, L: 0.22, H: 0.56 },
    I: { N: 0, L: 0.22, H: 0.56 },
    A: { N: 0, L: 0.22, H: 0.56 },
  };

  const getValue = (
    key: string,
    metricValue?: string,
    defaultValue: number = 0
  ): number => {
    if (!metricValue) return defaultValue;
    const map = valueMap[key];
    if (!map) return defaultValue;
    return map[metricValue] ?? defaultValue;
  };

  const AV: number = getValue("AV", metrics.AV, 0.85);
  const AC: number = getValue("AC", metrics.AC, 0.77);
  const PR: number = getValue("PR", metrics.PR, 0.85);
  const UI: number = getValue("UI", metrics.UI, 0.85);
  const S: number = getValue("S", metrics.S, 0);
  const C: number = getValue("C", metrics.C, 0);
  const I: number = getValue("I", metrics.I, 0);
  const A: number = getValue("A", metrics.A, 0);

  const ISCBase = 1 - (1 - C) * (1 - I) * (1 - A);
  const ISC = S === 1 ? Math.min(0.915, ISCBase) : ISCBase;

  let Impact: number;
  if (S === 1) {
    Impact = 7.52 * (ISC - 0.029) - 3.25 * (ISC - 0.02) ** 15;
  } else {
    Impact = 6.42 * ISC;
  }

  if (Impact <= 0) {
    return 0;
  }

  const Exploitability = 8.22 * AV * AC * PR * UI;
  const BaseScore = Math.min(Impact + Exploitability, 10);

  return Math.ceil(BaseScore * 10) / 10;
};

export const getCVSSScore = (scoreString?: string): number | null => {
  if (!scoreString) return null;

  if (scoreString.startsWith("CVSS:")) {
    const metrics = parseCVSSVector(scoreString);
    if (metrics) {
      return calculateCVSSBaseScore(metrics);
    }
  }

  const numScore = parseFloat(scoreString);
  if (!Number.isNaN(numScore)) {
    return numScore;
  }

  return null;
};

export const getCVSSSeverityLabel = (score: number): string => {
  if (score >= 9.0) return "Critical";
  if (score >= 7.0) return "High";
  if (score >= 4.0) return "Moderate";
  if (score > 0) return "Low";
  return "None";
};

export const formatCVSSVector = (vectorString?: string): string => {
  if (!vectorString) return "";
  if (!vectorString.startsWith("CVSS:")) return vectorString;

  const metrics = parseCVSSVector(vectorString);
  if (!metrics) return vectorString;

  const parts: string[] = [];
  if (metrics.version) {
    parts.push(`CVSS:${metrics.version}`);
  }
  if (metrics.AV) parts.push(`AV:${metrics.AV}`);
  if (metrics.AC) parts.push(`AC:${metrics.AC}`);
  if (metrics.PR) parts.push(`PR:${metrics.PR}`);
  if (metrics.UI) parts.push(`UI:${metrics.UI}`);
  if (metrics.S) parts.push(`S:${metrics.S}`);
  if (metrics.C) parts.push(`C:${metrics.C}`);
  if (metrics.I) parts.push(`I:${metrics.I}`);
  if (metrics.A) parts.push(`A:${metrics.A}`);

  return parts.join("/");
};
