import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sun, History, PlusCircle, CheckSquare, Inbox, Layers, 
  CheckCircle, Calendar, Users, DollarSign, BookOpen, 
  FileText, MessageCircle 
} from "lucide-react";

const navItems = [
  { label: "Today", href: "/", icon: <Sun size={18} /> },
  { label: "Timeline", href: "/timeline", icon: <History size={18} /> },
  { label: "Capture", href: "/capture", icon: <PlusCircle size={18} /> }, 
  { label: "Review", href: "/review", icon: <CheckSquare size={18} /> },
  { label: "Inbox", href: "/inbox", icon: <Inbox size={18} /> },
  { label: "Threads", href: "/threads", icon: <Layers size={18} /> },
  { label: "Actions", href: "/actions", icon: <CheckCircle size={18} /> },
  { label: "Calendar", href: "/calendar", icon: <Calendar size={18} /> },
  { label: "People", href: "/people", icon: <Users size={18} /> },
  { label: "Money", href: "/money", icon: <DollarSign size={18} /> },
  { label: "Knowledge", href: "/knowledge", icon: <BookOpen size={18} /> },
  { label: "Documents", href: "/documents", icon: <FileText size={18} /> },
  { label: "Ask QiLife", href: "/ask", icon: <MessageCircle size={18} /> },
] as const;

// Mobile nav uses a subset
const mobileNavItems = [
  { label: "Today", href: "/", icon: <Sun size={20} /> },
  { label: "Capture", href: "/capture", icon: <PlusCircle size={20} /> },
  { label: "Review", href: "/review", icon: <CheckSquare size={20} /> },
  { label: "Timeline", href: "/timeline", icon: <History size={20} /> },
];

type AppShellProps = {
  children: ReactNode;
  contextDock: ReactNode;
  quickCapture: ReactNode;
};

export function AppShell({ children, contextDock, quickCapture }: AppShellProps) {
  const location = useLocation();
  
  return (
    <div className="shell">
      {/* Mobile Header */}
      <header className="mobile-header">
        <h1>QiLife</h1>
        <span className="mobile-mock-badge">Local mock mode</span>
      </header>

      {/* Left Rail (Desktop) */}
      <aside className="left-rail">
        <div className="rail-logo">
          <div className="rail-logo-kicker">Personal LifeDesk</div>
          <h1>QiLife</h1>
          <p>Capture, triage, act, resolve, retrieve.</p>
        </div>

        <nav className="rail-nav" aria-label="Primary navigation">
          <div className="rail-section-label">Core</div>
          {navItems.slice(0, 6).map(({ label, href, icon }) => (
            <NavLink
              key={href}
              to={href}
              end={href === "/"}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </NavLink>
          ))}

          <div className="rail-section-label" style={{ marginTop: 16 }}>Modules</div>
          {navItems.slice(6).map(({ label, href, icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="rail-footer">
          QiLife v1 · Local mock mode
        </div>
      </aside>

      {/* Main Content */}
      <main className="workspace">
        <header className="workspace-header">
          <span className="workspace-breadcrumb">QiLife v1 Spine</span>
          <span className="workspace-status-dot">
            <span className="status-dot" />
            Local mock mode
          </span>
        </header>
        {children}
      </main>

      {/* Right Dock (Desktop/Tablet conditionally) */}
      <aside className="right-dock-wrap">{contextDock}</aside>

      {/* Quick Capture floating bar (if needed, though capture is now a page) */}
      <div className="quick-capture-bar">{quickCapture}</div>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav">
        {mobileNavItems.map(({ label, href, icon }) => {
          const isActive = location.pathname === href;
          return (
            <NavLink key={href} to={href} end={href === "/"} className={`mobile-nav-item ${isActive ? "active" : ""}`}>
              <span className="mobile-nav-icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
