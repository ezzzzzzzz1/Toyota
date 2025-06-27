<template>
  <div class="row g-4">
    <!-- Select Filters -->
    <div
      v-for="filter in filteredSelectFilters"
      :key="filter.id"
      class="col-12 col-md-4"
    >
      <div class="card p-3 shadow">
        <h5 class="card-title">{{ filter.name }}</h5>
        <div class="d-flex flex-wrap mt-3">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              :name="filter.slug"
              :id="`filter-${filter.slug}-clear`"
              :value="null"
              v-model="selectedFilters[filter.slug]"
            />
            <label class="form-check-label text-danger" :for="`filter-${filter.slug}-clear`">
              Clear
            </label>
          </div>
          <div
            v-for="value in filter.values"
            :key="value.fields.id"
            class="form-check form-check-inline"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="filter.slug"
              :id="`filter-${filter.slug}-${value.fields.id}`"
              :value="value.fields.value"
              v-model="selectedFilters[filter.slug]"
            />
            <label class="form-check-label" :for="`filter-${filter.slug}-${value.fields.id}`">
              {{ value.fields.name }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Numeric Filter (Load Capacity) -->
    <div class="col-12 col-md-4">
      <div class="card p-3 shadow">
        <h5 class="card-title">Load Capacity</h5>
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
