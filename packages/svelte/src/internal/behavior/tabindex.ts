import type { Behavior } from "./apply-behavior.js";

const tabindex = (index: number): Behavior => {
	return {
		tabindex: index,
	};
};

export { tabindex };
