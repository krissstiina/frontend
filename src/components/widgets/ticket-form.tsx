import { FC, useState, useEffect } from "react";
import { FlowerDto } from "../../dtos/flower-dto";
import { createFlower } from "../../api/flower-api";

interface CreateFlowerFormProps {
    onFlowerCreated: () => void;
}

export const CreateFlowerForm: FC<CreateFlowerFormProps> = ({ onFlowerCreated }) => {
    const [flowerDto, setFlowerDto] = useState<FlowerDto>({
        name: "",
        color: "",
        price: 0,
        quantity: 0,
        status: "PREPARED"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statuses, setStatuses] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/flowers/statuses")
            .then(res => res.json())
            .then(setStatuses)
            .catch(() => setStatuses(["PREPARED", "SOLD", "RESERVED", "DELIVERY", "RETURNED"]));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFlowerDto((prev) => ({
            ...prev,
            [name]: name === "price" || name === "quantity" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createFlower(flowerDto);
            setFlowerDto({ name: "", color: "", price: 0, quantity: 0, status: "PREPARED" });
            onFlowerCreated();
        } catch (error) {
            setError("Ошибка при создании цветка. Пожалуйста, проверьте данные и попробуйте снова.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-flower-form">
            <h2>Создать новый цветок</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={flowerDto.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        maxLength={50}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Цвет:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={flowerDto.color}
                        onChange={handleInputChange}
                        required
                        minLength={3}
                        maxLength={30}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена (руб.):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={flowerDto.price || ""}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Количество:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={flowerDto.quantity || ""}
                        onChange={handleInputChange}
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Статус:</label>
                    <select
                        id="status"
                        name="status"
                        value={flowerDto.status}
                        onChange={handleInputChange}
                        required
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status === "PREPARED" && "Готов к продаже"}
                                {status === "SOLD" && "Продан"}
                                {status === "RESERVED" && "Зарезервирован"}
                                {status === "DELIVERY" && "Доставка"}
                                {status === "RETURNED" && "Возврат"}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? (
                        <span className="button-loading">
                            <span className="spinner"></span>
                            Отправка...
                        </span>
                    ) : (
                        "Создать цветок"
                    )}
                </button>
            </form>
        </div>
    );
};