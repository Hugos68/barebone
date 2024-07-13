import type { Pattern } from "./pattern.js";

abstract class Item<TPattern extends Pattern> {
	protected pattern: TPattern;
	protected value: unknown;
	constructor(pattern: TPattern, value: unknown = this) {
		this.pattern = pattern;
		this.value = value;
	}
}

export { Item };
