<template>
  <div>
    <select class="select select-bordered w-full my-3" v-model="schedule" @change="getAnimeSchedule">
      <option value="" disabled selected>Pilih hari</option>
      <option value="monday">Senin</option>
      <option value="tuesday">Selasa</option>
      <option value="wednesday">Rabu</option>
      <option value="thursday">Kamis</option>
      <option value="friday">Jumat</option>
      <option value="saturday">Sabtu</option>
      <option value="sunday">Minggu</option>
    </select>
    <app-list>
      <top-anime-card v-for="anime in listAnime" :key="anime.mal_id" :anime="anime"></top-anime-card>
    </app-list>
  </div>
</template>

<script>
import http from "../helpers/http";
import dateHelper from "../helpers/date";
import List from "../components/List.vue";
import TopAnimeCard from "../components/TopAnimeCard.vue";

export default {
  name: "ScheduleAnime",
  components: {
    TopAnimeCard,
    "app-list": List,
  },
  data() {
    return {
      schedule: " ",
      listScheduleAnime: [],
    };
  },
  computed: {
    listAnime() {
      return this.listScheduleAnime.map((anime) => {
        anime.aired.from = dateHelper(anime.aired.from);
        return anime;
      });
    },
  },
  methods: {
    getAnimeSchedule() {
      http("/schedules?filter=" + this.schedule)
        .then((response) => {
          this.listScheduleAnime = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
