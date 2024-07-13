import { nanoid } from "nanoid";
import type { Attributes } from "../attributes/attribute.js";

abstract class Part {
	id: string;
	name: string;
	constructor(name: string) {
		this.id = nanoid();
		this.name = name;
	}
	abstract attributes(): Attributes;
}

export { Part };
