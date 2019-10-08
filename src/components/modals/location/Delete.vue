<template>
  <div
    id="deleteLocationModal"
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
            Ort löschen
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
          <p>Sind Sie sich sicher das Sie den Ort <code>{{ name }}</code> löschen wollen?</p>
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
            class="btn btn-danger"
            @click="deleteLocation"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ENDPOINT } from '../../../utils.js';

export default {
  name: "DeleteLocationModal",
  props: {
    name: {
      type: String,
      default: '',
    }
  },
  methods: {
    async deleteLocation () {
      let response = fetch(`${ENDPOINT}/locations?${new URLSearchParams({
        name: `eq.${this.name}`
      }).toString()}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        this.$emit('deletedLocation', this.name)
      }
    }
  }
}
</script>
