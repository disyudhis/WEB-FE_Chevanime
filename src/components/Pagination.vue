<template>
  <div class="flex flex-row space-x-2 justify-end mb-3 mt-3">
    <button class="btn btn-primary" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
    <button class="btn btn-primary" :disabled="!hasNextPage" @click="changePage(currentPage + 1)">Next</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>
