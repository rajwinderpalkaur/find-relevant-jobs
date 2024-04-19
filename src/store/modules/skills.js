import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    skills: [],
    selectedSkills: [],
    skillsLimit: 10,
  }),
  mutations: {
    SET_SKILLS(state, skills) {
      state.skills = skills
    },
    ADD_SELECTED_SKILL(state, skill) {
      if (state.selectedSkills.length < state.skillsLimit) {
        state.selectedSkills.push(skill)
      }
    },
    REMOVE_SELECTED_SKILL(state, index) {
      state.selectedSkills.splice(index, 1)
    }
  },
  actions: {
    async fetchSkills({ commit }) {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/skills`
      try {
        const response = await axios.get(apiUrl)
        commit('SET_SKILLS', response.data)
      } catch (error) {
        console.error('Error while fetching skills:', error)
      }
    },
    addSelectedSkill({ commit }, skill) {
      commit('ADD_SELECTED_SKILL', skill)
    },
    removeSelectedSkill({ commit }, index) {
      commit('REMOVE_SELECTED_SKILL', index)
    }
  },
  getters: {
    filteredSkills: (state) => (filter) => {
      return state.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(filter.toLowerCase()) &&
          !state.selectedSkills.some((s) => s.skill.id === skill.id)
      )
    }
  }
}
