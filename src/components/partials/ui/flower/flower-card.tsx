import { FC, useState } from "react";
import { Flower } from "../../../../entities/flower";

interface FlowerCardProps {
    flower: Flower;
    onStateChange?: () => void;
    onDelete?: () => void;
    onPurchase?: (quantity: number) => void;
    buttonText?: string;
    deleteButtonText?: string;
    isDeleting?: boolean;
    isPurchasing?: boolean;
}

export const FlowerCard: FC<FlowerCardProps> = ({
    flower,
    onStateChange,
    onDelete,
    onPurchase,
    buttonText,
    deleteButtonText,
    isDeleting,
    isPurchasing
}) => {
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    const getStatusInRussian = (status: string) => {
        switch (status) {
            case "PREPARED":
                return "Готов к продаже";
            case "SOLD":
                return "Продан";
            default:
                return status;
        }
    };

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
            <p>Статус: {getStatusInRussian(flower.status)}</p>
            <p>Архив: {flower.archived ? "Да" : "Нет"}</p>
            
            {!flower.archived && flower.quantity > 0 && onPurchase && (
                <div className="purchase-section">
                    <input
                        type="number"
                        min="1"
                        max={flower.quantity}
                        value={purchaseQuantity}
                        onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                        disabled={isPurchasing}
                    />
                    <button
                        onClick={() => onPurchase(purchaseQuantity)}
                        disabled={isPurchasing || purchaseQuantity < 1 || purchaseQuantity > flower.quantity}
                    >
                        {isPurchasing ? 'Покупка...' : 'Купить'}
                    </button>
                </div>
            )}
        </div>
    );
};