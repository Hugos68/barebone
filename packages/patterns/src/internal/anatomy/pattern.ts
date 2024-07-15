import { Base } from "./base.js";

abstract class Pattern<Options = unknown> extends Base {
	protected options: Options;
	constructor(name: string, options: Options) {
		super(name);
		this.options = options;
	}
}

export { Pattern };
