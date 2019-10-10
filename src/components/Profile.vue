<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <h6 class="text-uppercase mr-auto">
          Profil
        </h6>
        <button
          type="button"
          class="btn btn-sm btn-outline-dark"
          @click="$store.dispatch('logout')"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div clas="col-md-3">
          <img
            class="rounded img-thumbnail"
            :src="$store.state.auth.profile.picture"
          >
        </div>
        <div class="col-md-9">
          <div class="row mt-1">
            <div class="col">
              <h6 class="text-muted">
                Benutzername
              </h6>
              <p>{{ $store.state.auth.profile.nickname }}</p>
            </div>
            <div class="col">
              <h6 class="text-muted">
                E-Mail
              </h6>
              <p>{{ $store.state.auth.profile.email }}</p>
            </div>
            <div class="col">
              <h6 class="text-muted">
                Zuletzt aktualisiert
              </h6>
              <p class="card-text">
                {{ formatLastUpdated($store.state.auth.profile.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns-new/format'
import { de } from 'date-fns-new/locale'

export default {
  name: "Profile",
  methods: {
    formatLastUpdated(date) {
        return format(new Date(date), 'EEEE, d MMMM y', {
          locale: de
        })
    }
  }
}
</script>
