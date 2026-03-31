// To parse this data:
//
//   import { Convert, CategoryProductAPIResponse } from "./file";
//
//   const categoryProductAPIResponse = Convert.toCategoryProductAPIResponse(json);

export interface CategoryProductAPIResponse {
    status: number;
    message: string;
    name: string;
    seo: string;
    items: Item[];
}

export interface Item {
    typeName: string;
    typeSeo: string;
    machine: Machine[];
}

export interface Machine {
    machineName: string;
    localImage: string;
    fileImage: string;
    machineId: string;
    price: number;
    discount: number;
    soldout: number;
    id: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCategoryProductAPIResponse(json: string): CategoryProductAPIResponse {
        return JSON.parse(json);
    }

    public static categoryProductAPIResponseToJson(value: CategoryProductAPIResponse): string {
        return JSON.stringify(value);
    }
}
