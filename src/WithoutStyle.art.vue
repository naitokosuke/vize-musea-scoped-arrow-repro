<script setup lang="ts">
defineArt("./PressButton.vue", { title: "Without style" });
</script>

<art>
  <variant default name="Arrow">
    <PressButton @press="() => {}" />
  </variant>
</art>
