import { Part } from "./part.js";

abstract class Pattern<Options = unknown> extends Part {
	protected options: Options;
	constructor(name: string, options: Options) {
		super(name);
		this.options = options;
	}
}

export { Pattern };
