import { useDeferredValue, useState, useEffect } from "react";
import { getTimelineItems } from "../utils/storage";
import type { TimelineRow } from "../types";
import { StateEmpty } from "./shared";
import { formatRelative } from "../utils/format";
import { Search, History, Zap, CheckCircle, DollarSign, Calendar, FileText, Heart, Circle } from "lucide-react";
import { EntryModal } from "../components/entry-modal";

type Props = { refreshToken: number };

const TYPE_OPTIONS = ["all", "qibits", "actions", "transactions", "events", "daily_summaries", "care"];

export function TimelinePage({ refreshToken }: Props) {
  const [data, setData] = useState<TimelineRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<TimelineRow | null>(null);

  useEffect(() => {
    setData(getTimelineItems());
    setLoading(false);
  }, [refreshToken]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const deferred = useDeferredValue(search);

  const needle = deferred.trim().toLowerCase();
  const visible = data
    .filter((r) => typeFilter === "all" || r.record_type === typeFilter)
    .filter((r) =>
      !needle ||
      r.title.toLowerCase().includes(needle) ||
      r.bucket_code.includes(needle)
    );

  const renderIcon = (type: string) => {
    switch (type) {
      case "qibits": return <Zap size={18} />;
      case "actions": return <CheckCircle size={18} />;
      case "transactions": return <DollarSign size={18} />;
      case "events": return <Calendar size={18} />;
      case "daily_summaries": return <FileText size={18} />;
      case "care": return <Heart size={18} />;
      default: return <Circle size={18} />;
    }
  };

  return (
    <div className="page-stack">
      <section className="hero-panel compact-hero">
        <div className="section-tag">Timeline</div>
        <h2>Chronological truth across the whole desk.</h2>
        <p>QiBits, actions, transactions, events, and daily summaries projected in one unified feed.</p>
      </section>

      <div className="card">
        <div className="filter-bar" style={{ marginBottom: 16 }}>
          <div className="search-wrap" style={{ position: "relative" }}>
            <Search className="search-icon" size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-500)" }} />
            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or bucket…"
              style={{ paddingLeft: 36 }}
            />
          </div>
          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All types" : t.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="p-4 text-center">Loading...</div>}
        {!loading && visible.length === 0 && (
          <StateEmpty icon={<History size={24} />} text="No timeline entries match your filter." />
        )}

        {visible.map((row) => (
          <div 
            key={`${row.record_type}-${row.id}`} 
            className="timeline-entry" 
            style={{ cursor: "pointer" }} 
            onClick={() => setSelectedEntry(row)}
          >
            <div className={`timeline-icon timeline-icon-${row.record_type}`}>
              {renderIcon(row.record_type)}
            </div>
            <div className="timeline-body">
              <div className="item-title">{row.title}</div>
              <div className="item-meta">
                <span className="badge badge-type">{row.record_type.replace("_", " ")}</span>
                <span className="badge badge-bucket">Bucket {row.bucket_code}</span>
              </div>
            </div>
            <div className="timeline-time">{formatRelative(row.timestamp)}</div>
          </div>
        ))}

        {!loading && (
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-300)", textAlign: "right" }}>
            {visible.length} of {data.length} entries
          </div>
        )}
      </div>

      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onSaved={() => {
            setSelectedEntry(null);
            setData(getTimelineItems()); // Refresh local data
          }}
        />
      )}
    </div>
  );
}
