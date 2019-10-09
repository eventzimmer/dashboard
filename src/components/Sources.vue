<template>
  <div class="card">
    <create-modal />
    <delete-modal :url="url" />
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h6 class="text-uppercase mr-auto">
          Quellen
        </h6>
        <button
          type="button"
          class="btn btn-sm btn-outline-dark"
          data-toggle="modal"
          data-target="#createSourceModal"
        >
          <i class="fas fa-plus-circle" />
        </button>
      </div>
    </div>
    <div class="card-body">
      <table
        v-if="loaded"
        class="table card-text table-hover"
      >
        <thead>
          <th scope="col">
            URL
          </th>
          <th scope="col">
            Aggregator
          </th>
        </thead>
        <tbody>
          <tr
            v-for="source in paginatedSources()"
            :key="source.url"
            @click="deleteModal(source.url)"
          >
            <td scope="row">
              {{ source.url }}
            </td>
            <td>{{ source.aggregator }}</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :items="$store.state.sources"
        @pageChanged="page = $event"
      />
    </div>
  </div>
</template>

<script>
import CreateModal from './modals/source/Create.vue'
import DeleteModal from './modals/source/Delete.vue'
import { ENDPOINT } from '../utils'
import Pagination from './Pagination.vue'

export default {
  name: "Sources",
  components: {
    DeleteModal,
    Pagination,
    CreateModal
  },
  data () {
    return {
      url: null,
      page: 1,
      loaded: false
    }
  },
  async mounted () {
    let response = await fetch(`${ENDPOINT}/sources`) // TODO: Replace this with organizers personal locations retrieved via custom function or view
    let sources = await response.json()
    this.$store.commit('addSources', sources)
    this.loaded = true
  },
  methods: {
    deleteModal (url) {
      this.url = url
      $('#deleteSourceModal').modal('show') // eslint-disable-line
    },
    paginatedSources () {
      return this.$store.state.sources.slice((this.page - 1) * 10, this.page * 10)
    }
  }
}
</script>
