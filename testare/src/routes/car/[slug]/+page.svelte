<script lang="ts">
    import { page } from '$app/stores';
    import { cars } from '../../../store/carsStore.ts';
    import Navbar from '../../../components/Navbar.svelte';
    import { goto } from '$app/navigation';

    const setCurrentPage = (page: string): void => {
        if (page === 'home') { goto('/'); }
    };

    $: slug = $page.params.slug;
    $: car = $cars.find(car => car.name.toLowerCase().replace(/\s+/g, '-') === slug);

    let currentImageIndex = 0;

    const nextImage = () => {
        if (car)
        {
            currentImageIndex = (currentImageIndex + 1) % car.images.length;
        }
    };

    const prevImage = () => {
        if (car)
        {
            currentImageIndex = (currentImageIndex - 1 + car.images.length) % car.images.length;
        }
    };
</script>

<svelte:head>
    <title>{car ? car.name : 'Car Not Found'} - Cedonia Luxury Showroom</title>
</svelte:head>

<Navbar setCurrentPage={setCurrentPage}/>

{#if car}
    <div class="car-detail-page">
        <div class="car-gallery">
            {#if car.images.length > 0}
                <div class="main-image">
                    <img src={car.images[currentImageIndex]} alt={car.name} />
                    {#if car.images.length > 1}
                        <button class="nav-button prev" on:click={prevImage}>‹</button>
                        <button class="nav-button next" on:click={nextImage}>›</button>
                    {/if}
                </div>
                <div class="thumbnail-grid">
                    {#each car.images as image, index}
                        <div 
                            class="thumbnail" 
                            class:active={index === currentImageIndex}
                            on:click={() => currentImageIndex = index}
                        >
                            <img src={image} alt={`${car.name} view ${index + 1}`} />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="car-info">
            <span class="category">{car.category}</span>
            <h1 class="name">{car.name}</h1>
            <div class="price">{car.price}</div>
            
            <div class="specs">
                <h2>Specifications</h2>
                <ul>
                    {#each car.specs as spec}
                        <li>{spec}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
{:else}
    <div class="not-found">
        <h1>Car Not Found</h1>
        <p>Sorry, we couldn't find the car you're looking for.</p>
        <a href="/">Return to Home</a>
    </div>
{/if}


<style>
    .car-detail-page
    {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1rem;
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 2rem;
    }

    .car-gallery
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .main-image 
    {
        position: relative;
        aspect-ratio: 16/9;
        overflow: hidden;
        border-radius: 8px;
    }

    .main-image img 
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .thumbnail-grid 
    {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 0.5rem;
    }

    .thumbnail 
    {
        aspect-ratio: 1;
        cursor: pointer;
        border-radius: 4px;
        overflow: hidden;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .thumbnail.active 
    {
        opacity: 1;
        border: 2px solid #007bff;
    }

    .thumbnail img 
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .car-info 
    {
        padding: 1rem;
    }

    .category 
    {
        font-size: 0.9rem;
        color: #666;
        text-transform: uppercase;
    }

    .name 
    {
        font-size: 2.5rem;
        margin: 0.5rem 0;
    }

    .price 
    {
        font-size: 1.5rem;
        color: #007bff;
        margin: 1rem 0;
    }

    .specs 
    {
        margin-top: 2rem;
    }

    .specs ul 
    {
        list-style: none;
        padding: 0;
    }

    .specs li 
    {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }

    .nav-button 
    {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 1rem;
        cursor: pointer;
        font-size: 2rem;
    }

    .prev { left: 0; }
    .next { right: 0; }

    .not-found 
    {
        text-align: center;
        padding: 4rem 1rem;
    }
</style>