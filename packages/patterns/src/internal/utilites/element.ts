const get_last = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1);
};

const get_first = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector)).at(0);
};

const get_previous = (selector: string, element: HTMLElement) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	return elements[elements.indexOf(element) - 1];
};

const get_next = (selector: string, element: HTMLElement) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	return elements[elements.indexOf(element) + 1];
};

export { get_last, get_first, get_previous, get_next };
