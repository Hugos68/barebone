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
}

class Accordion {
	private opened: SvelteSet<AccordionItem>;
	private options: AccordionOptions;
	private multiple = $derived.by(() => this.options.multiple ?? false);

	constructor(options: AccordionOptions = {}) {
		this.opened = new SvelteSet();
		this.options = options;
	}

	toggle(item: AccordionItem) {
		if (this.opened.has(item)) {
			this.opened.delete(item);
		} else {
			if (this.multiple) {
				this.opened.add(item);
			} else {
				this.opened.clear();
				this.opened.add(item);
			}
		}
	}

	isOpen(item: AccordionItem) {
		return this.opened.has(item);
	}
}

class AccordionItem {
	private accordion: Accordion;
	private headerId: string;
	private panelId: string;

	constructor(accordion: Accordion) {
		this.accordion = accordion;
		this.headerId = createId();
		this.panelId = createId();
	}

	headerProps(): Attributes {
		return merge(
			barebone("factory", "accordion"),
			barebone("part", "header"),
			id(this.headerId),
			role("button"),
			tabindex(0),
			aria("expanded", this.accordion.isOpen(this)),
			aria("controls", this.panelId),
			on("click", (event) => {
				event.preventDefault();
				this.accordion.toggle(this);
			}),
			on("keydown", (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					this.accordion.toggle(this);
				}
			}),
		);
	}

	panelProps(): Attributes {
		return merge(
			barebone("factory", "accordion"),
			barebone("part", "panel"),
			id(this.panelId),
			role("region"),
			aria("labelledby", this.headerId),
		);
	}
}

export { Accordion, AccordionItem };
