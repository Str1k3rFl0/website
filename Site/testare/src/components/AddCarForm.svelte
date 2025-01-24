<script lang="ts">
    import { cars } from '../store/carsStore.ts';

    let category = "Sedan";
    let name = "";
    let specs = "";
    let price = "";
    let image = "";

    let imageFile: File | null = null;
    let imagePreview = "";

    const addCar = () => {
        const finalImage = imageFile ? imagePreview : image;
        
        const newCar = 
        {
            category,
            name,
            specs: specs.split(","),
            price,
            image: finalImage,
        };

        cars.update(currentCars => [newCar, ...currentCars]);

        category = "Sedan";
        name = "";
        specs = "";
        price = "";
        image = "";
        imageFile = null;
        imagePreview = "";
    }

    const handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files ? input.files[0] : null;

        if (file)
        {
            imageFile = file;
            
            const reader = new FileReader();
            reader.onloadend = () => {
                imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
</script>

<div class="form-container">
    <h2>Add a new car</h2>
    <form on:submit|preventDefault={addCar}> 
        <label>
            Category:
            <select bind:value={category}>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
            </select>
        </label>

        <label>
            Name:
            <input type="text" bind:value={name} placeholder="Enter the car name" required />
        </label>

        <label>
            Specifications (split with ,):
            <input type="text" bind:value={specs} placeholder="e.g: 2024, Automatic, V6, 300 HP" required />
        </label>

        <label>
            Price:
            <input type="text" bind:value={price} placeholder="e.g: $79,000" required />
        </label>

        <label>
            Image
            <input type="file" accept="image/*" on:change={handleFileChange} />
        </label>

        {#if imagePreview}
            <div class="image-preview">
                <img src={imagePreview} alt="" width="200" />
            </div>
        {/if}

        <button type="submit">Add Car!</button>
    </form>
</div>

<style>
    .form-container 
    {
        margin: 20px;
    }

    form
     {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label
     {
        display: flex;
        flex-direction: column;
        font-weight: bold;
    }

    input, select, button
     {
        padding: 10px;
        font-size: 16px;
    }
</style>