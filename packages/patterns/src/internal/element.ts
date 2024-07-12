const getLast = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector)).at(-1);
};

const getFirst = (selector: string) => {
	return Array.from(document.querySelectorAll<HTMLElement>(selector)).at(0);
};

const getPrevious = (selector: string, element: HTMLElement) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	return elements[elements.indexOf(element) - 1];
};

const getNext = (selector: string, element: HTMLElement) => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	return elements[elements.indexOf(element) + 1];
};

export { getLast, getFirst, getPrevious, getNext };
