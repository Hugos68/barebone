<script lang="ts">
import { Accordion, AccordionItem } from "@barebone/patterns";

const accordion = new Accordion();
</script>   

{#each ["1", "2", "3"] as value}
    {@const item = new AccordionItem(accordion, value)}
    <button {...item.header()}>
        Open
    </button>
    <div {...item.panel()}>
        {#if item.open}
            <input />
            <button>Hello</button>
        {/if}
    </div>
{/each}
