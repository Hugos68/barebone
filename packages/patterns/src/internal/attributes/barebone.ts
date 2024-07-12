import { PACKAGE_NAME } from "../constants.js";
import { data } from "./data.js";

type BareboneName = "pattern" | "part" | "pattern-id" | "part-id";

const barebone = (name: BareboneName, value: unknown) => {
	return data(`${PACKAGE_NAME}-${name}`, value);
};

export { barebone };
export type { BareboneName };
