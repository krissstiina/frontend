export enum FlowerStatus {
    PREPARED = "Готов к продаже",
    SOLD = "Продан"
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