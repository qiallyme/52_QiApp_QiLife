# QiLife

QiLife is an AI Life Copilot with a Personal LifeDesk cockpit. It captures what happens, correlates it with structured life memory, drafts insights/actions/reports, protects files, prevents duplicates, and keeps you oriented with minimal manual organizing.

## Core Architecture
- **Agent-First**: The backend agent is the real product. The UI is a control panel (Cockpit).
- **Vertical Slices**: Built using the North Star scaffold approach. We build full slices (UI -> API -> DB) instead of throwaway MVPs.
- **Data & Storage**: Clean local SQLite schema. App-managed storage/sync control center. Dup-allergic document vault. Legacy data bridge for importing old Supabase data.
- **Spaces**: Scoped access sharing via spaces (e.g., Mom Care), replacing separate bloated apps.

## Primary Flow
Capture → Ingestion Item → File/Text Extraction → Mock AI Draft → Draft Review → Approval/Edit/Reject → Official QiBit/Action/Thread → Timeline → Activity Log → Context Dock / Retrieval hooks
