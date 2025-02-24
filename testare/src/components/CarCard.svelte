<script lang="ts">
    export let category;
    export let name;
    export let specs;
    export let price;
    export let images: string[];

    let currentImageIndex = 0;

    const nextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    const prevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    }

    $: slug = name.toLowerCase().replace(/\s+/g, '-');
</script>

<div class="car-card">
    {#if images.length > 0}
        <div class="car-image">
            <img src={images[currentImageIndex]} alt={category} width="200" />
            {#if images.length > 1}
                <button class="nav-button prev" on:click={prevImage}>‹</button>
                <button class="nav-button next" on:click={nextImage}>›</button>
            {/if}
        </div>
    {/if}
    <div class="car-details">
        <div class="car-category">{category}</div>
        <h3 class="car-name">{name}</h3>
        <div class="car-specs">
            {#each specs as spec}
                <span class="spec-item">{spec}</span>
            {/each}
        </div>
        <div class="car-price">{price}</div>
        <a href="/car/{slug}" class="view-details">View Details</a>
    </div>
</div>

<style>
    .car-card
    {
        flex: 1;
        min-width: 300px;
        max-width: calc(33.333% - 20px);
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .car-card:hover
    {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    .car-image
    {
        width: 100%;
        height: 200px;
        background-color: #f8f9fa;
        position: relative;
        overflow: hidden;
    }

    .car-image img
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .car-card:hover .car-image img
    {
        transform: scale(1.05);
    }

    .car-details
    {
        padding: 25px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .car-category
    {
        font-size: 0.9em;
        color: #1565c0;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .car-name
    {
        font-size: 1.5em;
        color: #2c3e50;
        font-weight: 600;
        margin: 0;
    }

    .car-specs
    {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .spec-item
    {
        flex: 1;
        min-width: calc(50% - 8px);
        font-size: 0.9em;
        color: #64748b;
    }

    .car-price
    {
        font-size: 1.2em;
        color: #1565c0;
        font-weight: 600;
    }

    .view-details
    {
        display: inline-block;
        color: #1565c0;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95em;
        padding: 8px 0;
        position: relative;
        align-self: flex-start;
    }

    .view-details:hover::after
    {
        width: 100%;
    }

    .nav-button
    {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
    }

    .prev
    {
        left: 10px;
    }

    .next
    {
        right: 10px;
    }
</style>