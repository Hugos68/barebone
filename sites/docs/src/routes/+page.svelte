<script lang="ts">
import { Accordion, AccordionItem } from "@barebone/patterns";

const accordion = new Accordion({ multiple: false, opened: ["1", "2"] });
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
