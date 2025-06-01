import { FC } from "react";
import { Flower } from "../../entities/flower";
import { FlowerCard } from "../partials/ui/flower/flower-card";


export interface IFlowerListWidgetProps {
    label?: string;
    flowers: Flower[];
    onUpdate?: (flower: Flower) => void;
    onDelete?: (flower: Flower) => void;
    buttonText?: string;
    deleteButtonText?: string;
}

export const FlowerListWidget: FC<IFlowerListWidgetProps> = ({
    flowers,
    label,
    onUpdate,
    onDelete,
    buttonText,
    deleteButtonText
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
                        buttonText={buttonText}
                        deleteButtonText={deleteButtonText}
                        key={flower.id}
                    />
                ))
            )}
        </div>
    );
};