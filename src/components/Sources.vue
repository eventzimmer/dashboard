<template>
    <div class="card">
        <div class="card-header">
            <h6 class="text-uppercase mb-0">Quellen</h6>
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
import { ENDPOINT } from "../utils";
import Pagination from './Pagination.vue'

export default {
  name: "Sources",
  components: {
    Pagination
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
