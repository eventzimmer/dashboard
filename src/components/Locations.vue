<template>
  <div class="card">
    <create-modal />
    <delete-modal v-if="$store.state.selection.locationName" />
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h6 class="text-uppercase mr-auto">
          Orte
        </h6>
        <button
          type="button"
          class="btn btn-sm btn-outline-dark"
          data-toggle="modal"
          data-target="#createLocationModal"
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
            Name
          </th>
          <th scope="col">
            Latitude
          </th>
          <th scope="col">
            Longitude
          </th>
        </thead>
        <tbody>
          <tr
            v-for="location in paginatedLocations()"
            :key="location.name"
            @click="deleteModal(location.name)"
          >
            <td scope="row">
              {{ location.name }}
            </td>
            <td>{{ location.latitude }}</td>
            <td>{{ location.longitude }}</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :items="this.$store.state.locations"
        @pageChanged="page = $event"
      />
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import CreateModal from './modals/location/CreateLocation.vue'
import DeleteModal from './modals/location/DeleteLocation.vue'

export default {
  name: "Locations",
  components: {
    Pagination,
    CreateModal,
    DeleteModal
  },
  data () {
    return {
      page: 1,
      loaded: false
    }
  },
  async mounted () {
    const response = await this.$store.getters.fetchDefaults('/locations_by_owner')
    const locations = await response.json()
    this.$store.commit('addLocations', locations)
    this.loaded = true
  },
  methods: {
    deleteModal (name) {
      this.$store.commit('updateLocationName', name)
      $('#deleteLocationModal').modal('show') // eslint-disable-line
    },
    paginatedLocations () {
      return this.$store.state.locations.slice((this.page - 1) * 10, this.page * 10)
    }
  }
}
</script>
