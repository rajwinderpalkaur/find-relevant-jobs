<template>
  <main>
    <SkillSelector />
    <JobList v-if="selectedSkills.length > 0" />
  </main>
</template>

<script>
import SkillSelector from '../components/SkillSelector.vue'
import JobList from '../components/JobList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    SkillSelector,
    JobList
  },
  computed: {
    ...mapState('skills', ['selectedSkills'])
  }
}
</script>
