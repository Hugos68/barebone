import type { Pattern } from "./pattern.js";

abstract class SubPattern<TPattern extends Pattern, Options> {
	pattern: TPattern;
	options: Options;
	constructor(pattern: TPattern, options: Options) {
		this.pattern = pattern;
		this.options = options;
	}
}

export { SubPattern };
