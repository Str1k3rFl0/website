<script lang="ts">
    import { cars } from '../../store/carsStore.ts';
    import CarCard from '../../components/CarCard.svelte';
    import Navbar from '../../components/Navbar.svelte';

    let currentPage: strign = 'truck';

    const setCurrentPage = (page: string): void => {
        currentPage = page;
    }

    const filteredCars = $cars.filter(car => car.category === 'Truck');
</script>

<Navbar setCurrentPage={setCurrentPage} />

<div class="main-content">
    {#if currentPage === 'truck'}
        <section class="welcome-section">
            <h1>Cedonia Luxury Showroom - Truck Collection</h1>
            <p>Experience the ultimate in strength and sophistication with our exclusive range of luxury trucks, engineered to combine rugged durability, premium comfort, and unmatched performance.</p>
            <p>At Cedonia, our truck collection offers the perfect blend of power and refinement, designed to handle the toughest tasks while providing a luxurious driving experience. Whether you're conquering worksites or cruising in style, our trucks deliver exceptional capability, advanced technology, and spacious interiors that redefine what it means to drive a truck.</p>
        </section>

        <section class="car-showcase">
            <div class="car-grid">

                {#each filteredCars as car}
                    <CarCard 
                        category={car.category}
                        name={car.name}
                        specs={car.specs}
                        price={car.price}
                        image={car.image}
                    />
                {/each}

            </div>
        </section>
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
</style>