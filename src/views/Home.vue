<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td style="max-width: 350px" v-html="product.description"></td>
          <td style="max-width: 150px">
            <img class="img-fluid" :src="product.image" :alt="product.title" />
          </td>
          <td class="text-center">
            <router-link
              :to="{ name: 'ShowProduct', params: { id: product.id } }"
            >
              <button class="btn btn-info mb-3">View</button>
            </router-link>

            <br />
            <router-link
              v-if="isLoggedIn"
              :to="{ name: 'UpdateProduct', params: { id: product.id } }"
            >
              <button class="btn btn-warning mb-3">Edit</button>
            </router-link>
            <br />
            <button
              v-if="isLoggedIn"
              class="btn btn-danger"
              @click="deleteProduct(product.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Product from "../apis/Product";
export default {
  computed: {
    ...mapGetters(["products"]),
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    deleteProduct(id) {
      Product.delete(id).then((response) => {
        this.$store.commit("PRODUCTS", response.data.products);
      });
    },
  },
};
</script>


