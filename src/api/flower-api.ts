import { FlowerDto } from "../dtos/flower-dto";
import { Flower } from "../entities/flower";
import { http } from "./common";

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