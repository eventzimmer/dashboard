<template>
  <div
    id="acceptProposedEventModal"
    class="modal"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Veranstaltung eintragen
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label class="form-control-label text-uppercase">Ort</label>
              <select
                v-model="location"
                class="form-control"
                required
              >
                <option
                  v-for="loc in $store.state.locations"
                  :key="loc.name"
                  :value="loc.name"
                >
                  {{ loc.name }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Abbrechen
          </button>
          <button
            v-if="$el"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            :disabled="!valid()"
            @click="acceptProposedEvent()"
          >
            Eintragen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Accept",
  data () {
      return {
        location: null
      }
  },
  methods: {
    valid () {
      return this.$el.getElementsByTagName('form')[0].checkValidity()
    },
    async acceptProposedEvent() {
      const response = await this.$store.getters.fetchDefaults('/rpc/accept_event', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: this.$store.state.selection.eventURL,
          location: this.location
        })
      })
      if (response.status === 200) {
        this.$store.commit('deleteProposedEvent', this.$store.state.selection.eventURL)
      }
    }
  }
}
</script>
