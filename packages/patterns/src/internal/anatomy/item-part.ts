import type { Item } from "./item.js";
import { Part } from "./part.js";
import type { Pattern } from "./pattern.js";

abstract class ItemPart<
	TPattern extends Pattern,
	TItem extends Item<TPattern>,
> extends Part {
	protected item: TItem;
	constructor(name: string, item: TItem) {
		super(name);
		this.item = item;
	}
}

export { ItemPart };
