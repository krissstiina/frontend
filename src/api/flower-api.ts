import { FlowerDto } from "../dtos/flower-dto";
import { Flower, FlowerStatus } from "../entities/flower";
import { http } from "./common";

let flowers: Flower[] = [
    {
        id: 1,
        name: 'Роза красная',
        color: 'розовый',
        price: 350,
        quantity: 10,
        status: FlowerStatus.SOLD,
        archived: false,
    },
    {
        id: 2,
        name: 'Орхидея',
        color: 'белый',
        price: 450,
        quantity: 1,
        status: FlowerStatus.PREPARED,
        archived: false,
    },
    {
        id: 3,
        name: 'Ромашка',
        color: 'белый',
        price: 350,
        quantity: 10,
        status: FlowerStatus.PREPARED,
        archived: false,
    },
];

export const createFlower = async(flowerDto:FlowerDto) => {
    const data = await http.post("/api/flowers",{
        ...flowerDto
    });
    return data.data;
}

export const findAllFlowers = async(): Promise<Flower[]> => {
    const data = await http.get("/api/flowers")

    return data.data;
};

export const addToArchive = async (id: number): Promise<void> => {
    const data = await http.patch("/api/flowers/add/" + id);
    return data.data;
};

export const makeActive = async (id: number): Promise<void> => {
    const data = await http.patch("/api/flowers/remove/" + id);
    return data.data;
};

export const deleteFlower = async (id: number): Promise<void> => {
    const data = await http.delete("/api/flowers/"+ id);
    return data.data;
}

export const purchaseFlower = async (id: number, quantity: number): Promise<Flower> => {
    const data = await http.post(`/api/flowers/${id}/purchase`, null, {
        params: { quantity }
    });
    return data.data;
};

