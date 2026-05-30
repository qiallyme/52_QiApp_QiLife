import { useEffect, useState } from "react";
import type { TimelineRow } from "../types";
import { StateEmpty } from "./shared";
import { formatRelative } from "../utils/format";
import { getTimelineItems } from "../utils/storage";
import { CheckCircle, History, Zap, FileText, DollarSign, Calendar, Heart, Circle } from "lucide-react";

type Props = { refreshToken: number };

export function TodayPage({ refreshToken }: Props) {
  const [timelineData, setTimelineData] = useState<TimelineRow[]>([]);

  useEffect(() => {
    setTimelineData(getTimelineItems());
  }, [refreshToken]);

  const today = new Date().toDateString();
  const recentTimeline = timelineData.slice(0, 6);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="section-tag">Today · {today}</div>
        <h2>Run life from the spine.</h2>
        <p>
          Scheduled work, open loops, and the live timeline signal in one
          command view. Capture anything to get started.
        </p>
      </section>

      <div className="two-col">
        {/* Due & Scheduled (Mock Empty) */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Due &amp; Scheduled</span>
            <span className="card-count">0</span>
          </div>
          <StateEmpty icon={<CheckCircle size={24} />} text="No scheduled actions yet." />
        </div>

        {/* Recent QiBits (Mock Empty) */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent QiBits</span>
            <span className="card-count">0</span>
          </div>
          <StateEmpty icon={<Zap size={24} />} text="No QiBits captured yet. Use the Capture page." />
        </div>
      </div>

      {/* Timeline Snapshot */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Timeline Snapshot</span>
          <span className="card-count">{timelineData.length} entries</span>
        </div>
        {recentTimeline.length === 0 ? (
          <StateEmpty icon={<History size={24} />} text="Timeline is empty. Start capturing." />
        ) : (
          recentTimeline.map((row) => (
            <TimelineEntry key={`${row.record_type}-${row.id}`} row={row} />
          ))
        )}
      </div>
    </div>
  );
}

function TimelineEntry({ row }: { row: TimelineRow }) {
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
    <div className="timeline-entry">
      <div className={`timeline-icon timeline-icon-${row.record_type}`}>
        {renderIcon(row.record_type)}
      </div>
      <div className="timeline-body">
        <div className="item-title">{row.title}</div>
        <div className="item-meta">
          <span className="badge badge-type">{row.record_type.replace("_", " ")}</span>
          <span className="badge badge-bucket">B{row.bucket_code}</span>
        </div>
      </div>
      <div className="timeline-time">{formatRelative(row.timestamp)}</div>
    </div>
  );
}
