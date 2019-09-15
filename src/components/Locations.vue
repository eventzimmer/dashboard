<template>
    <div class="card">
        <div class="card-header">
            <h6 class="text-uppercase mb-0">Orte</h6>
        </div>
        <div class="card-body">
            <table v-if="loaded" class="table card-text table-hover">
                <thead>
                    <th scope="col">Name</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                </thead>
                <tbody>
                    <tr v-for="location in paginatedLocations()" :key="location.name">
                        <th scope="row">{{ location.name }}</th>
                        <td>{{ location.latitude }}</td>
                        <td>{{ location.longitude }}</td>
                    </tr>
                </tbody>
            </table>
            <Pagination :items="locations" @pageChanged="page = $event"></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import { ENDPOINT } from '../utils';

export default {
  name: "Locations",
  components: {
    Pagination
  },
  data () {
    return {
      page: 1,
      locations: [],
      loaded: false
    }
  },
  methods: {
    paginatedLocations () {
      return this.locations.slice((1 + (10 * (this.page - 1))), 10 * (this.page))
    }
  },
  mounted () {
    let vm = this

    fetch(`${ENDPOINT}/locations`) // TODO: Replace this with organizers personal locations retrieved via custom function or view
        .then((response) => response.json())
        .then((locations) => {
          vm.locations = locations
        })
        .finally(() => {
          vm.loaded = true
        })
  }
}
</script>
