import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../../../shared/ui";
import { useSearch } from "../hooks/useSearch";
import * as styles from "./SearchModal.styles";
import { LayoutDashboard, Wallet, Receipt, BarChart3 } from "lucide-react";

interface Props {
  onClose: () => void;
}

const groupLabels: Record<string, string> = {
  page: "Pages",
  wallet: "Wallets",
  transaction: "Transactions",
};

const resultIcons: Record<string, any> = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  wallets: Wallet,
  transactions: Receipt,
};

export function SearchModal({ onClose }: Props) {
  const { query, setQuery, results } = useSearch();
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Autofocus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset active index on Query Change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
  if (activeIndex >= results.length) {
    setActiveIndex(0);
  }
}, [results, activeIndex]);

  // Keyboard handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length-1));
      }
      if (e.key === "Enter") {
        if (results[activeIndex]) {
          navigate(results[activeIndex].path);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [results, activeIndex, navigate, close, onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors =
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const focusableElements =
      modal.querySelectorAll<HTMLElement>(focusableSelectors);
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  
      useEffect(() => {
    const container = resultsContainerRef.current;
    const activeItem = itemRefs.current[activeIndex];

    if (!container || !activeItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    if (itemRect.top < containerRect.top) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else if (itemRect.bottom > containerRect.bottom) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex,results]);


  const groupedResults = results.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, typeof results>,
  );

  return (
    <div className={styles.overlay()}>
      <Card ref={modalRef} className={styles.modal()}>
        <CardHeader>
          <div className={styles.header()}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything"
              className={styles.input()}
            />
          </div>
        </CardHeader>

        <CardContent ref={resultsContainerRef} className={styles.results()}>
          {results.length === 0 && query && (
            <p className={styles.emptyState()}>No Results Found</p>
          )}
          {(() => {
            itemRefs.current = [];
            let globalIndex = -1;

            return Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <div className={styles.section()}>{groupLabels[type]}</div>

                {items.map((item) => {
                  globalIndex += 1;
                  const isActive = globalIndex === activeIndex;
                  const Icon = resultIcons[item.id];

                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        itemRefs.current[globalIndex] = el;
                      }}
                      onFocus={() => setActiveIndex(globalIndex)}
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                      className={styles.resultItem({ active: isActive })}
                    >
                      {Icon && (
                        <Icon size={16} className="mr-3 text-gray-500" />
                      )}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ));
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
