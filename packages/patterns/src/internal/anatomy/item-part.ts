import type { Item } from "./item.js";
import { Part } from "./part.js";
import type { Pattern } from "./pattern.js";

abstract class ItemPart<
	TPattern extends Pattern,
	TItem extends Item<TPattern>,
> extends Part<TPattern> {
	protected item: TItem;
	constructor(name: string, pattern: TPattern, item: TItem) {
		super(name, pattern);
		this.item = item;
	}
}

export { ItemPart };
