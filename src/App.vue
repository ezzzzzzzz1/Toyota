<template>
  <div class="container my-5">
    <filterProduct />
    <RouterView />
  </div>
</template>

<script>
import filterProduct from "./components/filteredProducts.vue";

export default {
  components: {
    
    filterProduct
  },
};
</script>