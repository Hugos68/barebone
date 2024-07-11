import type { AriaRole } from "svelte/elements";
import { attribute } from "./attribute.js";

const role = (role: AriaRole) => {
	return attribute("role", role);
};

export { role };
