<script lang="ts">
    export let onSearch;
    let searchQuery = "";

    function handleInput(event)
    {
        searchQuery = event.target.value;
        onSearch(searchQuery);
    }
</script>

<div class="search-wrapper">
    <div class="search-container">
        <input
            type="text"
            placeholder="Search any cars..."
            bind:value={searchQuery}
            on:input={handleInput}
        />
    </div>
</div>

<style>
    .search-wrapper
    {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 20px;
        height: auto;
    }

    .search-container
    {
        width: 10;
        top: 270px;
        max-width: 400px;
        position: absolute;
        z-index: 1000;
    }

    input[type="text"]
    {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    input[type="text"]:focus
    {
        border-color: #1565c0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        outline: none;
    }
</style>