<title>Cedonia Luxury Showroom</title>

<script>
    import CarCard from "./cars/CarCard.svelte";

    const sedanSpecs = ["2024", "Automatic", "Hybrid", "644 HP"];
    const suvSpecs = ["2024", "Automatic", "V8", "523 HP"];
    const truckSpecs = ["2024", "Automatic", "V8", "420 HP"];
</script>

<body>
    <div class="navbar">
        <a href="/">Home</a>
        <div class="dropdown">
            <a href="/Cars">Cars</a>
            <div class="submenu">
                <a href="/Cars/Sedan">Sedan</a>
                <a href="/Cars/SUV">SUV</a>
                <a href="/Cars/Truck">Truck</a>
            </div>
        </div>
        <a href="/Services">Services</a>
        <a href="/Contact">Contact</a>
    </div>   

    <div class="main-content">
        <section class="welcome-section">
            <h1>Welcome to Cedonia Luxury Showroom</h1>
            <p>Discover your perfect vehicle from our extensive collection of exclusive luxury cars, designed to offer unmatched performance and elegance.</p>
            <p>At Cedonia, we offer an exceptional selection of high-end automobiles, tailored to meet your desires for comfort, style, and precision engineering. Explore the world of automotive luxury like never before.</p>
        </section>

        <section class="car-showcase">
            <div class="car-grid">
                <CarCard 
                    category="Sedan"
                    name="Mercedes-Benz S-class"
                    specs={sedanSpecs}
                    price="$87,000"
                    image="/src/images/mercedes_sclass.jpg"
                />

                <CarCard
                    category="SUV"
                    name="BMW X7"
                    specs={suvSpecs}
                    price="$95,000"
                    image="/src/images/BMWX7.jpg"
                />

                <CarCard
                    category="Truck"
                    name="GMC Sierra Denali"
                    specs={truckSpecs}
                    price="$85,000"
                    image="/src/images/GMCSierra.jpg"
                />

            </div>
        </section>
    </div>
</body>

<style>
    body
    {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
    }

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