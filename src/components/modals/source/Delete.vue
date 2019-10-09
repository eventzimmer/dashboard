<template>
  <div
    id="deleteSourceModal"
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
            Quelle löschen
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
          <p>Sind Sie sich sicher das Sie die Quelle mit der URL <code>{{ url }}</code> löschen wollen?</p>
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
            @click="deleteSource"
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
  name: "Delete",
  props: {
    url: {
      type: String,
      default: null
    }
  },
  methods: {
    async deleteSource () {
      let response = this.$store.getters.fetchDefaults(`/sources?${new URLSearchParams({
        url: `eq.${this.url}`
      }).toString()}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        this.$emit('deletedSource', this.url)
      }
    }
  }
}
</script>
