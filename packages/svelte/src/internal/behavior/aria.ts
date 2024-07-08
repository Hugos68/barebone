import type { Behavior } from "./apply-behavior.js";

type AriaName = "label" | "labelledby" | "controls" | "expanded" | "disabled";

export const aria = (name: AriaName, value: string | boolean): Behavior => {
	return {
		[`aria-${name}`]: value,
	};
};
