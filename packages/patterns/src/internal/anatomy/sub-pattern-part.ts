import { Part } from "./part.js";
import type { Pattern } from "./pattern.js";
import type { SubPattern } from "./sub-pattern.js";

abstract class SubPatternPart<
	TPattern extends Pattern,
	TItem extends SubPattern<TPattern, unknown>,
> extends Part {
	protected item: TItem;
	constructor(name: string, item: TItem) {
		super(name);
		this.item = item;
	}
}

export { SubPatternPart };