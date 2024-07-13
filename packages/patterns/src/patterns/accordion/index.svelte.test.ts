import { SvelteSet } from "svelte/reactivity";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem } from "./index.svelte.js";

describe("Accordion", () => {
	describe("Options", () => {
		it("Sets 'multiple' to false by default", () => {
			const accordion = new Accordion();
			expect(accordion.multiple).toBe(false);
		});

		it("Sets 'opened' to an empty Set by default", () => {
			const accordion = new Accordion();
			expect(accordion.opened.size).toBe(0);
		});

		it("Sets 'multiple' to the provided option", () => {
			const accordion = new Accordion({ multiple: true });
			expect(accordion.multiple).toBe(true);
		});

		it("Sets 'opened' to the provided option", () => {
			const accordion = new Accordion({ opened: new SvelteSet(["1"]) });
			expect(accordion.opened.size).toBe(1);
		});
	});

	describe("Behaviour", () => {
		it("Adds the item to the 'opened' Set when 'toggle' is called", () => {
			const accordion = new Accordion();
			accordion.toggle("1");
			expect(accordion.opened.has("1")).toBe(true);
		});

		it("Removes the item from the 'opened' Set when 'toggle' is called with the same value", () => {
			const accordion = new Accordion();
			accordion.toggle("1");
			accordion.toggle("1");
			expect(accordion.opened.has("1")).toBe(false);
		});
	});

	describe("Accessibility", () => {
		describe("Header", () => {
			it("Sets `role` to 'button'", () => {
				const accordion = new Accordion();
				const item = new AccordionItem(accordion, "1");
				expect(item.header.attributes().role).toBe("button");
			});
			it("Sets 'aria-expanded' to 'true' when 'open' is true", () => {
				const accordion = new Accordion();
				const item = new AccordionItem(accordion, "1");
				expect(item.header.attributes()["aria-expanded"]).toBe(false);
				accordion.toggle("1");
				expect(item.header.attributes()["aria-expanded"]).toBe(true);
			});
			it("Sets 'aria-controls' to the 'id' of the 'panel'", () => {
				const accordion = new Accordion();
				const item = new AccordionItem(accordion, "1");
				expect(item.header.attributes()["aria-controls"]).toBe(
					item.panel.attributes().id,
				);
			});
		});

		describe("Panel", () => {
			it("Sets 'aria-labelledby' to the 'id' of the 'header'", () => {
				const accordion = new Accordion();
				accordion.toggle({ value: "1" });
				const item = new AccordionItem(accordion, "1");
				expect(item.panel.attributes()["aria-labelledby"]).toBe(
					item.header.attributes().id,
				);
			});
		});
	});
});
