import { FC } from "react";
import { Flower } from "../../../../entities/flower";

interface FlowerCardProps {
    flower: Flower;
    onStateChange?: () => void;
    onDelete?: () => void;
    buttonText?: string;
    deleteButtonText?: string;
    isDeleting?: boolean;
}

export const FlowerCard: FC<FlowerCardProps> = ({
    flower,
    onStateChange,
    onDelete,
    buttonText,
    deleteButtonText,
    isDeleting
}) => {
    return (
        <div className="flower-card">
            <div className="flower-card-header">
                <h3>{flower.name}</h3>
                <div className="flower-card-actions">
                    {onStateChange && (
                        <button onClick={onStateChange}>
                            {buttonText}
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="delete-button"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Удаление...' : deleteButtonText}
                        </button>
                    )}
                </div>
            </div>
            <p>Цвет: {flower.color}</p>
            <p>Цена: {flower.price} руб.</p>
            <p>Количество: {flower.quantity}</p>
            <p>Статус: {flower.status}</p>
            <p>Архив: {flower.archived ? "Да" : "Нет"}</p>
        </div>
    );
};