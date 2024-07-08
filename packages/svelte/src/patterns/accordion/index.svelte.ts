import { SvelteSet } from "svelte/reactivity";
import { Pattern } from "../../internal/pattern.js";
import type { HTMLAttributes } from "svelte/elements";
import { mergeBehavior } from "../../internal/behavior/apply-behavior.js";
import { barebone } from "../../internal/behavior/barebone.js";
import { aria } from "../../internal/behavior/aria.js";
import { role } from "../../internal/behavior/role.js";
import { tabindex } from "../../internal/behavior/tabindex.js";
import { on } from "../../internal/behavior/on.js";
import { PACKAGE_NAME } from "../../internal/constants.js";
import { sibling } from "../../internal/sibling.js";

interface AccordionOptions<ID extends string> {
	/**
	 * Wether multiple panels can be open simultaneously
	 * @default false
	 */
	multiple?: boolean;
	/**
	 * An array of id's of the panels that should be opened by default
	 * @default []
	 */
	value?: Array<ID>;
}

/**
 * Implements the WAI-ARIA Accordion pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
class Accordion<ID extends string> extends Pattern<AccordionOptions<ID>> {
	/** Options */
	#multiple = $derived.by(() => this.options.multiple ?? false);
	#value = $derived.by(() => new SvelteSet(this.options.value ?? []));

	constructor(options: AccordionOptions<ID> = {}) {
		super("accordion", options);
	}

	/** Controls */
	open(id: ID) {
		if (!this.#multiple && this.#value.size > 0) {
			this.#value.clear();
		}
		this.#value.add(id);
	}

	close(id: ID) {
		this.#value.delete(id);
	}

	toggle(id: ID) {
		if (this.#value.has(id)) {
			this.close(id);
		} else {
			this.open(id);
		}
	}

	/** Parts */
	header(id: ID): HTMLAttributes<HTMLElement> {
		return mergeBehavior(
			this.genericProps,
			barebone("part", "header"),
			aria("expanded", this.#value.has(id)),
			aria("controls", id),
			role("button"),
			tabindex(0),
			on("click", (event) => {
				event.preventDefault();
				this.toggle(id);
			}),
			on("keydown", (event) => {
				switch (event.key) {
					case " ":
					case "Enter": {
						event.preventDefault();
						this.toggle(id);
						break;
					}
					case "ArrowUp":
					case "ArrowDown": {
						if (!(event.target instanceof HTMLElement)) {
							break;
						}
						const target = sibling({
							element: event.target,
							type: event.key === "ArrowUp" ? "previous" : "next",
							query: `[data-${PACKAGE_NAME}-id="${this.id}"][data-${PACKAGE_NAME}-pattern="${this.name}"][data-${PACKAGE_NAME}-part="panel"]`,
						});
						if (target === null) {
							return;
						}
						target.focus();
					}
				}
			}),
		);
	}

	panel(id: ID) {
		return mergeBehavior(
			this.genericProps,
			barebone("part", "panel"),
			role("region"),
			aria("labelledby", id),
		);
	}

	/** Helpers */
	isOpen(id: ID) {
		return this.#value.has(id);
	}
}

export { Accordion };
export type { AccordionOptions };
