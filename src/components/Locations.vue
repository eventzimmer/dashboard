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
            <!-- TODO: Outsource this logic to be reused by sources -->
            <nav aria-label="Page navigation example" v-if="locations.length > 10">
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': (page === 1) }">
                        <p class="page-link" aria-label="Previous" @click="paginate(page -1)">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </p>
                    </li>
                    <li class="page-item" :class="{ 'active': (availablePage === page) }" v-for="availablePage in pages()" :key="availablePage"><p class="page-link" @click="paginate(availablePage)">{{ availablePage }}</p></li>
                    <li class="page-item" :class="{ 'disabled': (page === pages()) }">
                        <p class="page-link" aria-label="Next" @click="paginate(page + 1)">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </p>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { ENDPOINT } from "../utils";

export default {
  name: "Locations",
  data () {
    return {
      page: 1,
      locations: [],
      loaded: false
    }
  },
  methods: {
    pages () {
      return Math.floor(this.locations.length / 10)
    },
    paginate (page) {
      this.page = page
    },
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
