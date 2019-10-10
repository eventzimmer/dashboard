<template>
  <div
    id="createLocationModal"
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
            Ort erstellen
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
              <label class="form-control-label text-uppercase">Name</label>
              <input
                v-model="name"
                type="text"
                placeholder="Ort27"
                class="form-control"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-control-label text-uppercase">Latitude</label>
              <input
                v-model="latitude"
                type="number"
                min="-90"
                max="90"
                step="any"
                class="form-control"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-control-label text-uppercase">Longitude</label>
              <input
                v-model="longitude"
                type="number"
                min="-180"
                max="180"
                step="any"
                class="form-control"
                required
              >
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
            @click="createLocation"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateLocationModal",
  data () {
    return {
      name: null,
      latitude: null,
      longitude: null
    }
  },
  methods: {
    valid () {
      return this.$el.getElementsByTagName('form')[0].checkValidity()
    },
    async createLocation () {
      let response = await this.$store.getters.fetchDefaults(`/locations`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${this.$store.state.auth.accessToken}`
        },
        body: JSON.stringify(this.$data)
      })
      if (response.status === 201) {
        this.$store.commit('addLocations', [Object.assign({}, this.$data)])
      }
    }
  }
}
</script>
