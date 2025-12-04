export interface OSVSeverity {
  type?: string;
  score?: string;
}

export interface OSVReference {
  type?: string;
  url?: string;
}

export interface OSVEvent {
  introduced?: string;
  fixed?: string;
  last_affected?: string;
  limit?: string;
}

export interface OSVRange {
  type?: string;
  repo?: string;
  events?: OSVEvent[];
  database_specific?: Record<string, unknown>;
}

export interface OSVAffectedPackage {
  package?: {
    name?: string;
    ecosystem?: string;
    purl?: string;
  };
  severity?: OSVSeverity[];
  ranges?: OSVRange[];
  versions?: string[];
  ecosystem_specific?: Record<string, unknown>;
  database_specific?: Record<string, unknown>;
}

export interface OSVVulnerability {
  id?: string;
  summary?: string;
  details?: string;
  severity?: OSVSeverity[];
  affected?: OSVAffectedPackage[];
  references?: OSVReference[];
  aliases?: string[];
  modified?: string;
  published?: string;
  withdrawn?: string;
  database_specific?: Record<string, unknown>;
}

export interface OSVQueryResponse {
  vulns?: OSVVulnerability[];
}

export interface OSVQueryPayload {
  version?: string;
  package?: {
    name?: string;
    ecosystem?: string;
  };
}

export interface VulnerabilityCardProps {
  vulnerability: OSVVulnerability;
}

export interface VulnerabilitiesListProps {
  vulnerabilities?: OSVVulnerability[];
  isLoading?: boolean;
  error?: string | null;
}
