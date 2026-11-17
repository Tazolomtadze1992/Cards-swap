"use client";

// Which learning topics the child has finished in this visit. Kept in sessionStorage only,
// so it disappears when the tab closes — matching the page's promise not to keep data.
// Every topic card opens the same demo article, so the topic is remembered when its card
// is opened and marked finished when the child reaches the final quiz results.
import { useMemo, useSyncExternalStore } from "react";

const currentKey = "learning:current-topic";
const completedKey = "learning:completed-topics";
const listeners = new Set<() => void>();

function read(key: string) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { window.sessionStorage.setItem(key, value); } catch { /* Storage blocked: progress just isn't shown. */ }
}
function parse(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

/** Call when a topic card is opened. */
export function startTopic(id: string) {
  write(currentKey, id);
}

/** Call when the child reaches the end of the topic's last activity. */
export function finishCurrentTopic() {
  const id = read(currentKey);
  if (!id) return;
  const done = new Set(parse(read(completedKey)));
  if (done.has(id)) return;
  done.add(id);
  write(completedKey, JSON.stringify([...done]));
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Ids of finished topics; empty on the server and on first render. */
export function useCompletedTopics(): ReadonlySet<string> {
  const raw = useSyncExternalStore(subscribe, () => read(completedKey) ?? "[]", () => "[]");
  return useMemo(() => new Set(parse(raw)), [raw]);
}
