import type { HTMLAttributes } from "svelte/elements";

type Behavior = HTMLAttributes<HTMLElement>;

const mergeBehavior = (...behaviors: Array<Behavior>): Behavior => {
	const result: Record<string, unknown> = {};
	for (const behavior of behaviors) {
		for (const [key, value] of Object.entries(behavior)) {
			result[key] = value;
		}
	}
	return result;
};

export { mergeBehavior };
export type { Behavior };
