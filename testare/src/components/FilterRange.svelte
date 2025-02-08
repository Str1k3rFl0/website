<script lang="ts">
    export let min = 0;
    export let max = 100000;
    export let minValue = 0;
    export let maxValue = max;

    // Lambda Functions to update the minValue and maxValue
    // when user interacts with the min and max price input.
    // Because the price have ',' between numbers (e.g., $90,000)
    // we remove any non-numeric characters
    const updateMin = (event: Event) => {
        minValue = parseInt((event.target as HTMLInputElement).value.replace(/[^0-9]/g, ''));
    };

    const updateMax = (event: Event) => {
        maxValue = parseInt((event.target as HTMLInputElement).value.replace(/[^0-9]/g, ''));
    };

    // Update the price
    $: maxValue = Math.min(maxValue, max);
</script>

<div class="filter-container">
    <label for="minRange" class="filter-label">Price Range:</label>
    <div class="range-inputs">
        <input id="minRange" type="range" min={min} max={max} bind:value={minValue} on:input={updateMin} class="range-slider" />
        <input id="maxRange" type="range" min={min} max={max} bind:value={maxValue} on:input={updateMax} class="range-slider" />
    </div>
    <div class="range-values">
        <span>Min: ${minValue}</span>
        <span>Max: ${maxValue}</span>
    </div>
</div>

<style>
    .filter-container {
        width: 13em;
        top: 340px;
        max-width: 400px;
        position: fixed;
        z-index: 1000;
        left: 20px;
        background: #ffffff;
        padding: 1.5em;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0e0e0;
    }

    .filter-label {
        display: block;
        font-size: 1em;
        font-weight: 500;
        color: #333;
        margin-bottom: 1em;
    }

    .range-inputs {
        display: flex;
        flex-direction: column;
        gap: 1.2em;
    }

    .range-slider {
        width: 100%;
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: #e0e0e0;
        border-radius: 3px;
        outline: none;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .range-slider:hover {
        opacity: 1;
    }

    .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #1565c0;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .range-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #1565c0;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .range-values {
        display: flex;
        justify-content: space-between;
        margin-top: 1.2em;
        font-size: 0.9em;
        color: #555;
    }
</style>