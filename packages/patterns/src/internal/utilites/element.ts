const get_last = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1);
};

const get_first = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector))[0];
};

const get_previous = (selector: string, element: HTMLElement, loop = false) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	const previous = elements[elements.indexOf(element) - 1];
	if (!loop) {
		return previous;
	}
	return previous ?? elements.at(-1);
};

const get_next = (selector: string, element: HTMLElement, loop = false) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	const next = elements[elements.indexOf(element) + 1];
	if (!loop) {
		return next;
	}
	return next ?? elements[0];
};

export { get_last, get_first, get_previous, get_next };
