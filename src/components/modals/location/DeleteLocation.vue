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
            data-dismiss="modal"
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
export default {
  name: "DeleteLocationModal",
  methods: {
    async deleteLocation () {
      let response = await this.$store.getters.fetchDefaults(`/locations?${new URLSearchParams({
        name: `eq.${this.$store.state.selection.locationName}`
      }).toString()}`, {
        method: 'DELETE'
      })
      if (response.status === 204) {
        this.$store.commit('deleteLocation', this.$store.state.selection.locationName)
      }
    }
  }
}
</script>
