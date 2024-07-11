<script lang="ts">
import { Accordion, AccordionItem } from "@barebone/patterns";

const accordion = new Accordion({ multiple: true });
</script>   


{#each ["1", "2", "3"] as _}
    {@const item = new AccordionItem(accordion)}
    <button {...item.headerProps()}>
        Open
    </button>
    <div {...item.panelProps()}>
        {#if accordion.isOpen(item)}
            Content
        {/if}
    </div>
{/each}


