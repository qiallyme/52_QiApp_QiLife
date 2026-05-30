import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPendingDraft, clearPendingDraft, addTimelineItem } from "../utils/storage";
import { Draft, TimelineRow } from "../types";
import { StateEmpty } from "./shared";
import { CheckSquare } from "lucide-react";

export function ReviewPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("");
  const [bucket, setBucket] = useState("inbox");

  useEffect(() => {
    const d = getPendingDraft();
    if (!d) return;
    
    setDraft(d);
    setTitle(d.title);
    setType(d.suggestedType);
    setSummary(d.summary);
    setTags(d.suggestedTags.join(", "));
    setPriority(d.suggestedPriority);
  }, []);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!draft) return;

    const timelineItem: TimelineRow = {
      id: draft.id,
      record_type: type,
      title: title,
      timestamp: new Date().toISOString(),
      bucket_code: bucket,
      payload: {
        original_draft_id: draft.id,
        raw_text: draft.rawText,
        summary,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        priority,
      }
    };

    addTimelineItem(timelineItem);
    clearPendingDraft();
    navigate("/timeline");
  }

  function handleDiscard() {
    clearPendingDraft();
    setDraft(null);
    navigate("/");
  }

  if (!draft) {
    return (
      <div className="page-stack">
        <section className="hero-panel compact-hero" style={{ borderLeft: "4px solid var(--accent-gold)" }}>
          <div className="section-tag" style={{ color: "var(--accent-gold)", background: "rgba(251, 191, 36, 0.1)" }}>Approval Desk</div>
          <h2>Review Queue</h2>
          <p>This is where agent-processed drafts await your approval before committing to the timeline.</p>
        </section>
        <div className="card">
          <StateEmpty icon={<CheckSquare size={32} />} text="No pending drafts to review. Go capture something!" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="hero-panel compact-hero" style={{ borderLeft: "4px solid var(--accent-gold)" }}>
        <div className="section-tag" style={{ color: "var(--accent-gold)", background: "rgba(251, 191, 36, 0.1)" }}>Approval Desk</div>
        <h2>Review Draft</h2>
        <p>The agent has structured your capture. Edit below before committing to the timeline.</p>
      </section>

      <form className="card" onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label className="form-label">Final Title</label>
          <input 
            className="text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="three-col">
          <div>
            <label className="form-label">Record Type</label>
            <select 
              className="select-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="qibits">QiBit / Note</option>
              <option value="actions">Action / Task</option>
              <option value="transactions">Transaction / Finance</option>
              <option value="events">Event / Legal</option>
              <option value="care">Health / Care</option>
            </select>
          </div>
          <div>
            <label className="form-label">Bucket</label>
            <select 
              className="select-input"
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
            >
              <option value="inbox">Inbox</option>
              <option value="projects">Projects</option>
              <option value="areas">Areas</option>
              <option value="resources">Resources</option>
              <option value="archive">Archive</option>
            </select>
          </div>
          <div>
            <label className="form-label">Priority</label>
            <select 
              className="select-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Summary</label>
          <textarea
            className="textarea-input"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="form-label">Tags (comma separated)</label>
          <input 
            className="text-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div style={{ padding: 16, background: "rgba(255, 255, 255, 0.02)", borderRadius: "var(--r-md)", marginTop: 8, border: "1px dashed rgba(255, 255, 255, 0.15)" }}>
          <div className="form-label" style={{ marginBottom: 8 }}>Original Raw Text</div>
          <div style={{ fontSize: 14, whiteSpace: "pre-wrap", color: "var(--ink-500)" }}>{draft.rawText}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <button 
            type="button"
            className="btn btn-ghost" 
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button 
            type="submit"
            className="btn btn-primary" 
          >
            Save to Timeline
          </button>
        </div>
      </form>
    </div>
  );
}
