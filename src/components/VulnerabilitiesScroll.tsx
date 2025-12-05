"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export const VulnerabilitiesScroll = () => {
  const searchParams = useSearchParams();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const ecosystem = searchParams.get("ecosystem");
    const packageName = searchParams.get("package");
    const version = searchParams.get("version");

    if (ecosystem && packageName && version) {
      hasScrolledRef.current = false;

      const scrollToResults = () => {
        const targetElement = document.getElementById(
          "vulnerabilities-results-content"
        );

        if (targetElement && !hasScrolledRef.current) {
          hasScrolledRef.current = true;
          const yOffset = -120;
          const y =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };

      const checkForContent = () => {
        const targetElement = document.getElementById(
          "vulnerabilities-results-content"
        );

        if (targetElement) {
          scrollToResults();
        } else {
          setTimeout(checkForContent, 150);
        }
      };

      setTimeout(checkForContent, 200);
    } else {
      hasScrolledRef.current = false;
    }
  }, [searchParams]);

  return null;
};
