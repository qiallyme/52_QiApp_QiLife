import { useNavigate } from "react-router-dom";

type QuickCaptureProps = { onCaptured: () => void };

export function QuickCapture({ onCaptured }: QuickCaptureProps) {
  const navigate = useNavigate();

  return (
    <div className="quick-capture" style={{ cursor: "pointer" }} onClick={() => navigate("/capture")}>
      <div className="qc-label">What happened?</div>
      <div 
        className="qc-input"
        style={{ color: "var(--ink-400)", padding: 12, minHeight: 44, display: "flex", alignItems: "center" }}
      >
        Click to capture anything...
      </div>
      <div className="qc-row" style={{ marginTop: 8 }}>
        <span className="qc-status">Goes to full capture screen</span>
        <button className="btn btn-accent btn-sm" type="button">Capture</button>
      </div>
    </div>
  );
}
