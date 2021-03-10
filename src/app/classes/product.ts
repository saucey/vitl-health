export class Product {
    id: number;
    name: string;
    grouping: string;
    plans: Array<Plan>;
}

export class Plan {
    id: number;
    name: string;
    product: Product;
    rrp: number;
}
