import type {
  OSVQueryPayload,
  OSVQueryResponse,
  OSVVulnerability,
} from "@/types";

const OSV_API_URL = "https://api.osv.dev/v1";

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

    const res = await fetch(`${OSV_API_URL}/query`, {
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

export const getVulnerabilityById = async (
  vulnerabilityId: string
): Promise<{
  code: number;
  vulnerability: OSVVulnerability | null;
  message: string | null;
}> => {
  try {
    const res = await fetch(
      `${OSV_API_URL}/vulns/${encodeURIComponent(vulnerabilityId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return {
          code: 0,
          vulnerability: null,
          message: "Vulnerability not found",
        };
      }
      throw new Error(`API request failed: ${res.statusText}`);
    }

    const data: OSVVulnerability = await res.json();

    return {
      code: 1,
      vulnerability: data || null,
      message: null,
    };
  } catch (err) {
    return {
      code: 0,
      vulnerability: null,
      message:
        err instanceof Error ? err.message : "Failed to fetch vulnerability",
    };
  }
};
