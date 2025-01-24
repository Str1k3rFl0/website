<script>
    export let setCurrentPage;
</script>

<div class="navbar">
    <a href="/#" on:click={() => setCurrentPage('home')}>Home</a>
    <div class="dropdown">
        <a href="/#" on:click={() => setCurrentPage('cars')}>Cars</a>
        <div class="submenu">
            <a href="/sedan_page" on:click={() => setCurrentPage('sedan')}>Sedan</a>
            <a href="/#" on:click={() => setCurrentPage('SUV')}>SUV</a>
            <a href="/#" on:click={() => setCurrentPage('truck')}>Truck</a>
        </div>
    </div>
    <a href="/#" on:click={() => setCurrentPage('services')}>Services</a>
    <a href="/#" on:click={() => setCurrentPage('contact')}>Contact</a>
</div>

<style>
    .navbar
    {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 20px;
        left: 20px;
        width: 240px;
        background-color: #fff;
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 4x 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .navbar a
    {
        color: #2c3e50;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 8px;
        font-weight: 500;
        transition: all 0.2 ease;
        position: relative;
        display: block;
    }

    .navbar a:hover
    {
        background-color: rgb(153, 221, 255);
        color: #1565c0;
        transform: translateX(15px);
    }

    .dropdown
    {
        position: relative;
        margin: 8px 0;
    }

    .dropdown > a::after
    {
        content: '->';
        position: absolute;
        right: 20px;
        transition: transform 0.2s ease;
    }

    .dropdown:hover > a::after 
    {
        transform: rotate(90deg);
    }

    .submenu
    {
        display: none;
        background-color: white;
        padding: 10px;
        position: absolute;
        left: 255px;
        top: 0;
        width: 200px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 1001;
    }

    .dropdown:hover .submenu
    {
        display: block;
    }

    .submenu a
    {
        background-color: transparent;
        border-radius: 3px;
        margin-bottom: 5px;
    }

    .submenu a:hover
    {
        background-color: rgb(153, 221, 255);
    }
</style>