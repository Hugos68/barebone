<script lang="ts">
import { Accordion, AccordionItem } from "@barebone/patterns";
const accordion = new Accordion();
</script>   

<div {...accordion.attributes}>
    {#each ["1", "2", "3"] as value}
        {@const item = new AccordionItem(accordion, { value })}
        <button {...item.accordionHeader.attributes}>
            Open
        </button>
        <div {...item.accordionPanel.attributes}>
            {#if item.open}
                <input />
                <button>Hello</button>
            {/if}
        </div>
    {/each}
</div>
