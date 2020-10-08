<template>
  <nav :aria-label="`${this.uid} pagination`">
    <ul
      v-if="pageList.length"
      class="pagination"
    >
      <li
        :class="getClassByPage(currentPage)"
        @click.prevent="changePage(currentPage)"
      >
        <a
          href
          class="page-link"
        >
          Begin
        </a>
      </li>
      <li
        v-for="v in pageList"
        :key="v"
        :class="getClassByPage(v)"
        @click.prevent="changePage(v)"
      >
        <a
          href
          v-text="v"
          class="page-link"
        />
      </li>
      <li
        :class="getClassByPage(lastPage)"
        @click.prevent="changePage(lastPage)"
      >
        <a
          href
          class="page-link"
        >
          End
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    uid: {
      type: String,
      required: true,
    },
    pageList: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      if (!this.uid) {
        throw Error('uid property is empty!');
      } else if (page !== this.currentPage) {
        this.$emit(`change-${this.uid}-page`, page);
      }
    },
    getClassByPage(page) {
      return {
        'page-item': true,
        active: this.currentPage === page,
      };
    },
  },
};
</script>
