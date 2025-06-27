<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-light shadow mb-4">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <img src="../assets/Toyotalogo.PNG" alt="Toyota Logo" class="img-fluid" style="height: 80px;" />
        </a>

        <!-- Toggle Button for Mobile View -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link px-3 fw-medium text-dark" href="#">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 fw-medium text-dark" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 fw-medium text-dark" href="#">Training</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 fw-medium text-dark" href="#">About Us</a>
            </li>
            <!-- Search Icon and Get Quote Button -->
            <li class="nav-item d-flex align-items-center">
              <button class="btn btn-light btn-sm me-2">
                <i class="bi bi-search"></i>
              </button>
              <button class="btn btn-danger text-white btn-sm">Get Quote</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

   



  </div>
</template>

  
  <script setup>
  import 'bootstrap-icons/font/bootstrap-icons.css';

  </script>
  
  <style lang="scss" scoped>
  .navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-brand {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
  }
  
  .navbar-brand small {
    font-weight: lighter;
    letter-spacing: 0.05rem;
  }
  
  .nav-link {
    font-size: 1rem;
  }
  </style>
  