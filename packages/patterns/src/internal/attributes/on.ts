import { attribute } from "./attribute.js";

const on = <K extends keyof HTMLElementEventMap>(
	name: K,
	handler: (event: HTMLElementEventMap[K]) => void,
) => {
	return attribute(`on${name}`, handler);
};

export { on };
