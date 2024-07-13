import type { Pattern } from "./pattern.js";

abstract class SubPattern<TPattern extends Pattern> {
	pattern: TPattern;
	constructor(pattern: TPattern) {
		this.pattern = pattern;
	}
}

export { SubPattern };
