import type { Attributes } from "../types.js";

const attribute = (name: string, value: unknown) => {
	return {
		[name]: value,
	};
};

const merge = (
	...attributes: Array<ReturnType<typeof attribute>>
): Attributes => {
	return Object.assign({}, ...attributes);
};

export { attribute, merge };
