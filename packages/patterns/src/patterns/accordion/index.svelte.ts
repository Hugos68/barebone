import { nanoid } from "nanoid";
import { SvelteSet } from "svelte/reactivity";
import { aR } from "vitest/dist/reporters-BECoY4-b.js";
import { Pattern } from "../../internal/anatomy/pattern.js";
import { SubPatternPart } from "../../internal/anatomy/sub-pattern-part.js";
import { SubPattern } from "../../internal/anatomy/sub-pattern.js";
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
	opened?: SvelteSet<string>;
}

interface AccordionItemOptions {
	value?: string;
	disabled?: boolean;
}

class Accordion extends Pattern<AccordionOptions> {
	multiple = $derived.by(() => this.options.multiple ?? false);
	opened = $derived.by(() => new SvelteSet(this.options.opened ?? []));

	constructor(options: AccordionOptions = {}) {
		super("accordion", options);
	}

	open(value: string) {
		if (this.multiple) {
			this.opened.add(value);
		} else {
			this.opened.clear();
			this.opened.add(value);
		}
	}

	close(value: string) {
		this.opened.delete(value);
	}

	toggle(value: string) {
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

class AccordionItem extends SubPattern<Accordion, AccordionItemOptions> {
	value = $derived.by(() => this.options.value ?? nanoid());
	disabled = $derived.by(() => this.options.disabled ?? false);
	header: AccordionHeader;
	panel: AccordionPanel;

	constructor(pattern: Accordion, options: AccordionItemOptions = {}) {
		super(pattern, options);
		this.header = new AccordionHeader(this);
		this.panel = new AccordionPanel(this);
	}

	get open() {
		return this.pattern.opened.has(this.value);
	}
}

class AccordionHeader extends SubPatternPart<Accordion, AccordionItem> {
	constructor(item: AccordionItem) {
		super("header", item);
	}

	attributes() {
		return attributes(
			barebone("part-id", this.item.value),
			barebone("part", "header"),
			id(this.id),
			role("button"),
			tabindex(0),
			aria("expanded", this.item.open),
			aria("controls", this.item.panel.id),
			aria("disabled", this.item.disabled),
			on("click", (event) => {
				if (this.item.disabled) {
					return;
				}
				event.preventDefault();
				this.item.pattern.toggle(this.item.value);
			}),
			on("keydown", (event) => {
				if (event.key !== "Enter" || this.item.disabled) {
					return;
				}
				event.preventDefault();
				this.item.pattern.toggle(this.item.value);
			}),
			on("keydown", (event) => {
				if (event.key !== " " || this.item.disabled) {
					return;
				}
				event.preventDefault();
				this.item.pattern.toggle(this.item.value);
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

class AccordionPanel extends SubPatternPart<Accordion, AccordionItem> {
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
