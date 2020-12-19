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
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="name-group"
                  label="Full Name:"
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter name"
                    required
                  ></b-form-input>
                  <span class="text-danger" v-if="errors.name">{{
                    errors.name[0]
                  }}</span>
                </b-form-group>
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
                  <span class="text-danger" v-if="errors.email">{{
                    errors.email[0]
                  }}</span>
                </b-form-group>

                <b-form-group
                  id="password-group"
                  label="Password:"
                  label-for="password"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    placeholder="Enter password"
                    type="password"
                    required
                  ></b-form-input>
                  <span class="text-danger" v-if="errors.password">{{
                    errors.password[0]
                  }}</span>
                </b-form-group>
                <b-form-group
                  id="password-confirmation-group"
                  label="Confirm Password:"
                  label-for="confirm-password"
                >
                  <b-form-input
                    id="confirm-password"
                    v-model="form.password_confirmation"
                    placeholder="Confirm password"
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      User.register(this.form)
        .then((response) => {
          this.$store.commit("LOGIN", true);
          localStorage.setItem("token", response.data);
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