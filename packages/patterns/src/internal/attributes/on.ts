import { attribute } from "./attribute.js";

const on = <K extends keyof HTMLElementEventMap>(
	key: K,
	...callbacks: Array<(event: HTMLElementEventMap[K]) => void>
) => {
	return attribute(`on${key}`, (event: HTMLElementEventMap[K]) => {
		for (const callback of callbacks) {
			callback(event);
		}
	});
};

export { on };
