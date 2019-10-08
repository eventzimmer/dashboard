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
          <div class="form-group">
            <label class="form-control-label text-uppercase">Url</label>
            <input
              v-model="url"
              type="text"
              placeholder="Ort27"
              class="form-control"
            >
          </div>
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
            type="button"
            class="btn btn-primary"
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
import { ENDPOINT } from "../../../utils";

export default {
  name: "CreateSourceModal",
  data () {
    return {
      url: null,
      aggregator: 'iCal'
    }
  },
  methods: {
    async createSource() {
      let response = fetch(`${ENDPOINT}/sources`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${this.$store.state.auth.accessToken}`
        },
        body: JSON.stringify(this.$data)
      })
      if (response.status === 201) {
        this.$emit('createdSource', this.$data)
      }
    }
  }
}
</script>
