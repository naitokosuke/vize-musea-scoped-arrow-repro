<script setup lang="ts">
defineArt("./PressButton.vue", { title: "With scoped style" });
</script>

<style scoped>
button {
  padding: 8px;
}
</style>

<art>
  <variant default name="Arrow">
    <PressButton @press="() => {}" />
  </variant>
</art>
