import { writable } from "svelte/store";

export interface Car {
    category: string;
    name: string;
    specs: string[];
    price: string;
    images: string[];
}

const isBrowser = typeof window !== "undefined";

const getStoredCars = (): Car[] => {
    if (!isBrowser) { return []; }

    const storedCars = localStorage.getItem("cars");
    if (!storedCars) { return []; }

    try 
    {
        const parsedCars = JSON.parse(storedCars) as Car[];

        return parsedCars.map(car => ({
            ...car,
            images: Array.isArray(car.images) ? car.images : [],
        }));
    }
    catch (error) 
    {
        console.error("Error parsing stored cars:", error);
        return [];
    }
};

export const cars = writable<Car[]>(getStoredCars());

if (isBrowser) 
{
    cars.subscribe(($cars: Car[]) => {
        const carsToSave = $cars.map(car => {
            const images = car.images.map((image: string) => {
                if (typeof image === "string" && image.startsWith("blob:")) 
                {
                    URL.revokeObjectURL(image);
                }
                return image;
            });

            return {
                ...car,
                images,
            };
        });

        localStorage.setItem("cars", JSON.stringify(carsToSave));
    });
}