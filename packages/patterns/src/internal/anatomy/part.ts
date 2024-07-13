import { nanoid } from "nanoid";
import type { Attributes } from "../attributes/attribute.js";
import type { Pattern } from "./pattern.js";

abstract class Part<TPattern extends Pattern> {
	id: string;
	name: string;
	protected pattern: TPattern;
	constructor(name: string, pattern: TPattern) {
		this.id = nanoid();
		this.name = name;
		this.pattern = pattern;
	}
	abstract attributes(): Attributes;
}

export { Part };
