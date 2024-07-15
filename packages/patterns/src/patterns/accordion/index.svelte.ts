import { nanoid } from "nanoid";
import { SvelteSet } from "svelte/reactivity";
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
} from "../../internal/utilites/get-element.js";

interface AccordionOptions {
	multiple?: boolean;
	opened?: SvelteSet<string>;
}

class Accordion {
	#id: string;
	#part: string;
	#options: AccordionOptions;
	#multiple = $derived.by(() => this.#options.multiple ?? false);
	#opened = $derived.by(() => this.#options.opened ?? new SvelteSet<string>());

	constructor(options: AccordionOptions = {}) {
		this.#id = nanoid();
		this.#part = "accordion";
		this.#options = options;
	}
	get id() {
		return this.#id;
	}

	get part() {
		return this.#part;
	}

	get opened() {
		return this.#opened;
	}

	get multiple() {
		return this.#multiple;
	}

	get attributes() {
		return attributes(
			barebone("part-id", this.#id),
			barebone("part", this.#part),
		);
	}

	open(value: string) {
		if (this.#multiple) {
			this.#opened.add(value);
		} else {
			this.#opened.clear();
			this.#opened.add(value);
		}
	}

	close(value: string) {
		this.#opened.delete(value);
	}

	toggle(value: string) {
		if (this.#opened.has(value)) {
			this.close(value);
		} else {
			this.open(value);
		}
	}
}

interface AccordionItemOptions {
	value?: string;
	disabled?: boolean;
}

class AccordionItem {
	#accordion: Accordion;
	#accordionHeader: AccordionHeader;
	#accordionPanel: AccordionPanel;
	#options: AccordionItemOptions;
	#value = $derived.by(() => this.#options.value ?? nanoid());
	#disabled = $derived.by(() => this.#options.disabled ?? false);

	constructor(accordion: Accordion, options: AccordionItemOptions = {}) {
		this.#accordion = accordion;
		this.#accordionHeader = new AccordionHeader(this);
		this.#accordionPanel = new AccordionPanel(this);
		this.#options = options;
	}

	get accordion() {
		return this.#accordion;
	}

	get accordionHeader() {
		return this.#accordionHeader;
	}

	get accordionPanel() {
		return this.#accordionPanel;
	}

	get open() {
		return this.#accordion.opened.has(this.#value);
	}

	get value() {
		return this.#value;
	}

	get disabled() {
		return this.#disabled;
	}
}

class AccordionHeader {
	#id: string;
	#part: string;
	accordionItem: AccordionItem;

	constructor(accordionItem: AccordionItem) {
		this.#id = nanoid();
		this.#part = "accordion-header";
		this.accordionItem = accordionItem;
	}

	get id() {
		return this.#id;
	}

	get part() {
		return this.#part;
	}

	get attributes() {
		return attributes(
			barebone("part-id", this.accordionItem.value),
			barebone("part", this.#part),
			id(this.#id),
			role("button"),
			tabindex(0),
			aria("expanded", this.accordionItem.open),
			aria("controls", this.accordionItem.accordionPanel.id),
			aria("disabled", this.accordionItem.disabled),
			on("click", (event) => {
				if (this.accordionItem.disabled) {
					return;
				}
				event.preventDefault();
				this.accordionItem.accordion.toggle(this.accordionItem.value);
			}),
			on("keydown", (event) => {
				if (event.key !== "Enter" || this.accordionItem.disabled) {
					return;
				}
				event.preventDefault();
				this.accordionItem.accordion.toggle(this.accordionItem.value);
			}),
			on("keydown", (event) => {
				if (event.key !== " " || this.accordionItem.disabled) {
					return;
				}
				event.preventDefault();
				this.accordionItem.accordion.toggle(this.accordionItem.value);
			}),
			on("keydown", (event) => {
				if (
					event.key !== "ArrowUp" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = get_previous(
					`[data-barebone-part-id="${this.accordionItem.accordion.id}"] > [data-barebone-part="${this.#part}"]`,
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
					`[data-barebone-part-id="${this.accordionItem.accordion.id}"] > [data-barebone-part="${this.#part}"]`,
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
					`[data-barebone-part-id="${this.accordionItem.accordion.id}"] > [data-barebone-part="${this.#part}"]`,
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
					`[data-barebone-part-id="${this.accordionItem.accordion.id}"] > [data-barebone-part="${this.#part}"]`,
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

class AccordionPanel {
	#id: string;
	#part: string;
	accordionItem: AccordionItem;

	constructor(accordionItem: AccordionItem) {
		this.#id = nanoid();
		this.#part = "accordion-panel";
		this.accordionItem = accordionItem;
	}

	get id() {
		return this.#id;
	}

	get part() {
		return this.#part;
	}

	get attributes() {
		return attributes(
			barebone("part-id", this.#id),
			barebone("part", this.#part),
			id(this.#id),
			role("region"),
			aria("labelledby", this.accordionItem.accordionHeader.id),
		);
	}
}

export { Accordion, AccordionItem };
