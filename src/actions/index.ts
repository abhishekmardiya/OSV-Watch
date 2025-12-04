import type { OSVQueryPayload, OSVQueryResponse } from "@/types";

export const getVulnerabilities = async (
  packageVersion: string,
  packageName: string,
  ecosystem: string
) => {
  try {
    const payload: OSVQueryPayload = {
      version: packageVersion,
      package: {
        name: packageName,
        ecosystem: ecosystem,
      },
    };

    const res = await fetch("https://api.osv.dev/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.statusText}`);
    }

    const data: OSVQueryResponse = await res.json();
    const finalData = data?.vulns;

    return {
      code: 1,
      vulnerabilities: finalData || [],
      message: finalData?.length
        ? null
        : "No vulnerabilities found for the given inputs.",
    };
  } catch (err) {
    return {
      code: 0,
      vulnerabilities: [],
      message:
        err instanceof Error ? err.message : "Failed to fetch vulnerabilities",
    };
  }
};
