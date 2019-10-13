<template>
  <div
    id="createSourceModal"
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
            Quelle erstellen
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
              <label class="form-control-label text-uppercase">Url</label>
              <input
                v-model="url"
                type="text"
                placeholder="Ort27"
                class="form-control"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-control-label text-uppercase">Aggregator</label>
              <select
                v-model="aggregator"
                class="form-control"
                required
              >
                <option
                  v-for="agg in aggregators()"
                  :key="agg"
                  :value="agg"
                >
                  {{ agg }}
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
            @click="createSource"
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
  name: "CreateSourceModal",
  data () {
    return {
      url: null,
      aggregator: null
    }
  },
  methods: {
    valid () {
      return this.$el.getElementsByTagName('form')[0].checkValidity()
    },
    aggregators () {
      return ['iCal', 'Facebook', 'RSS']
    },
    async createSource() {
      let response = await this.$store.getters.fetchDefaults(`/sources`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${this.$store.state.auth.accessToken}`
        },
        body: JSON.stringify(this.$data)
      })
      if (response.status === 201) {
        this.$store.commit('addSources', [Object.assign({}, this.$data)])
      }
    }
  }
}
</script>
