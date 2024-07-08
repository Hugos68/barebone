<script lang="ts">
import { Accordion } from "@barebone/svelte";

const value = $state(["1", "2", "3"] as const);

const accordion = new Accordion<(typeof value)[number]>();
</script>   


{#each value as item}
    <button {...accordion.header(item)}>
        Open
    </button>
    <div {...accordion.panel(item)}>
        {#if accordion.isOpen(item)}
            Content
        {/if}
    </div>
{/each}


