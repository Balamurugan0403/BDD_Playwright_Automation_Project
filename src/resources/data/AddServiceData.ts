import { Service } from "../../main/types/Service";

export function getServiceData(): Service {
    return {
        name: `Service_${Date.now()}`,
        description: "Test Description"
    };
}