<template>
  <q-form @submit="login">
    <h3>Login</h3>
    <q-input
      class="input-form"
      outlined
      v-model="email"
      label="Email"
      :error-message="v$.email.$silentErrors[0]?.$message"
      :error="formSubmit && v$.email.$invalid"
    ></q-input>
    <q-input
      class="input-form"
      outlined
      v-model="senha"
      label="Senha"
      type="password"
      :error-message="v$.senha.$silentErrors[0]?.$message"
      :error="formSubmit && v$.senha.$invalid"
    ></q-input>
    <div class="login-actions">
      <q-btn size="lg" rounded outline label="Login" type="submit" v-if="!processing"></q-btn>
      <q-spinner color="primary" v-else size="3em" />
      <br><br>
      <p>
        Não possui uma conta?
        <router-link to="/auth/registro">
          Criar conta
        </router-link>
      </p>

    </div>
  </q-form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      senha: '',
      formSubmit: false,
      processing: false,
      $q: useQuasar()
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('* Campo obrigatorio', required),
        email: helpers.withMessage('* Email invalido', email)
      },
      senha: {
        required: helpers.withMessage('* Campo obrigatorio', required)
      }
    }
  },
  methods: {
    async login() {
      this.formSubmit = true
      const valid = await this.v$.$validate()

      if (!valid) {
        return
      }

      this.processing = true

      const api_url = process.env.API_URL

      this.$http(
        `${api_url}/login`,
        'POST',
        {},
        {
          email: this.email,
          senha: this.senha
        }
      ).then(res => {
        console.log(res)
        localStorage.setItem('access_token', res.token)
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        if(err.response.status === 401) {
          this.$q.notify({
          multiline: true,
          color: 'negative',
          message: 'Login invalido. Tente novamente.',
          icon: 'fas fa-exclamation-triangle',
          position: 'bottom-right'
        })
        }else {
          this.$q.notify({
            multiline: true,
            color: 'negative',
            message: 'Erro ao logar. Tente novamente mais tarde.',
            icon: 'fas fa-exclamation-triangle',
            position: 'bottom-right'
          })
        }
      }).finally(() => {
        this.processing = false
      })

    },

  }
}
</script>

<style scoped>
.input-form {
  margin-bottom: 10px;
}

h3, .login-actions {
  text-align: center;
}
</style>
