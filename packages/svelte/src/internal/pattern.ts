import { nanoid } from "nanoid";
import { mergeBehavior } from "./behavior/apply-behavior.js";
import type { Behavior } from "./behavior/apply-behavior.js";
import { barebone } from "./behavior/barebone.js";

/**
 * Base class for all patterns
 */
abstract class Pattern<Options> {
	id: string;
	name: string;
	options: Options;
	genericProps: Behavior;
	constructor(name: string, options: Options) {
		this.id = nanoid();
		this.name = name;
		this.options = options;
		this.genericProps = mergeBehavior(
			barebone("id", this.id),
			barebone("pattern", name),
		);
	}
}

export { Pattern };
