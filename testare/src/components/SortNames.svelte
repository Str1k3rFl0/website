<script lang="ts">
    export let sortOrder: string = "asc";
    export let setSortOrder: (order: string) => void;
</script>

<div class="sort-container">
    <label for="sortSelect" class="sort-label">Sort by Name:</label>
    <select id="sortSelect" bind:value={sortOrder} on:change={() => setSortOrder(sortOrder)} class="sort-select">
        <option value="asc">Ascending (A-Z)</option>
        <option value="desc">Descending</option>
    </select>
</div>

<style>
    .sort-container
    {
        position: fixed;
        top: 520px;
        left: 20px;
        width: 14em;
        background: #ffffff;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0e0e0;
    }

    .sort-label {
        display: block;
        font-size: 0.9em;
        font-weight: 500;
        color: #333;
        margin-bottom: 0.5em;
    }

    .sort-select {
        width: 100%;
        padding: 0.5em;
        font-size: 0.9em;
        color: #333;
        background: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .sort-select:hover
    {
        border-color: #1565c0;
    }

    .sort-select:focus 
    {
        border-color: #1565c0;
        box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
    }

    .sort-select option
    {
        padding: 0.5em;
        background: #ffffff;
    }
</style>