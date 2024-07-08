interface SiblingOptions {
	/**
	 * The element to find the sibling of.
	 */
	element: HTMLElement;

	/**
	 * The type of sibling to find. Can be "previous" or "next".
	 */
	type: "previous" | "next";

	/**
	 * The query to use for finding the sibling.
	 */
	query: string;
}

const sibling = (options: SiblingOptions): HTMLElement | null => {
	const elements = Array.from(
		document.querySelectorAll<HTMLElement>(options.query),
	);
	const index = elements.indexOf(options.element);
	if (index === -1) {
		return null;
	}
	const siblingIndex = options.type === "previous" ? index - 1 : index + 1;
	return elements[siblingIndex] ?? null;
};

export { sibling };
export type { SiblingOptions };
