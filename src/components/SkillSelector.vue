<template>
  <div class="skill-selector">
    <h2>Select and Rate Your Skills</h2>
    <ul v-if="errors" class="error-message server-error">
      <small
        ><li v-for="(value, key) in errors" :key="key">{{ value.toString() }}</li></small
      >
    </ul>

    <div class="input-group">
      <input
        type="text"
        v-model="skillFilter"
        placeholder="Enter or filter skills..."
        @focus="showAllSkills"
        @blur="hideSkills"
        @input="showAllSkills"
        class="input-filter"
        :disabled="selectedSkills.length >= skillsLimit"
      />
      <ul v-if="showSkillsList" class="filtered-skills-list">
        <li
          class="filtered-skill"
          v-for="skill in filteredSkillsComputed"
          :key="skill.id"
          @click.prevent="selectSkill(skill)"
          @mousedown.prevent="selectSkill(skill)"
        >
          <button>{{ skill.name }}</button>
        </li>
      </ul>
    </div>
    <div v-if="selectedSkill" class="rating-input-group">
      <label for="rating" class="rating-label">Rate your skill in {{ selectedSkill.name }}:</label>
      <input
        type="number"
        id="rating"
        v-model.number="skillRating"
        min="1"
        max="5"
        class="rating-input"
      />
      <button @click="addSkill" class="add-btn">Add Skill</button>
    </div>
    <p v-if="selectedSkills.length >= skillsLimit" class="error-message">
      <small>You cannot add more than {{ skillsLimit }} skills.</small>
    </p>
    <p v-else class="info-message">
      <small
        >You can add {{ skillsLimit - selectedSkills.length }} more
        {{ skillsLimit - selectedSkills.length === 1 ? 'skill' : 'skills' }}.</small
      >
    </p>
    <div class="skill-list">
      <span v-for="(skill, index) in selectedSkills" :key="index" class="skill-item">
        {{ skill.skill.name }}: {{ skill.rating }}
        <button @click="removeSkill(index)" class="remove-btn">x</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      skillFilter: '',
      showSkillsList: false,
      selectedSkill: null,
      skillRating: 1
    }
  },
  computed: {
    ...mapState('skills', ['selectedSkills', 'skillsLimit']),
    ...mapState('jobs', ['errors']),
    ...mapGetters('skills', ['filteredSkills']),
    filteredSkillsComputed() {
      return this.filteredSkills(this.skillFilter)
    }
  },
  methods: {
    ...mapActions('skills', ['fetchSkills', 'addSelectedSkill', 'removeSelectedSkill']),
    showAllSkills() {
      this.showSkillsList = true
    },
    hideSkills(event) {
      //?Note Delay hiding to allow for skill selection
      setTimeout(() => {
        if (!this.$el.contains(event.relatedTarget)) {
          this.showSkillsList = false
        }
      }, 100)
    },
    selectSkill(skill) {
      this.selectedSkill = skill
      this.skillFilter = skill.name
      this.showSkillsList = false
    },
    addSkill() {
      this.addSelectedSkill({ skill: this.selectedSkill, rating: this.skillRating })
      this.resetInput()
    },
    removeSkill(index) {
      this.removeSelectedSkill(index)
    },
    resetInput() {
      this.selectedSkill = null
      this.skillFilter = ''
      this.skillRating = 1
    },
  },
  mounted() {
    this.fetchSkills()
  }
}
</script>

<style scoped>
.skill-selector {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--vt-c-white);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skill-selector h2 {
  font-size: 16px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-filter {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
}

.filtered-skills-list {
  position: absolute;
  width: 100%;
  background: var(--vt-c-white);
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin-top: -1px;
  overflow-y: auto;
  max-height: 400px;
}

.filtered-skill {
  padding: 10px 15px;
}

.filtered-skill button {
  all: unset;
}
.filtered-skill button:focus {
  outline: solid;
}

.filtered-skill:hover,
.filtered-skill:focus {
  background-color: #f0f0f0;
}

.rating-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-label {
  font-weight: bold;
}

.rating-input {
  width: 50px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 8px 16px;
  background-color: var(--vt-c-success);
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn {
  border: none;
  background: none;
  border-radius: 10px;
  padding: 2px 10px;
  color: var(--vt-c--danger);
}

.error-message,
.info-message {
  text-align: center;
  margin-top: 10px;
  color: var(--vt-c--danger);
}
.server-error {
  text-align: justify;
  margin-bottom: 10px;
  padding-left: 15px;
}

.skill-list {
  box-sizing: border-box;
  list-style-type: none;
  padding: 0;
}

.skill-item {
  background: var(--vt-c-white-soft);
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.skill-item button {
  font-size: 15px;
  margin-top: 20px;
  font-weight: 100;
  cursor: pointer;
}
</style>
