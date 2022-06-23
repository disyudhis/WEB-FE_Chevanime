<template>
  <div>
    <div v-if="!isLoading">
      <!-- Update Forum -->
      <div class="modal" id="forumModal" v-if="forum.author_uid === userId">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-center">Update forum</h3>
          <form @submit.prevent="updateForum">
            <div class="flex flex-col">
              <label for="title">Judul forum</label>
              <input v-model="formForum.title" type="text" placeholder="Judul forum" class="input input-bordered w-full" />
            </div>
            <div class="flex flex-col">
              <label for="content">Konten forum</label>
              <textarea v-model="formForum.content" class="textarea textarea-bordered" placeholder="Menurut saya anime in ..."> </textarea>
            </div>
            <div class="modal-action">
              <a href="#" class="btn btn-outline" ref="btnCloseForumModal">Tutup</a>
              <button type="submit" class="btn btn-primary bg-orange-400 border-orange-400 hover:bg-orange-500 hover:border-orange-500">Simpan</button>
            </div>
          </form>
        </div>
      </div>
      <!-- End update forum modal -->
    </div>

    <div class="px-32">
      <div class="mt-5 card w-full bg-base-100 card-compact shadow-xl p-5">
        <div class="card-body text-center space-y-2">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <h1 class="font-bold text-2xl">{{ forum.title }}</h1>
            <p class="font-normal text-lg">Author: {{ forum.author }} - {{ forum.created_at }}</p>
            <div class="space-x-3 my-2" v-if="forum.author_uid === userId">
              <a href="#forumModal" class="btn btn-warning btn-xs text-white">Edit</a>
              <button class="btn btn-error btn-xs text-white" @click="deleteForum">Delete</button>
            </div>
            <p class="font-medium text-lg font-sans">
              {{ forum.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, deleteDoc, updateDoc, Timestamp } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
export default {
  name: "ForumDetail",
  data() {
    return {
      userId: "",
      isLoading: true,
      forum: {},
      formForum: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.getForum();
  },
  methods: {
    getForum() {
      const forumId = this.$route.params.id;
      const db = getFirestore(this.$firebase);
      const documentRef = doc(db, "forums", forumId);
      getDoc(documentRef)
        .then((document) => {
          const { seconds, nanoseconds } = document.data().created_at;
          const date = new Timestamp(seconds, nanoseconds).toDate().toLocaleDateString();
          this.forum = {
            ...document.data(),
            id: document.id,
            created_at: date,
          };
          this.userId = getAuth().currentUser.uid;
          if (this.userId === this.forum.author_id) {
            this.formForum.title = this.forum.title;
            this.formForum.content = this.forum.content;
          }
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateForum() {
      const db = getFirestore(this.$firebase);
      const documentUpdatedRef = doc(db, "forums", this.forum.id);
      updateDoc(documentUpdatedRef, {
        title: this.formForum.title,
        content: this.formForum.content,
      })
        .then(() => {
          this.getForum();
          this.$refs.btnCloseForumModal.click();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    deleteForum() {
      const isConfirmDeleted = confirm("Yakin ingin menghapus forum ini?");
      if (isConfirmDeleted) {
        const db = getFirestore(this.$firebase);
        const documentDeletedRef = doc(db, "forums", this.forum.id);
        deleteDoc(documentDeletedRef)
          .then(() => {
            this.$router.push({ path: "/forum" });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },
  },
};
</script>
