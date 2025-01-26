import { writable } from "svelte/store";

export interface Car
{
    category: string;
    name: string;
    specs: string[];
    price: string;
    image: string | File;
}

const isBrowser = typeof window !== "undefined";
const storedCars = isBrowser ? localStorage.getItem("cars") : null;
export const cars = writable<Car[]>(storedCars ? JSON.parse(storedCars) : []);

if (isBrowser)
{
    cars.subscribe(($cars: Car[]) => {
        const carsToSave = $cars.map(car => {
            if (typeof car.image === "string" && car.image.startsWith("blob:"))
            {
                URL.revokeObjectURL(car.image);
            }

            if (car.image instanceof File)
            {
                const objectURL = URL.createObjectURL(car.image);
                return {
                    ...car,
                    image: objectURL,
                };
            }

            return car;
        });

        localStorage.setItem("cars", JSON.stringify(carsToSave));
    });
}