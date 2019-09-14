<template>
    <div class="page-holder d-flex align-items-center">
        <div class="container">
            <div class="row align-items-center py-5">
                <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
                    <div class="pr-lg-5"><img src="../assets/illustration.svg" alt="" class="img-fluid"></div>
                </div>
                <div class="col-lg-5 px-lg-4">
                    <h1 class="text-base text-primary text-uppercase mb-4">eventzimmer dashboard</h1>
                    <h2 class="mb-4">Wilkommen!</h2>
                    <p class="text-muted">eventzimmer ist eine freie und kostenlose Plattform um Veranstaltungen zu verwalten.</p>
                    <div class="mt-4">
                        <button type="button" class="btn btn-primary shadow px-5" @click="$store.dispatch('login')">Anmelden</button>
                    </div>
                </div>
            </div>
            <p class="mt-5 mb-0 text-gray-400 text-center">Design by <a href="https://bootstrapious.com/admin-templates" class="external text-gray-400">Bootstrapious</a> & eventzimmer</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "Login"
}
</script>
