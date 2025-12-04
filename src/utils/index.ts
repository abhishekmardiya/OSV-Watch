export const getSeverityColor = (
  severity?: { type?: string; score?: string }[]
) => {
  if (!severity || severity.length === 0) return "bg-gray-500";

  const firstSeverity = severity[0];
  const score = firstSeverity?.score;

  if (score) {
    const numScore = parseFloat(score);
    if (numScore >= 9.0) return "bg-red-600";
    if (numScore >= 7.0) return "bg-orange-600";
    if (numScore >= 4.0) return "bg-yellow-500";
    return "bg-blue-500";
  }

  const type = firstSeverity?.type?.toLowerCase();
  if (type?.includes("critical") || type?.includes("high")) return "bg-red-600";
  if (type?.includes("medium")) return "bg-yellow-500";
  if (type?.includes("low")) return "bg-blue-500";

  return "bg-gray-500";
};

export const getSeverityLabel = (
  severity?: { type?: string; score?: string }[]
) => {
  if (!severity || severity.length === 0) return "Unknown";

  const firstSeverity = severity[0];
  if (firstSeverity?.score) {
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
  if (!range?.events || range.events.length === 0) return "N/A";

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
