<script lang="ts">
import { Accordion, AccordionItem } from "@barebone/patterns";

const accordion = new Accordion({ multiple: true, opened: ["1"] });
</script>   

{#each ["1", "2", "3"] as value}
    {@const item = new AccordionItem(accordion, value)}
    <button {...item.headerProps()}>
        Open
    </button>
    <div {...item.panelProps()}>
        {#if item.open}
            Content
        {/if}
    </div>
{/each}
