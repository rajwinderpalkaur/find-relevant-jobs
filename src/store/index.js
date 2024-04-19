import { createStore } from 'vuex'
import skillsModule from './modules/skills'
import jobsModule from './modules/jobs'

export default createStore({
  modules: {
    skills: skillsModule,
    jobs: jobsModule
  }
})
