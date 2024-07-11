import type { AriaAttributes } from "svelte/elements";
import { attribute } from "./attribute.js";

type AriaName = keyof AriaAttributes extends `aria-${infer R}` ? R : never;

const aria = (name: AriaName, value: unknown) => {
	return attribute(`aria-${name}`, value);
};

export { aria };
export type { AriaName };
