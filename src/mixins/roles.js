import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      roles: state => state.role.roles
    }),

    rolesSelect () {
      return this.roles.map(r => ({
        id: r,
        name: r
      }))
    },
  }
}
