<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container-fluid mt-3">
      <b-card title="" header-tag="header" footer-tag="footer">
        <template #header>
          <h2>Products CRUD</h2>
        </template>
        <router-view />
        <template #footer>
          <!-- pagination -->
          <small>Copyright &copy; 2020</small>
        </template>
      </b-card>
    </div>
  </div>
</template>
<script>
import NavBar from "./components/Navbar";
import Product from "./apis/Product";
export default {
  components: {
    NavBar,
  },
  mounted() {
    this.$store.commit("LOGIN", !!localStorage.getItem("token"));
    Product.index().then((response) => {
      this.$store.commit("PRODUCTS", response.data.products);
    });
  },
};
</script>
