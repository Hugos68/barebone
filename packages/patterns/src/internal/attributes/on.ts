import { attribute } from "./attribute.js";

interface On {
	<TEvent extends keyof WindowEventMap>(
		event: TEvent,
		callback: (this: Window, event: WindowEventMap[TEvent]) => void,
	): ReturnType<typeof attribute>;
	<TEvent extends keyof DocumentEventMap>(
		event: TEvent,
		callback: (this: Document, event: DocumentEventMap[TEvent]) => void,
	): ReturnType<typeof attribute>;
	<TEvent extends keyof HTMLElementEventMap>(
		event: TEvent,
		callback: (this: HTMLElement, event: HTMLElementEventMap[TEvent]) => void,
	): ReturnType<typeof attribute>;
	(
		event: string,
		callback: EventListenerOrEventListenerObject,
	): ReturnType<typeof attribute>;
}

const on: On = (
	event: string,
	callback: EventListenerOrEventListenerObject,
) => {
	return attribute(`on${event}`, callback);
};

export { on };
