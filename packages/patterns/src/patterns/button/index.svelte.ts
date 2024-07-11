import { merge } from "../../internal/attributes/attribute.js";
import { barebone } from "../../internal/attributes/barebone.js";
import { role } from "../../internal/attributes/role.js";
import { tabindex } from "../../internal/attributes/tabindex.js";
import type { Attributes } from "../../internal/types.js";

class Button {
	root(): Attributes {
		return merge(
			barebone("pattern", "button"),
			barebone("part", "root"),
			role("button"),
			tabindex(0),
		);
	}
}

export { Button };
