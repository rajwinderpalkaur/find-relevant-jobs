import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    jobs: [],
    errors: {}
  }),
  mutations: {
    SET_JOBS(state, jobs) {
      state.jobs = jobs
    },
    SET_ERRORS(state, errors) {
      state.errors = errors
    }
  },
  actions: {
    async fetchJobs({ commit, rootState }) {
      const skillsPayload = rootState.skills.selectedSkills.reduce((acc, { skill, rating }) => {
        acc[skill.id] = rating
        return acc
      }, {})

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/postings/search/skills`,
          { skill: skillsPayload },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )

        commit('SET_JOBS', response.data.results)
      } catch (error) {
        console.log({ error })
        console.error(error.response.data)
        if (error.response && error.response.status === 422) {
          commit('SET_ERRORS', error.response.data.errors)
          // console.log(rootState.jobs.errors)
          // console.error(error.response.data.errors)
        } else {
          console.error('Generic error')
        }
      }
    }
  }
}
