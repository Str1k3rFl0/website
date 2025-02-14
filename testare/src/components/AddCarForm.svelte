<script lang="ts">
    import { cars } from '../store/carsStore.ts';

    let category = "Sedan";
    let name = "";
    let specs = "";
    let price = "";
    let images: File[] = [];
    let imagePreviews: string[] = [];
    let imageInput: HTMLInputElement;

    //let imageFile: File | null = null;
    //let imagePreview = "";
    //let imageInput: HTMLInputElement;

const addCar = (event: SubmitEvent & { target: HTMLFormElement }) => {
    if (images.length === 0)
    {
        alert("Please select at least one image!");
        return;
    }

    const imagePaths: string[] = [];
    images.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            imagePaths.push(reader.result as string);
            if (imagePaths.length === images.length)
            {
                const newCar = {
                    category,
                    name,
                    specs: specs.split(","),
                    price,
                    images: imagePaths,
                };

                cars.update(currentCars => [newCar, ...currentCars]);

                event.target.reset();
                category = "Sedan";
                name = "";
                specs = "";
                price = "";
                images = [];
                imagePreview = [];
            }
        };
        reader.readAsDataURL(file);
    });
};

const handleFileChange = (event: Event) => {
    const files = imageInput.files;
    if (files) 
    {
        images = [...images, ...Array.from(imageInput.files)];
        imagePreviews = [];

        images.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                imagePreviews = [...imagePreviews, reader.result as string];
            };
            reader.readAsDataURL(file);
        });
    }
};

    $: console.log(images);
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
            <input bind:this={imageInput} type="file" accept="image/*" multiple on:change={handleFileChange} />
        </label>

        {#if imagePreviews.length > 0}
            <div class="image-previews">
                {#each imagePreviews as imagePreview}
                    <div class="image-preview">
                        <img src={imagePreview} alt="Preview" width="200" />
                    </div>
                {/each}
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

    .image-previews
    {
        text-align: center;
        margin-top: 10px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .image-previews img
    {
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
</style>