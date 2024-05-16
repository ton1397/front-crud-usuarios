<template>
  <q-page-container>
    <h3>Lista de Usuários</h3>
    <div class="add-user">
      <q-btn
        rounded
        color="primary"
        icon="fas fa-plus"
        label="Adicionar Usuário"
        @click="adicionarUsuario"
      />
    </div>
    <q-list bordered separator v-if="!processing">
      <!-- Iterando sobre a lista de usuários -->
      <q-item
        v-for="(user, index) in userList"
        :key="index"
        style="font-size: 1.5em;"
      >
        <q-item-section>
          <!-- Nome do usuário -->
          <q-item-label>{{ user.nome }}</q-item-label>
        </q-item-section>

        <!-- Dropdown de opções -->
        <q-item-section side>
          <q-btn-dropdown
            flat
            rounded
            color="primary"
            dropdown-icon="fas fa-ellipsis-v"
            size="1em"
          >
            <q-list>
              <q-item clickable @click="editarUsuario(user)">
                <q-item-section side>
                <q-icon name="fas fa-edit" color="primary" size="xs" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="excluirUsuario(user.id)">
                <q-item-section side>
                  <q-icon name="fas fa-trash" color="negative" size="xs" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Deletar</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="loading-spinner" v-else>

      <q-spinner size="3em" color="primary" />
    </div>
  </q-page-container>
  <usuario-modal :showModal="prompt" :user="modalProps" @changeModal="changeModal"/>

</template>
<script>
import usuarioModal from '../components/UsuarioModal.vue'
import { useQuasar } from 'quasar'
export default {
  components: { usuarioModal },
  data() {
    return {
      userList: [],
      processing: true,
      modalProps: {},
      prompt: false,
      $q: useQuasar(),
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {

      const api_url = process.env.API_URL

      this.$http(
        `${api_url}/usuario`,
        'GET',
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      ).then(res => {
        this.userList = res.result
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.processing = false
      })
    },
    adicionarUsuario() {
      this.prompt = true
    },
    editarUsuario(user) {
      // console.log(user);
      this.modalProps = user
      this.prompt = true
    },
    excluirUsuario(id) {
      this.$q.notify({
        color: 'dark',
        message: 'Deseja realmente excluir o usuario?',
        icon: 'fas fa-question-circle',
        position: 'center',
        timeout: 0,
        actions: [
          {
            label: 'Cancelar',
            color: 'negative',
            handler: () => {
              console.log('Cancel')
            }
          },
          {
            label: 'Confirmar',
            color: 'positive',
            handler: () => {
              this.processing = true

              const api_url = process.env.API_URL

              this.$http(
                `${api_url}/usuario/${id}`,
                'DELETE',
                {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
              ).then(res => {
                console.log(res)
                this.$q.notify({
                  color: 'positive',
                  message: 'Excluido com sucesso.'
                })
                this.refreshUsers()
              }).catch(err => {
                console.log(err)
              }).finally(() => {
                this.processing = false
              })
            }
          }
        ]
      })
    },
    changeModal(refresh) {
      this.prompt = !this.prompt
      this.modalProps = {}
      if (refresh) {
        this.refreshUsers()
      }
    },
    refreshUsers() {
      this.userList = []
      this.processing = true
      this.getUsers()
    }
  }
};
</script>

<style scoped>
h3, .loading-spinner {
  text-align: center;
}

.add-user {
  text-align: end;
  margin-bottom: 10px;
}
</style>
