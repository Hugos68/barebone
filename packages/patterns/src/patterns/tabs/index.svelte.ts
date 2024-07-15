import { nanoid } from "nanoid";

type TabsOptions = {
	active?: string;
};

class Tabs {
	#id: string;
	#part: string;
	#options: TabsOptions;
	#active = $derived.by(() => this.#options.active ?? null);

	constructor(options: TabsOptions = {}) {
		this.#id = nanoid();
		this.#part = "tabs";
		this.#options = options;
	}

	get id() {
		return this.#id;
	}
}
