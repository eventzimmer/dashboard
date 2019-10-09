<template>
  <nav
    aria-label="Page navigation"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ 'disabled': (page === 1) }"
      >
        <p
          class="page-link"
          aria-label="Previous"
          @click="paginate(page -1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </p>
      </li>
      <li
        v-for="availablePage in pages()"
        :key="availablePage"
        class="page-item"
        :class="{ 'active': (availablePage === page) }"
      >
        <p
          class="page-link"
          @click="paginate(availablePage)"
        >
          {{ availablePage }}
        </p>
      </li>
      <li
        class="page-item"
        :class="{ 'disabled': (page === pages()) }"
      >
        <p
          class="page-link"
          aria-label="Next"
          @click="paginate(page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </p>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      page: 1 // NOTE: Maybe make this a prop as well
    }
  },
  methods: {
    pages () {
      return Math.ceil(this.items.length / 10)
    },
    paginate (page) {
      this.page = page
      this.$emit('pageChanged', page)
    }
  }
}
</script>
