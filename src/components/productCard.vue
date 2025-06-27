<template>
  <div class="row mt-4 g-4">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <div class="card h-100 text-center shadow border-0 rounded-3">
        <div
          class="card-img-top d-flex align-items-center justify-content-center bg-light"
          style="height: 200px; overflow: hidden;"
        >
          <img
            :src="product.featured_image"
            alt="Product Image"
            class="img-fluid"
            style="max-height: 100%; max-width: 100%; object-fit: contain;"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title text-danger fw-bold">{{ product.name }}</h5>
          <p class="card-text text-muted mb-2">Code: {{ product.code }}</p>
          <p class="card-text text-muted">
            Capacity: {{ product.numericTypes[0]?.value || "N/A" }} lbs
          </p>
          <button
            class="btn btn-danger btn-sm w-50 mt-2"
            style="border-radius: 20px; font-size: 0.85rem;"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filteredProducts: Array,
  },
};
</script>
