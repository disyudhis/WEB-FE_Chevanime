<template>
  <div>
    <app-pagination :currentPage="currentPage" :hasNextPage="pagination.has_next_page" v-on:changePage="changePage"></app-pagination>
    <app-list>
      <top-anime-card v-for="anime in topAnime" :key="anime.mal_id" :anime="anime"></top-anime-card>
    </app-list>
  </div>
</template>

<script>
import http from "../helpers/http";
import dateHelper from "../helpers/date";
import TopAnimeCard from "../components/TopAnimeCard.vue";
import List from "../components/List.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "Top Anime",
  components: {
    TopAnimeCard,
    "app-list": List,
    "app-pagination": Pagination,
  },
  data() {
    return {
      currentPage: 1,
      listTopAnime: [],
      pagination: {
        last_visible_page: 0,
        has_next_page: false,
      },
    };
  },
  created() {
    this.getTopAnime();
  },
  computed: {
    topAnime() {
      return this.listTopAnime.map((topAnime) => {
        topAnime.aired.from = dateHelper(topAnime.aired.from);
        return topAnime;
      });
    },
  },
  methods: {
    getTopAnime(page = 1) {
      http("/top/anime?page=" + page)
        .then((response) => {
          this.listTopAnime = response.data;
          this.pagination = response.pagination;
        })
        .catch((error) => alert(error.message));
    },
    changePage(page) {
      this.currentPage = page;
      this.getTopAnime(page);
    },
  },
};
</script>
