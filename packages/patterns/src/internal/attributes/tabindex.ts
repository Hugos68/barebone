import { attribute } from "./attribute.js";

const tabindex = (value: number) => {
	return attribute("tabindex", value);
};

export { tabindex };
