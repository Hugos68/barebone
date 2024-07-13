import { nanoid } from "nanoid";

abstract class Pattern<Options = unknown> {
	id: string;
	name: string;
	protected options: Options;
	constructor(name: string, options: Options) {
		this.id = nanoid();
		this.name = name;
		this.options = options;
	}
}

export { Pattern };
