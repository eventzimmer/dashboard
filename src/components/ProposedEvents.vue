<template>
  <div class="card">
    <Accept />
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h6 class="text-uppercase mr-auto">
          Eingereichte Veranstaltugen
        </h6>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <table
          v-if="loaded"
          class="table card-text table-hover"
        >
          <thead>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Datum
            </th>
            <th scope="col">
              Quelle
            </th>
            <th>
              Ort
            </th>
          </thead>
          <tbody>
            <tr
              v-for="proposed_event in paginatedProposedEvents()"
              :key="proposed_event.url"
              @click="acceptEvent(proposed_event.url)"
            >
              <td scope="row">
                {{ proposed_event.name }}
              </td>
              <td>{{ proposed_event.starts_at }}</td>
              <td>{{ proposed_event.source }}</td>
              <td>{{ proposed_event.location }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination
          :items="this.$store.state.proposed_events"
          @pageChanged="page = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Accept from './modals/proposed_events/Accept.vue'

export default {
    name: "ProposedEvents",
  components: {
      Accept,
    Pagination
  },
  data () {
      return {
        loaded: false,
        page: 1
      }
  },
  async mounted () {
    const response = await this.$store.getters.fetchDefaults('/proposed_events_by_organizer?order=starts_at')
    const events = await response.json()
    this.$store.commit('addProposedEvents', events)
    this.loaded = true
  },
  methods: {
    paginatedProposedEvents () {
      return this.$store.state.proposed_events.slice((this.page - 1) * 10, this.page * 10)
    },
    acceptEvent(url) {
      this.$store.commit('updateEventURL', url)
      $('#acceptProposedEventModal').modal('show') // eslint-disable-line
    }
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}

table td {
  word-wrap: break-word;         /* All browsers since IE 5.5+ */
  overflow-wrap: break-word;     /* Renamed property in CSS3 draft spec */
}
</style>
