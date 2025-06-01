export enum FlowerStatus {
    RESERVED,
    PREPARED,
    DELIVERY,
    SOLD,
    RETURNED,
}

export type Flower = {
    id: number;
    name: string;
    color: string;
    price: number;
    quantity: number;
    status: FlowerStatus;
    archived: boolean
    
};