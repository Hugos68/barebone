import type { Behavior } from "./apply-behavior.js";

type Role = "button" | "region";

const role = (role: Role): Behavior => {
	return {
		role: role,
	};
};

export { role };
export type { Role };
