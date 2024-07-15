import { Base } from "./base.js";
import type { Pattern } from "./pattern.js";

abstract class PatternPart<TPattern extends Pattern> extends Base {
	protected pattern: TPattern;
	constructor(name: string, pattern: TPattern) {
		super(name);
		this.pattern = pattern;
	}
}

export { PatternPart };
