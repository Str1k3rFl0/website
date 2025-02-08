<script lang="ts">
    import { cars } from '../store/carsStore.ts';

    let category = "Sedan";
    let name = "";
    let specs = "";
    let price = "";
    let image = "";

    let imageFile: File | null = null;
    let imagePreview = "";
    let imageInput: HTMLInputElement;

    const addCar = (event:SubmitEvent & { target: HTMLFormElement }) => {
        const file = imageInput.files[0];
        const image = "/images/" + file.name;
        const newCar = {
            category,
            name,
            specs: specs.split(","),
            price,
            image,
        };

        cars.update(currentCars => [newCar, ...currentCars]);
        event.target.reset();
        category = "Sedan";
    }

    const handleFileChange = (event: Event) => {
        const file = imageInput.files[0];
        if (file)
        {
            const reader = new FileReader();
            reader.onloadend = () => {
                imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    $: console.log(imageFile);
</script>

<div class="form-container">
    <h2>Add a new car</h2>
    <form on:submit|preventDefault={addCar}> 
        <label>
            Category:
            <select bind:value={category}>
                <option selected value="Sedan">Sedan</option>
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
            <input bind:this={imageInput} type="file" accept="image/*" on:change={handleFileChange} />
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
        max-width: 500px;
        margin: 40px auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4x 10px rgba(0, 0, 0, 0.1);
    }

    h2
    {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
        font-size: 24px;
    }

    form
    {
        display: flex;
        flex-directioN: column;
        gap: 15px;
    }

    label
    {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        color: #555;
    }

    input, select, button
    {
        padding: 12px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3 ease;
    }

    input:focus, select:focus
    {
        border-color: #007bff;
    }

    button
    {
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3 ease;
    }

    button:hover
    {
        background-color: #0056b3;
    }

    .image-preview
    {
        text-align: center;
        margin-top: 10px;
    }

    .image-preview img
    {
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
</style>