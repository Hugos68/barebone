import type { HTMLAttributes } from "svelte/elements";

type Parts = Record<string, () => HTMLAttributes<HTMLElement>>;

type Creator = () => Parts;

interface Factory {
	parts: Parts;
}

const createFactory = (name: string, creator: Creator): Factory => {
	const parts = creator();
	return { parts };
};

export { createFactory };
