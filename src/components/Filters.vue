<template>
  <div class="row g-4">
    <!-- Select Filters -->
    <div
      v-for="filter in filteredSelectFilters"
      :key="filter.id"
      class="col-12 col-md-4"
    >
      <div class="card p-3 shadow">
        <h5 class="card-title text-center">{{ filter.name }}</h5>
        <div class="d-flex justify-content-around mt-3 flex-wrap">
          <!-- Filter Options -->
          <button
            v-for="value in filter.values"
            :key="value.fields.id"
            class="btn btn-filter"
            :class="{ 'btn-selected': selectedFilters[filter.slug] === value.fields.value }"
            @click="selectedFilters[filter.slug] = value.fields.value"
          >
            {{ value.fields.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Numeric Filter (Load Capacity) -->
    <div class="col-12 col-md-4">
      <div class="card p-3 shadow">
        <h5 class="card-title text-center">Load Capacity</h5>
        <input
          type="range"
          class="form-range mt-3"
          :min="numericFilter.from"
          :max="numericFilter.to"
          v-model="selectedFilters['load-capacity']"
        />
        <div class="d-flex justify-content-between mt-2">
          <span>{{ numericFilter.from }} kg</span>
          <span>{{ numericFilter.to }} kg</span>
        </div>
        <div class="text-center mt-2">
          Selected Capacity: {{ selectedFilters['load-capacity'] || numericFilter.from }} kg
        </div>
        <button
          class="btn btn-outline-danger btn-sm w-100 mt-2"
          @click="selectedFilters['load-capacity'] = null"
        >
          Reset Capacity
        </button>
      </div>
    </div>

    <!-- Reset All Filters -->
    <div class="text-center mt-4">
      <button class="btn btn-danger" @click="$emit('reset-filters')">
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFilters: Array,
    numericFilter: Object,
    selectedFilters: Object,
  },
  computed: {
    filteredSelectFilters() {
      return this.selectFilters.filter((filter) => filter.name !== "Power Type");
    },
  },
};
</script>

<style scoped>
/* Button Styling */
.btn-filter {
  padding: 0.5rem 1rem; /* Adjust padding for size consistency */
  margin: 0.5rem; /* Add spacing between buttons */
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f8f9fa;
  color: #000;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-filter:hover {
  background-color: #ed1c24; /* Toyota red */
  color: #fff;
}

.btn-selected {
  background-color: #ed1c24; 
  color: #fff;
  font-weight: bold;
}

.flex-wrap > .btn-filter {
  flex: 1 1 auto; 
  max-width: 45%; 
  text-align: center;
}
</style>
