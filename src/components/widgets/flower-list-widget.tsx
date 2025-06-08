import { FC } from "react";
import { Flower } from "../../entities/flower";
import { FlowerCard } from "../partials/ui/flower/flower-card";


export interface IFlowerListWidgetProps {
    label?: string;
    flowers: Flower[];
    onUpdate?: (flower: Flower) => void;
    onDelete?: (flower: Flower) => void;
    onPurchase?: (flower: Flower, quantity: number) => void;
    buttonText?: string;
    deleteButtonText?: string;
    isPurchasing?: boolean;
}

export const FlowerListWidget: FC<IFlowerListWidgetProps> = ({
    flowers,
    label,
    onUpdate,
    onDelete,
    onPurchase,
    buttonText,
    deleteButtonText,
    isPurchasing
}) => {
    return (
        <div className="flower-list-widget">
            <h2>{label}</h2>
            {flowers.length === 0 ? (
                <p className="empty-list-message">Нет цветов в этой категории</p>
            ) : (
                flowers.map((flower) => (
                    <FlowerCard
                        flower={flower}
                        onStateChange={() => onUpdate?.(flower)}
                        onDelete={() => onDelete?.(flower)}
                        onPurchase={onPurchase ? (quantity) => onPurchase(flower, quantity) : undefined}
                        buttonText={buttonText}
                        deleteButtonText={deleteButtonText}
                        isPurchasing={isPurchasing}
                        key={flower.id}
                    />
                ))
            )}
        </div>
    );
};