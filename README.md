# vize-musea-scoped-arrow-repro

Minimal reproduction for a bug in [vize](https://github.com/ubugeeei-prod/vize)'s Musea (`@vizejs/vite-plugin-musea`).

In an art file with `<style scoped>`, an arrow function in an attribute breaks the variant's compilation. The same art file without the style renders.

## Steps

```sh
pnpm install
pnpm dev
```

Open `http://localhost:5173/__musea__` and look at the two art files in [`src/`](./src):

| Art file | Result |
| --- | --- |
| [`WithScopedStyle.art.vue`](./src/WithScopedStyle.art.vue) | fails to compile |
| [`WithoutStyle.art.vue`](./src/WithoutStyle.art.vue) | renders |

```vue
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
```

`WithoutStyle.art.vue` is the same without the `<style scoped>` block.

## Expected

Both render.

## Actual

`data-v-xxxxxxxx` stands for the scope id, which is a hash of the art file's absolute path and so differs on every machine.

```
Failed to compile <art> variant "Arrow" in .../src/WithScopedStyle.art.vue:
Template compilation errors: [CompilerError { code: InvalidExpression, message: "Error parsing JavaScript expression: Empty parenthesized expression", loc: Some(SourceLocation { start: Position { offset: 47, line: 1, column: 48 }, end: Position { offset: 71, line: 1, column: 72 }, source: "() = data-v-xxxxxxxx> {}" }) }]
```

## Notes

- With a scoped style, [`art-processing.ts`](https://github.com/ubugeeei-prod/vize/blob/v0.476.0/npm/builder/vite-musea/src/plugin/art-processing.ts#L159) stamps the scope attribute into each variant's template.
- It does so with [`stampScopeAttribute`](https://github.com/ubugeeei-prod/vize/blob/v0.476.0/npm/builder/vite-musea/src/art-style.ts#L8-L9), using `/<([A-Za-z][\w:.-]*)([^<>]*?)>/g`.
- That pattern ends a start tag at the first `>`, even inside a quoted attribute value, so the attribute lands in the middle of `=>`.
- Writing the handler as `function () {}` (no `>`) avoids it.

Related: ubugeeei-prod/vize#7123 (closed), which made art `<style scoped>` scoped.

## Environment

vize / @vizejs/vite-plugin / @vizejs/vite-plugin-musea 0.476.0, vue 3.5.44, vite 8.3.4, Node v26.10.0, pnpm 12.9.0, macOS (arm64)
