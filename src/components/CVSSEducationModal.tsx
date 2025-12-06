"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiInformationCircle, HiXMark } from "react-icons/hi2";

export const CVSSEducationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="p-1.5 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
        aria-label="Learn how CVSS score is calculated"
        title="How is the CVSS Score Calculated?"
      >
        <HiInformationCircle className="w-5 h-5" />
      </button>

      {isOpen &&
        mounted &&
        createPortal(
          <div className="fixed top-0 left-0 right-0 bottom-0 z-99 flex items-center justify-center p-4">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 dark:bg-black/70"
              onClick={closeModal}
              aria-hidden="true"
            />
            <div
              className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cvss-education-title"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <HiInformationCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h2
                    id="cvss-education-title"
                    className="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    How is the CVSS Score Calculated?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <HiXMark className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="overflow-y-auto p-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  The CVSS (Common Vulnerability Scoring System) base score is
                  calculated from the vector string using a mathematical
                  formula. Here's how it works:
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step 1: Parse Vector Metrics
                    </h4>
                    <p className="mb-2">
                      The vector string contains metrics that describe the
                      vulnerability:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>
                        <strong>AV</strong> (Attack Vector): Network (N),
                        Adjacent (A), Local (L), Physical (P)
                      </li>
                      <li>
                        <strong>AC</strong> (Attack Complexity): Low (L), High
                        (H)
                      </li>
                      <li>
                        <strong>PR</strong> (Privileges Required): None (N), Low
                        (L), High (H)
                      </li>
                      <li>
                        <strong>UI</strong> (User Interaction): None (N),
                        Required (R)
                      </li>
                      <li>
                        <strong>S</strong> (Scope): Unchanged (U), Changed (C)
                      </li>
                      <li>
                        <strong>C/I/A</strong>{" "}
                        (Confidentiality/Integrity/Availability Impact): None
                        (N), Low (L), High (H)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step 2: Calculate Impact Sub-Score (ISC)
                    </h4>
                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-900/50 rounded p-2">
                      ISC = 1 - [(1 - C) × (1 - I) × (1 - A)]
                    </p>
                    <p className="mt-1 text-xs">
                      Where C, I, and A are the impact values (0, 0.22, or 0.56)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step 3: Calculate Impact
                    </h4>
                    <p className="mb-2 text-xs">If Scope is Changed (S = 1):</p>
                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-900/50 rounded p-2 mb-2">
                      Impact = 7.52 × (ISC - 0.029) - 3.25 × (ISC - 0.02)¹⁵
                    </p>
                    <p className="mb-2 text-xs">
                      If Scope is Unchanged (S = 0):
                    </p>
                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-900/50 rounded p-2">
                      Impact = 6.42 × ISC
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step 4: Calculate Exploitability
                    </h4>
                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-900/50 rounded p-2">
                      Exploitability = 8.22 × AV × AC × PR × UI
                    </p>
                    <p className="mt-1 text-xs">
                      Where AV, AC, PR, and UI are numeric values based on the
                      metric choices
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step 5: Calculate Base Score
                    </h4>
                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-900/50 rounded p-2">
                      Base Score = Round up to 1 decimal of Minimum[(Impact +
                      Exploitability), 10]
                    </p>
                    <p className="mt-2 text-xs">
                      If Impact ≤ 0, the Base Score is 0.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold mb-2">
                      Severity Ratings:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>
                        <strong>Critical:</strong> 9.0 - 10.0
                      </li>
                      <li>
                        <strong>High:</strong> 7.0 - 8.9
                      </li>
                      <li>
                        <strong>Moderate:</strong> 4.0 - 6.9
                      </li>
                      <li>
                        <strong>Low:</strong> 0.1 - 3.9
                      </li>
                      <li>
                        <strong>None:</strong> 0.0
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
