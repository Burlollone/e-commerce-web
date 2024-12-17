<script setup lang="ts">


</script>
<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </header>
</template>

<style>

nav {
  padding: 5px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-soft);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  z-index: 1;
}


</style>