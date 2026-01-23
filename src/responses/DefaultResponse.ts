import { Gateway } from "@/models/Gateway";

export interface DefaultResponse<T = any> {
	data: T;
	readonly status: String;
	readonly message: String;
}

class GatewayObject {
	data = [] as Array<Gateway>;
	status = "" as String;
	message = "" as String;
}

export class GatewayResponse {
	data = {} as GatewayObject
}