import { useId } from "react";

/** Namespaced ids so repeated SVG art never shares gradient/filter ids. */
export function useSvgId(prefix: string) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (name: string) => `${prefix}-${id}-${name}`;
}
