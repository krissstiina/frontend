import { FC, useEffect, useState } from "react";
import { addToArchive, deleteFlower, findAllFlowers, makeActive } from "../api/flower-api";
import { CreateFlowerForm } from "../components/widgets/ticket-form";
import { Flower } from "../entities/flower";
import { FlowerListWidget } from "../components/widgets/flower-list-widget";

export const HomePage: FC = () => {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [delegId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllFlowers();
                setFlowers(data);
                setIsFetching(false);
            } catch (error) {
                console.error("Ошибка:", error);
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    const handleUpdateFlowers = async () => {
        const updatedFlowers = await findAllFlowers();
        setFlowers(updatedFlowers);
    };

    const onAddToArchive = async (flower: Flower) => {
        await addToArchive(flower.id);
        handleUpdateFlowers();
    };

    const onMakeActive = async (flower: Flower) => {
        await makeActive(flower.id);
        handleUpdateFlowers();
    };

    const onDeleteFlower = async (flower: Flower) => {
        if (window.confirm(`Вы уверены, что хотите удалить цветок "${flower.name}"?`)) {
            setDeletingId(flower.id);
            try {
                await deleteFlower(flower.id);
                setFlowers(prev => prev.filter(f => f.id !== flower.id));
            } catch (error) {
                console.error("Ошибка при удалении цветка:", error);
                alert("Не удалось удалить цветок");
            } finally {
                setDeletingId(null);
            }
        }
    };

    const isDeleting = delegId !== null;

    return (
        <div className="home-page">
            <h1>Управление цветами</h1>
            
            <div className="content-wrapper">
                <div className="main-content">
                    <CreateFlowerForm onFlowerCreated={handleUpdateFlowers} />
                </div>
                
                <div className="side-content">
                    {isFetching ? (
                        <p>Загрузка...</p>
                    ) : (
                        <div className="flower-list-container">
                            <FlowerListWidget
                                label="Цветы в продаже"
                                onUpdate={onAddToArchive}
                                onDelete={onDeleteFlower}
                                buttonText="Добавить в архив"
                                deleteButtonText={isDeleting ? "Удаление..." : "Удалить"}
                                flowers={flowers.filter(t => !t.archived)}
                            />
                            <FlowerListWidget
                                label="Цветы в архиве"
                                onUpdate={onMakeActive}
                                onDelete={onDeleteFlower}
                                buttonText="Вернуть в продажу"
                                deleteButtonText={isDeleting ? "Удаление..." : "Удалить"}
                                flowers={flowers.filter(t => t.archived)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};