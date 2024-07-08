import { PACKAGE_NAME } from "../constants.js";
import type { Behavior } from "./apply-behavior.js";

const barebone = (name: string, value: string | number | boolean): Behavior => {
	return {
		[`data-${PACKAGE_NAME}-${name}`]: value,
	};
};

export { barebone };
