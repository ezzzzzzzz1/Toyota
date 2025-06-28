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

        <!-- Display Selected Filters -->
        <div v-if="selectedFilters[filter.slug]" class="mt-3">
          <div
            class="selected-filter d-flex align-items-center justify-content-between px-3 py-2 rounded bg-danger text-white"
          >
            <span>{{ selectedFilterName(filter.slug) }}</span>
            <button
              class="btn-close btn-close-white"
              aria-label="Remove"
              @click="removeFilter(filter.slug)"
            ></button>
          </div>
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
        <div v-if="selectedFilters['load-capacity']" class="mt-3">
          <div
            class="selected-filter d-flex align-items-center justify-content-between px-3 py-2 rounded bg-danger text-white"
          >
            <span>
              Selected Capacity: {{ selectedFilters['load-capacity'] || numericFilter.from }} kg
            </span>
            <button
              class="btn-close btn-close-white"
              aria-label="Remove"
              @click="selectedFilters['load-capacity'] = null"
            ></button>
          </div>
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
  methods: {
    selectedFilterName(slug) {
      const filter = this.filteredSelectFilters.find(
        (f) => f.slug === slug
      );
      const selectedValue = this.selectedFilters[slug];
      const value = filter?.values.find(
        (v) => v.fields.value === selectedValue
      );
      return value?.fields.name || "";
    },
    removeFilter(slug) {
      this.selectedFilters[slug] = null;
    },
  },
};
</script>

<style scoped>
/* Button Styling */
.btn-filter {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f8f9fa;
  color: #000;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-filter:hover {
  background-color: #ed1c24;
  color: #fff;
}

.btn-selected {
  background-color: #ed1c24;
  color: #fff;
  font-weight: bold;
}

/* Selected Filter Styling */
.selected-filter {
  font-size: 0.9rem;
  border-radius: 20px;
}

/* Close Button Styling */
.btn-close-white {
  filter: invert(1);
}
</style>
