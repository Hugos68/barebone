import type { Behavior } from "./apply-behavior.js";

interface On {
	<TEvent extends keyof WindowEventMap>(
		event: TEvent,
		callback: (this: Window, event: WindowEventMap[TEvent]) => void,
	): Behavior;
	<TEvent extends keyof DocumentEventMap>(
		event: TEvent,
		callback: (this: Document, event: DocumentEventMap[TEvent]) => void,
	): Behavior;
	<TEvent extends keyof HTMLElementEventMap>(
		event: TEvent,
		callback: (this: HTMLElement, event: HTMLElementEventMap[TEvent]) => void,
	): Behavior;
	(event: string, callback: EventListenerOrEventListenerObject): Behavior;
}

const on: On = (
	event: string,
	callback: EventListenerOrEventListenerObject,
): Behavior => {
	return {
		[`on${event}`]: callback,
	};
};

export { on };
