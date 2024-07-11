import { SvelteSet } from "svelte/reactivity";
import { aria } from "../../internal/attributes/aria.js";
import { merge } from "../../internal/attributes/attribute.js";
import { barebone } from "../../internal/attributes/barebone.js";
import { id } from "../../internal/attributes/id.js";
import { on } from "../../internal/attributes/on.js";
import { role } from "../../internal/attributes/role.js";
import { tabindex } from "../../internal/attributes/tabindex.js";
import { createId } from "../../internal/create-id.js";
import type { Attributes } from "../../internal/types.js";

interface AccordionOptions {
	multiple?: boolean;
	opened?: Array<unknown>;
}

class Accordion {
	private options: AccordionOptions;
	multiple = $derived.by(() => this.options.multiple ?? false);
	opened = $derived.by(() => new SvelteSet(this.options.opened ?? []));

	constructor(options: AccordionOptions = {}) {
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
			barebone("pattern", "accordion"),
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
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					this.accordion.toggle(this.value);
				}
			}),
		);
	}

	panel(): Attributes {
		return merge(
			barebone("pattern", "accordion"),
			barebone("part", "panel"),
			id(this.panelId),
			role("region"),
			aria("labelledby", this.headerId),
		);
	}
}

export { Accordion, AccordionItem };
export type { AccordionOptions };
