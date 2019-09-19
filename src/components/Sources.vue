<template>
    <div class="card">
        <create-modal></create-modal>
        <div class="card-header">
            <div class="d-flex align-items-center">
                <h6 class="text-uppercase mr-auto">Quellen</h6>
                <button type="button" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#createSourceModal">
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <table v-if="loaded" class="table card-text table-hover">
                <thead>
                <th scope="col">URL</th>
                <th scope="col">Aggregator</th>
                </thead>
                <tbody>
                <tr v-for="source in paginatedSources()" :key="source.url">
                    <td scope="row">{{ source.url }}</td>
                    <td>{{ source.aggregator }}</td>
                </tr>
                </tbody>
            </table>
            <Pagination :items="sources" @pageChanged="page = $event"></Pagination>
        </div>
    </div>
</template>

<script>
import CreateModal from './modals/source/Create.vue'
import { ENDPOINT } from "../utils";
import Pagination from './Pagination.vue'

export default {
  name: "Sources",
  components: {
    Pagination,
    CreateModal
  },
  data () {
    return {
      page: 1,
      sources: [],
      loaded: false
    }
  },
  methods: {
    paginatedSources () {
      return this.sources.slice((1 + (10 * (this.page - 1))), 10 * (this.page))
    }
  },
  mounted () {
    let vm = this

    fetch(`${ENDPOINT}/sources`) // TODO: Replace this with organizers personal locations retrieved via custom function or view
        .then((response) => response.json())
        .then((sources) => {
          vm.sources = sources
        })
        .finally(() => {
          vm.loaded = true
        })
  }
}
</script>
