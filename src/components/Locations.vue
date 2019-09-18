<template>
    <div class="card">
        <create-modal></create-modal>
        <div class="card-header">
            <div class="d-flex align-items-center">
                <h6 class="text-uppercase mr-auto">Orte</h6>
                <button type="button" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#createLocationModal">
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
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
                        <td scope="row">{{ location.name }}</td>
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
import CreateModal from './modals/location/Create.vue'
import { ENDPOINT } from '../utils';

export default {
  name: "Locations",
  components: {
    Pagination,
    CreateModal
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
