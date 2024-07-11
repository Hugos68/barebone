import { createId } from "../../internal/create-id.js";
import type { Attributes } from "../../internal/types.js";

interface CreateAccordionOptions {
	initialOpened?: unknown[];
	multiple?: boolean;
}

const createAccordion = (options: CreateAccordionOptions = {}) => {
	const { multiple = false, initialOpened = [] } = $derived(options);

	const rootId = createId();
	const opened = new Set(initialOpened);

	const toggle = (id: unknown) => {
		if (opened.has(id)) {
			opened.delete(id);
		} else {
			if (multiple) {
				opened.add(id);
			} else {
				opened.clear();
				opened.add(id);
			}
		}
	};

	const header = (id: unknown): Attributes => {
		const headerId = createId();
		return {
			"data-barebone-factory-id": rootId,
			"data-barebone-factory-name": "accordion",
			"data-barebone-part-id": headerId,
			"data-barebone-part-name": "header",
			id: headerId,
			role: "button",
			"aria-expanded": opened.has(id),
			onclick: (event) => {
				event.preventDefault();
				toggle(id);
			},
			onkeydown: (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					toggle(id);
				}
			},
		};
	};

	const panel = (id: unknown): Attributes => {
		const panelId = createId();
		return {
			"data-barebone-factory-id": rootId,
			"data-barebone-factory-name": "accordion",
			"data-barebone-part-id": panelId,
			"data-barebone-part-name": "panel",
		};
	};

	return { header, content: panel };
};

export { createAccordion };
