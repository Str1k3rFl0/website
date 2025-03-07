<script lang="ts">
    import { cars } from '../store/carsStore.ts';
    import { searchVehicles } from '../utils/searchVehicles.ts';
    import CarCard from "../components/CarCard.svelte";
    import Navbar from '../components/Navbar.svelte';
    import AddCarForm from '../components/AddCarForm.svelte';
    import SearchBar from '../components/SearchBar.svelte';
    import FilterRange from '../components/FilterRange.svelte';
    import SortNames from '../components/SortNames.svelte';

    let currentPage: string = 'home';

    const setCurrentPage = (page: string): void => {
        currentPage = page;
    }

    let searchQuery = "";
    let filteredCars = $cars;
    let min = 0;
    let max = 0;
    let minValue = 0;
    let maxValue = 0;
    let sortOrder = "asc";

    // If there are cars in the sotre, we calculate the maximum price
    // If there are no cars, we set the max value to 0
    $: if ($cars.length > 0)
    {
        max = Math.max(...$cars.map(car => parseInt(car.price.replace(/[^0-9]/g, ''))));
    }
    else
    {
        max = 0;
    }

    $: maxValue = max;

    // Update sorting order
    const setSortOrder = (order: string) => { sortOrder = order; };

    // !! Use reactive block to update the filter search !!
    $: {
        let items = [...$cars];

        if (searchQuery.trim())
        {
            items = searchVehicles(items, searchQuery);
        }
        
        if (min !== 0 || max !== Infinity)
        {
            items = items.filter(item => {
                let price = parseInt(item.price.replace(/[^0-9]/g, ''));
                return price >= minValue && price <= maxValue;
            });
        }

        items.sort((a, b) => {
            if (sortOrder === "asc") { return a.name.localeCompare(b.name); }
            else { return b.name.localeCompare(a.name); }
        })

        filteredCars = items;
    }
</script>

<svelte:head><title>Cedonia Luxury Showroom</title></svelte:head>
<Navbar setCurrentPage={setCurrentPage}/>
<SearchBar bind:searchQuery />
<FilterRange {min} {max} bind:minValue bind:maxValue />
<SortNames bind:sortOrder setSortOrder={setSortOrder} />

<div class="main-content">
    {#if currentPage === 'home'}
        <section class="welcome-section">
            <h1>Welcome to Cedonia Luxury Showroom</h1>
            <p>Discover your perfect vehicle from our extensive collection of exclusive luxury cars, designed to offer unmatched performance and elegance.</p>
            <p>At Cedonia, we offer an exceptional selection of high-end automobiles, tailored to meet your desires for comfort, style, and precision engineering. Explore the world of automotive luxury like never before.</p>
        </section>

        <section class="car-showcase">
            <div class="car-grid">
                
                {#if filteredCars.length > 0}
                    {#each filteredCars as car (car.name)}
                        <CarCard 
                            category={car.category}
                            name={car.name}
                            specs={car.specs}
                            price={car.price}
                            images={car.images}
                        />
                    {/each}
                {:else}
                    <p>No cars found</p>
                {/if}

            </div>
        </section>

        <a href="/#" on:click={() => setCurrentPage('addCar')} class="floating-button" title="Add Car">
            <span>+</span>
        </a>

    {/if}

    {#if currentPage === 'addCar'}
        <AddCarForm />
    {/if}
</div>

<style>
    .main-content
    {
        margin-left: 300px;
        padding: 40px;
        max-width: 1200px;
    }

    .welcome-section
    {
        background-color: white;
        border-radius: 15px;
        padding: 60px;
        margin-bottom: 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .welcome-section::before
    {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(90deg, #1565c0, rgb(153, 221, 255));
    }

    .welcome-section h1
    {
        color: #1565c0;
        margin-bottom: 30px;
        font-size: 2.8em;
        font-weight: 600;
        letter-spacing: 0.5px;
        line-height: 1.2;
        position: relative;
        text-align: center;
    }

    .welcome-section p
    {
        color: #2c3e50;
        font-size: 1.1em;
        line-height: 1.8;
        margin-bottom: 25px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    .welcome-section p:last-child
    {
        margin-bottom: 0;
    }

    .car-showcase
    {
        margin-top: 40px;
    }

    .car-grid
    {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        padding: 20px 0;
    }

    .floating-button
    {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #007BFF;
        color: white;
        font-size: 30px;
        font-weight: bold;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        transition: background-color 0.3 ease, transform 0.2 ease;
    }

    .floating-button:hover
    {
        background-color: #0056b3;
        transform: scale(1.1);
    }
</style>