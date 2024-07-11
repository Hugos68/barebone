import { attribute } from "./attribute.js";

const data = (name: string, value: unknown) => {
	return attribute(`data-${name}`, value);
};

export { data };
