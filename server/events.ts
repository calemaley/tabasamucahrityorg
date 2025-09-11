import { EventEmitter } from "events";

export const emitter = new EventEmitter();

// Helper to broadcast resource changes
export function broadcastResource(payload: any) {
  try {
    emitter.emit("resource", payload);
  } catch {}
}
