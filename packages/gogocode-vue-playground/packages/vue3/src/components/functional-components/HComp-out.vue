<script>
import * as Vue from 'vue'
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },

  render() {
    return Vue.h() // avoid warning message
  },
}
</script>
