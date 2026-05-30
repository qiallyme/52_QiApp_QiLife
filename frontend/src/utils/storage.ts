import { Draft, TimelineRow } from "../types";

export const PENDING_DRAFT_KEY = "qilife_pending_draft";
export const TIMELINE_KEY = "qilife_timeline";

export function getPendingDraft(): Draft | null {
  const data = localStorage.getItem(PENDING_DRAFT_KEY);
  return data ? JSON.parse(data) : null;
}

export function savePendingDraft(draft: Draft) {
  localStorage.setItem(PENDING_DRAFT_KEY, JSON.stringify(draft));
}

export function clearPendingDraft() {
  localStorage.removeItem(PENDING_DRAFT_KEY);
}

export function getTimelineItems(): TimelineRow[] {
  const data = localStorage.getItem(TIMELINE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addTimelineItem(item: TimelineRow) {
  const items = getTimelineItems();
  localStorage.setItem(TIMELINE_KEY, JSON.stringify([item, ...items]));
}
