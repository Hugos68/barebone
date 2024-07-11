import { attribute } from "./attribute.js";

const id = (id: unknown) => {
	return attribute("id", id);
};

export { id };
