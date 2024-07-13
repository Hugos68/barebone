import { SvelteSet } from "svelte/reactivity";
import { ItemPart } from "../../internal/anatomy/item-part.js";
import { Item } from "../../internal/anatomy/item.js";
import { Pattern } from "../../internal/anatomy/pattern.js";
import { aria } from "../../internal/attributes/aria.js";
import { attributes } from "../../internal/attributes/attribute.js";
import { barebone } from "../../internal/attributes/barebone.js";
import { id } from "../../internal/attributes/id.js";
import { on } from "../../internal/attributes/on.js";
import { role } from "../../internal/attributes/role.js";
import { tabindex } from "../../internal/attributes/tabindex.js";
import {
	get_first,
	get_last,
	get_next,
	get_previous,
} from "../../internal/utilites/element.js";

interface AccordionOptions {
	multiple?: boolean;
	opened?: SvelteSet<unknown>;
}

class Accordion extends Pattern<AccordionOptions> {
	multiple = $derived.by(() => this.options.multiple ?? false);
	opened = $derived.by(() => new SvelteSet(this.options.opened ?? []));

	constructor(options: AccordionOptions = {}) {
		super("accordion", options);
	}

	open(value: unknown) {
		if (this.multiple) {
			this.opened.add(value);
		} else {
			this.opened.clear();
			this.opened.add(value);
		}
	}

	close(value: unknown) {
		this.opened.delete(value);
	}

	toggle(value: unknown) {
		if (this.opened.has(value)) {
			this.close(value);
		} else {
			this.open(value);
		}
	}

	attributes() {
		return attributes(
			barebone("pattern-id", this.id),
			barebone("pattern", "accordion"),
		);
	}
}

class AccordionItem extends Item<Accordion> {
	header: AccordionHeader;
	panel: AccordionPanel;
	constructor(pattern: Accordion, value?: unknown) {
		super(pattern, value);
		this.header = new AccordionHeader(this);
		this.panel = new AccordionPanel(this);
	}
	get open() {
		return this.pattern.opened.has(this.value);
	}
}

class AccordionHeader extends ItemPart<Accordion, AccordionItem> {
	constructor(item: AccordionItem) {
		super("header", item);
	}
	attributes() {
		return attributes(
			barebone("part-id", this.id),
			barebone("part", "header"),
			id(this.id),
			role("button"),
			tabindex(0),
			aria("expanded", this.item.open),
			aria("controls", this.item.panel.id),
			on("click", (event) => {
				event.preventDefault();
				this.item.pattern.toggle(this.item);
			}),
			on("keydown", (event) => {
				if (event.key !== "Enter") {
					return;
				}
				event.preventDefault();
				this.item.pattern.toggle(this.item);
			}),
			on("keydown", (event) => {
				if (event.key !== " ") {
					return;
				}
				event.preventDefault();
				this.item.pattern.toggle(this.item);
			}),
			on("keydown", (event) => {
				if (
					event.key !== "ArrowUp" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = get_previous(
					`[data-barebone-pattern-id="${this.item.pattern.id}"] > [data-barebone-part="header"]`,
					event.currentTarget,
				);
				if (target === undefined) {
					return;
				}
				event.preventDefault();
				target.focus();
			}),
			on("keydown", (event) => {
				if (
					event.key !== "ArrowDown" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = get_next(
					`[data-barebone-pattern-id="${this.item.pattern.id}"] > [data-barebone-part="header"]`,
					event.currentTarget,
				);
				if (target === undefined) {
					return;
				}
				event.preventDefault();
				target.focus();
			}),

			on("keydown", (event) => {
				if (
					event.key !== "Home" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = get_first(
					`[data-barebone-pattern-id="${this.item.pattern.id}"] > [data-barebone-part="header"]`,
				);
				if (target === undefined) {
					return;
				}
				event.preventDefault();
				target.focus();
			}),

			on("keydown", (event) => {
				if (
					event.key !== "End" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = get_last(
					`[data-barebone-pattern-id="${this.item.pattern.id}"] > [data-barebone-part="header"]`,
				);
				if (target === undefined) {
					return;
				}
				event.preventDefault();
				target.focus();
			}),
		);
	}
}

class AccordionPanel extends ItemPart<Accordion, AccordionItem> {
	constructor(item: AccordionItem) {
		super("panel", item);
	}
	attributes() {
		return attributes(
			barebone("part-id", this.id),
			barebone("part", "panel"),
			id(this.id),
			role("region"),
			aria("labelledby", this.item.header.id),
		);
	}
}

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };
