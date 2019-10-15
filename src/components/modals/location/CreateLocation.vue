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
          <div class="input-group mb-2">
            <input
              v-model="address"
              type="text"
              placeholder="Addresse"
              class="form-control"
            >
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="fillLatitudeLongitude()"
              >
                Automatisch füllen
              </button>
            </div>
          </div>
          <form>
            <div class="form-group">
              <label class="form-control-label text-uppercase">Name</label>
              <input
                v-model="name"
                type="text"
                placeholder="Ort"
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
      address: null,
      name: null,
      latitude: null,
      longitude: null
    }
  },
  methods: {
    valid () {
      return this.$el.getElementsByTagName('form')[0].checkValidity()
    },
    async fillLatitudeLongitude () {
      if (!this.address.length) {
        throw new Error('Cannot query empty address')
      }
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURI(this.address)}&format=json`)
      const places = await response.json()
      if ((response.status === 200) && places.length) {
        const place = places.pop()
        this.latitude = place.lat
        this.longitude = place.lon
      }
    },
    async createLocation () {
      const response = await this.$store.getters.fetchDefaults(`/locations`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${this.$store.state.auth.accessToken}`
        },
        body: JSON.stringify(this.$data)
      })
      if (response.status === 201) {
        this.$store.commit('addLocations', [{
          name: this.name,
          latitude: this.latitude,
          longitude: this.longitude
        }])
      }
    }
  }
}
</script>
