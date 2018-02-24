<template>
  <div class="news-view">
    <div class="news-list-nav">
        8888{{ newMovies }}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'item-list',
  data () {
    return {
      transition: 'slide-right',
    }
  },
  computed: {
    // ...mapState({
    //   newMovies: state => state.home.getMovie,
    // })
    newMovies () {
      this.$store.dispatch('HOME_FILTERS_FETCH')
    }
  },
  // asyncData ({ store, route, cookies}) {
  //   return Promise.all([
  //     store.dispatch('HOME_FILTERS_FETCH', {}),
  //   ])
  // },
  methods: {
    getMovie: function () {
    console.log('================');
      // this.$store.dispatch('HOME_FILTERS_FETCH', {})
      
    }
  },
  beforeCreate () {
    console.log(11111111111111);
  },
  created () {
    console.log(22222222222222);
    this.getMovie()
  },

}
</script>

<style lang="stylus">
.news-view
  padding-top 45px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>
