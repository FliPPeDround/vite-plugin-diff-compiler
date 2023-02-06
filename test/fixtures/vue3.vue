<script lang="ts" setup>
// #diff-compiler-start:node
console.log('Hello node')
// #diff-compiler-end:node

// #diff-compiler-start:vue3
console.log('Hello vue3')
// #diff-compiler-end:vue3
</script>

<template>
  <!-- #diff-compiler-start:node -->
  <h1>Node</h1>
  <!-- #diff-compiler-end:node -->
  <!-- #diff-compiler-start:vue3 -->
    <h1>vue3</h1>
  <!-- #diff-compiler-end:vue3 -->
</template>

<style>
/* #diff-compiler-start:node */
h1 {
  color: red;
}
/* #diff-compiler-end:node */
/* #diff-compiler-start:vue3 */
h1 {
  color: blue;
}
/* #diff-compiler-end:vue3 */
</style>
