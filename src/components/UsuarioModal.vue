<template>
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-btn flat icon="fas fa-times" class="absolute-top-right z-max" @click.stop.prevent="$emit('changeModal', false)" />
        <q-card-section>
          <div class="text-h6">{{ JSON.stringify(user) == '{}' ? 'Adicionar' : 'Editar' }} Usuário</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="submit">
            <q-input
              class="input-form"
              outlined
              v-model="nome"
              label="Nome"
              :error-message="v$.nome.$silentErrors[0]?.$message"
              :error="formSubmit && v$.nome.$invalid"
            ></q-input>
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
              :type="showPass ? 'text' : 'password'"
              :error-message="v$.senha.$silentErrors[0]?.$message"
              :error="formSubmit && v$.senha.$invalid"
            ></q-input>
            <div>
              <q-checkbox
                v-model="showPass"
                :label="showPass ? 'Ocultar senha' : 'Mostrar senha'"
                checked-icon="fas fa-eye"
                unchecked-icon="fas fa-eye-slash"
                color="primary"
                keep-color
              />
            </div>
            <div class="form-actions">
              <q-btn size="lg" rounded outline :label="JSON.stringify(user) == '{}' ? 'Adicionar' : 'Editar'" type="submit" v-if="!processing"></q-btn>
              <q-spinner color="primary" v-else size="3em" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import { useQuasar } from 'quasar'

export default {
  props: {
    showModal: Boolean,
    user: Object
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      id: '',
      nome: '',
      email: '',
      senha: '',
      formSubmit: false,
      processing: false,
      $q: useQuasar(),
      prompt: false,
      showPass: false
    }
  },
  watch: {
    showModal(newVal) {
      console.log(this.user);
      if(newVal && JSON.stringify(this.user) != '{}') {
        this.id = this.user.id
        this.nome = this.user.nome
        this.email = this.user.email
        this.senha = this.user.senha
      }else {
        this.id = ''
        this.nome = ''
        this.email = ''
        this.senha = ''
      }
      this.prompt = newVal
    }
  },
  validations() {
    return {
      nome: {
        required: helpers.withMessage('* Campo obrigatorio', required)
      },
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
    submit() {
      if(JSON.stringify(this.user) == '{}') {
        this.addUser()
      }else {
        this.changeUser()
      }
    },
    async addUser() {
      this.formSubmit = true
      const valid = await this.v$.$validate()

      if (!valid) {
        return
      }

      this.processing = true

      const api_url = process.env.API_URL

      this.$http(
        `${api_url}/usuario`,
        'POST',
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        }
      ).then(res => {
        console.log(res)
        this.$q.notify({
          multiline: true,
          color: 'positive',
          message: 'Usuario cadastrado com sucesso.',
          icon: 'fas fa-check-circle',
          position: 'bottom-right'
        })

        this.$emit('changeModal', true)

      }).catch(err => {
        console.log(err)
        this.$q.notify({
          multiline: true,
          color: 'negative',
          message: 'Erro ao cadastrar. Tente novamente mais tarde.',
          icon: 'fas fa-exclamation-triangle',
          position: 'bottom-right'
        })
      }).finally(() => {
        this.processing = false
      })
    },
    async changeUser() {
      this.formSubmit = true
      const valid = await this.v$.$validate()

      if (!valid) {
        return
      }

      this.processing = true

      const api_url = process.env.API_URL

      this.$http(
        `${api_url}/usuario/${this.user.id}`,
        'PUT',
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        }
      ).then(res => {
        console.log(res)
        this.$q.notify({
          multiline: true,
          color: 'positive',
          message: 'Usuario editado com sucesso.',
          icon: 'fas fa-check-circle',
          position: 'bottom-right'
        })

        this.$emit('changeModal', true)

      }).catch(err => {
        console.log(err)
        this.$q.notify({
          multiline: true,
          color: 'negative',
          message: 'Erro ao editar. Tente novamente mais tarde.',
          icon: 'fas fa-exclamation-triangle',
          position: 'bottom-right'
        })
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

h3, .form-actions {
  text-align: center;
}
</style>
