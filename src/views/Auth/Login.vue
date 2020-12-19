<template>
  <div>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-8 mt-4">
          <div class="card">
            <div class="card-header">
              <h4>Login</h4>
            </div>
            <div class="card-body">
              <div class="alert alert-danger" v-if="errors.error">
                {{ errors.error[0] }}
              </div>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="email-group"
                  label="Email address:"
                  label-for="email"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="password-group"
                  label="Password:"
                  label-for="password-label"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    placeholder="Enter password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <div class="div text-right">
                  <b-button type="submit" variant="primary">Submit</b-button>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../apis/User";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      User.login(this.form)
        .then((response) => {
          this.$store.commit("LOGIN", true);
          localStorage.setItem("token", response.data);
          this.$router.push({ name: "Home" });
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
        });
    },
  },
};
</script>