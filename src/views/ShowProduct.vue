<template>
  <div>
    <div class="row">
      <div class="container" v-if="product[0]">
        <div class="w-100 text-center mb-2">
          <img
            :src="product[0].image"
            :alt="product[0].title"
            style="max-height: 280px"
            class="img-fluid"
          />
        </div>
        <h3>{{ product[0].title }} - {{ product[0].price }} BDT</h3>
        <div class="mt-3">
          {{ product[0].description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    ...mapGetters(["products"]),
  },
  watch: {
    products() {
      this.product = this.products.filter((el) => {
        return el.id == this.$route.params.id;
      });
    },
  },
  mounted() {
    if (this.products[0]) {
      this.product = this.products.filter((el) => {
        return el.id == this.$route.params.id;
      });
    }
  },
};
</script>
