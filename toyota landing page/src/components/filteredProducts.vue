<template>
  <div class="container my-5">
    <Header />

    <h1
      class="text-center text-black mb-4"
      style="color: #ed1c24; font-size: 1.5rem; text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);"
    >
      RANGES
    </h1>
    <hr style="width: 50px; height: 2px; margin:auto; margin-bottom:1em; color: black;" />

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <!-- Filters and Products -->
    <div v-else>
      <Filters
        :selectFilters="selectFilters"
        :numericFilter="numericFilter"
        :selectedFilters="selectedFilters"
        @reset-filters="resetFilters"
      />
      <productCard :filteredProducts="filteredProducts" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Header from "./Header.vue";
import Filters from "./Filters.vue";
import productCard from "./productCard.vue";
export default {
  components: {
    Header,
    Filters,
    productCard,
  },
  setup() {
    const selectFilters = ref([]);
    const numericFilter = ref({});
    const selectedFilters = ref({
      "usage-intensity": null,
      "transport-distance": null,
      "load-capacity": null,
    });
    const products = ref([]);
    const filteredProducts = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const response = await fetch("/api/v1/products/getJson");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        products.value = result.data || [];
        filteredProducts.value = products.value;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/v1/products/filters");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        selectFilters.value = result.data["Select-Type"] || [];
        numericFilter.value = result.data["Numeric-Type"][0] || {};
      } catch (err) {
        error.value = err.message;
      }
    };

    const applyFilters = () => {
      filteredProducts.value = products.value.filter((product) => {
        const capacityFilter = selectedFilters.value["load-capacity"];
        const productCapacity =
          product.numericTypes?.find((type) => type.slug === "load-capacity")
            ?.value || null;

        return (
          (!selectedFilters.value["usage-intensity"] ||
            product.selectTypes.some(
              (type) =>
                type.slug === "usage-intensity" &&
                type.values.value === selectedFilters.value["usage-intensity"]
            )) &&
          (!selectedFilters.value["transport-distance"] ||
            product.selectTypes.some(
              (type) =>
                type.slug === "transport-distance" &&
                type.values.value === selectedFilters.value["transport-distance"]
            )) &&
          (!capacityFilter || (productCapacity && productCapacity <= capacityFilter))
        );
      });
    };

    const resetFilters = () => {
      selectedFilters.value = {
        "usage-intensity": null,
        "transport-distance": null,
        "load-capacity": null,
      };
      filteredProducts.value = [...products.value];
    };

    watch(selectedFilters, applyFilters, { deep: true });

    onMounted(() => {
      fetchFilters();
      fetchProducts();
    });

    return {
      selectFilters,
      numericFilter,
      selectedFilters,
      products,
      filteredProducts,
      loading,
      error,
      resetFilters,
    };
  },
};
</script>
<style scoped>

</style>