<template>
  <div>
    <div class="navbar bg-orange-400 text-white shadow-lg px-52">
      <div class="navbar-end lg:navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><router-link class="btn btn-ghost text-black" to="/">Top Anime</router-link></li>
            <li><router-link to="/top-manga" class="btn btn-ghost text-black">Top Manga</router-link></li>
            <li><router-link to="/schedule" class="btn btn-ghost text-black">Jadwal Anime</router-link></li>
            <li><router-link to="/forum" class="btn btn-ghost text-black">Forum</router-link></li>
            <li v-if="isLogin">
              <a to="/login" class="btn btn-ghost text-black" @click.prevent="doLogout">{{ user.displayName }}(Logout)</a>
            </li>
            <li v-else><router-link to="/login" class="btn btn-ghost text-black">Login</router-link></li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">ChevaNime</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li><router-link class="btn btn-ghost" to="/">Top Anime</router-link></li>
          <li><router-link to="/top-manga" class="btn btn-ghost">Top Manga</router-link></li>
          <li><router-link to="/schedule" class="btn btn-ghost">Jadwal Anime</router-link></li>
          <li><router-link to="/forum" class="btn btn-ghost">Forum</router-link></li>
          <li v-if="isLogin">
            <a to="/login" class="btn btn-ghost text-black" @click.prevent="doLogout">{{ user.displayName }}(Logout)</a>
          </li>
          <li v-else><router-link to="/login" class="btn btn-ghost">Login</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "@firebase/auth";
export default {
  name: "NavBar",
  data() {
    return {
      isLogin: false,
      user: {},
    };
  },
  created() {
    const user = getAuth().currentUser;
    if (user !== null) {
      this.isLogin = true;
      this.user = user;
    }
  },
  methods: {
    doLogout() {
      getAuth()
        .signOut()
        .then(() => {
          window.location.reload();
        })
        .catch((err) => alert(err.message));
    },
  },
};
</script>
