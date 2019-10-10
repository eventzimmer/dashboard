<template>
  <div>
    <div class="page-holder w-100 d-flex flex-wrap">
      <div class="container-fluid px-xl-5">
        <section class="py-5">
          <div class="row">
            <div class="col-lg-6 mb-2">
              <Profile />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-6 mb-2">
              <Locations />
            </div>
            <div class="col-lg-6 mb-2">
              <Sources />
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer class="footer bg-white shadow align-self-end py-3 px-xl-5 w-100 mt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 text-center text-md-left text-gray-500">
            <p class="mb-2 mb-md-0">
              <a
                href="https://eventzimmer.de"
                class="external text-gray-500"
                target="_blank"
              >eventzimmer</a> &copy; 2019 |
              <a
                href="https://eventzimmer.de/impressum.html"
                class="external text-gray-500"
                target="_blank"
              >Impressum</a> |
              <a
                href="https://eventzimmer.de/datenschutz.html"
                class="external text-gray-500"
                target="_blank"
              >Datenschutz
              </a> |
              <a
                href="/faq.html"
                class="external text-gray-500"
                target="_blank"
              >FAQ</a>
            </p>
          </div>
          <div class="col-md-6 text-center text-md-right text-gray-400">
            <p class="mb-0">
              Design by <a
                href="https://bootstrapious.com/admin-templates"
                class="external text-gray-400"
                target="_blank"
              >Bootstrapious</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Profile from './Profile.vue'
import Locations from './Locations.vue'
import Sources from './Sources.vue'

export default {
  name: "Organizer",
  components: {
    Profile,
    Locations,
    Sources
  }
}
</script>
