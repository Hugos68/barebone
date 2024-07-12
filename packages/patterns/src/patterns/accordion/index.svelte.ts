import { SvelteSet } from "svelte/reactivity";
import { aria } from "../../internal/attributes/aria.js";
import { barebone } from "../../internal/attributes/barebone.js";
import { id } from "../../internal/attributes/id.js";
import { merge } from "../../internal/attributes/merge.js";
import { on } from "../../internal/attributes/on.js";
import { role } from "../../internal/attributes/role.js";
import { tabindex } from "../../internal/attributes/tabindex.js";
import { createId } from "../../internal/create-id.js";
import {
	getFirst,
	getLast,
	getNext,
	getPrevious,
} from "../../internal/element.js";
import type { Attributes } from "../../internal/types.js";

interface AccordionOptions {
	multiple?: boolean;
	opened?: Array<unknown>;
}

class Accordion {
	private _id: string;
	private options: AccordionOptions;
	multiple = $derived.by(() => this.options.multiple ?? false);
	opened = $derived.by(() => new SvelteSet(this.options.opened ?? []));

	constructor(options: AccordionOptions = {}) {
		this._id = createId();
		this.options = options;
	}

	toggle(value: unknown) {
		if (this.opened.has(value)) {
			this.opened.delete(value);
		} else {
			if (this.multiple) {
				this.opened.add(value);
			} else {
				this.opened.clear();
				this.opened.add(value);
			}
		}
	}

	get id() {
		return this._id;
	}
}

class AccordionItem {
	private accordion: Accordion;
	private value: unknown;
	private headerId: string;
	private panelId: string;

	open = $derived.by(() => this.accordion.opened.has(this.value));

	constructor(accordion: Accordion, value: unknown = this) {
		this.accordion = accordion;
		this.value = value;
		this.headerId = createId();
		this.panelId = createId();
	}

	header(): Attributes {
		return merge(
			barebone("pattern-id", this.accordion.id),
			barebone("pattern", "accordion"),
			barebone("part-id", this.headerId),
			barebone("part", "header"),
			id(this.headerId),
			role("button"),
			tabindex(0),
			aria("expanded", this.open),
			aria("controls", this.panelId),
			on("click", (event) => {
				event.preventDefault();
				this.accordion.toggle(this.value);
			}),
			on("keydown", (event) => {
				if (event.key !== "Enter") {
					return;
				}
				event.preventDefault();
				this.accordion.toggle(this.value);
			}),
			on("keydown", (event) => {
				if (event.key !== " ") {
					return;
				}
				event.preventDefault();
				this.accordion.toggle(this.value);
			}),
			on("keydown", (event) => {
				if (
					event.key !== "ArrowUp" ||
					!(event.currentTarget instanceof HTMLElement)
				) {
					return;
				}
				const target = getPrevious(
					`[data-barebone-pattern-id="${this.accordion.id}"][data-barebone-part="header"]`,
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
				const target = getNext(
					`[data-barebone-pattern-id="${this.accordion.id}"][data-barebone-part="header"]`,
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
				const target = getFirst(
					`[data-barebone-pattern-id="${this.accordion.id}"][data-barebone-part="header"]`,
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
				const target = getLast(
					`[data-barebone-pattern-id="${this.accordion.id}"][data-barebone-part="header"]`,
				);
				if (target === undefined) {
					return;
				}
				event.preventDefault();
				target.focus();
			}),
		);
	}

	panel(): Attributes {
		return merge(
			barebone("pattern-id", this.accordion.id),
			barebone("pattern", "accordion"),
			barebone("part-id", this.panelId),
			barebone("part", "panel"),
			id(this.panelId),
			role("region"),
			aria("labelledby", this.headerId),
		);
	}
}

export { Accordion, AccordionItem };
export type { AccordionOptions };
