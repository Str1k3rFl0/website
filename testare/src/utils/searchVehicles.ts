import type { Car } from '../store/carsStore.ts';

export function searchVehicles(carsList: Car[], query: string): Car[]
{
    if (!query)
    {
        return carsList;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filteredCars = carsList.filter(car => {
        const lowerCaseName = car.name.toLowerCase();

        if (lowerCaseName.includes(lowerCaseQuery))
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    return filteredCars;
}