<template>
  <div>
    <form>
      <div class="form-group">
        <label for="title">Product Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Product title"
          v-model="form.title"
        />
        <span class="text-danger" v-if="errors.title">{{
          errors.title[0]
        }}</span>
      </div>
      <div class="form-group">
        <label for="price">Product Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="Product price"
          step="0.01"
          v-model="form.price"
        />
        <span class="text-danger" v-if="errors.price">{{
          errors.price[0]
        }}</span>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Upload product image</span>
        </div>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile01"
            @change="updatePicture"
            accept="image/*"
          />
          <label class="custom-file-label" for="inputGroupFile01">{{
            imageName
          }}</label>
        </div>
      </div>
      <p class="text-danger" v-if="errors.image">{{ errors.image[0] }}</p>
      <div class="form-group">
        <label for="productDescription">Product description</label>
        <textarea
          class="form-control"
          id="productDescription"
          rows="3"
          v-model="form.description"
        ></textarea>
        <span class="text-danger" v-if="errors.description">{{
          errors.description[0]
        }}</span>
      </div>
      <input
        type="submit"
        value="Store"
        @click.prevent="storeProduct"
        class="btn btn-success"
      />
    </form>
  </div>
</template>
<script>
import Product from "../apis/Product";
export default {
  data() {
    return {
      form: {
        title: "",
        price: 0,
        description: "",
        image: "",
      },
      imageName: "Choose File",
      errors: {},
    };
  },
  methods: {
    updatePicture(e) {
      this.form.image = null;
      this.errors.image = null;
      let file = e.target.files[0];
      let fileName = file.name;
      if (file["size"] < 2111775) {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.form.image = reader.result;
        };
        reader.readAsDataURL(file);
        this.imageName = fileName;
      } else {
        this.errors.image = "Maximum allowed file size is 2Mb";
      }
    },
    storeProduct() {
      Product.store(this.form)
        .then((response) => {
          this.$store.commit("PRODUCTS", response.data.products);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
