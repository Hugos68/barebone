import type { HTMLAttributes } from "svelte/elements";

type Attributes = HTMLAttributes<HTMLElement>;

const attribute = (name: string, value: unknown): Attributes => {
	return {
		[name]: value,
	};
};

const attributes = (...attributes: Array<Attributes>): Attributes => {
	const result: Attributes = {};
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	const map = new Map<string, Array<Function>>();
	for (const attribute of attributes) {
		for (const [key, value] of Object.entries(attribute)) {
			if (key.indexOf("on") === 0 && typeof value === "function") {
				if (!map.has(key)) {
					map.set(key, [value]);
					Object.assign(result, {
						[key]: (...args: unknown[]) => {
							return map.get(key)?.map((fn) => fn(...args));
						},
					});
				} else {
					map.get(key)?.push(value);
				}
			} else {
				Object.assign(result, attribute);
			}
		}
	}
	return result;
};

export { attribute, attributes };
export type { Attributes };
