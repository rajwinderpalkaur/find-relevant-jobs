<template>
  <div class="job-list">
    <h2>Relevant Job Postings</h2>
    <ul v-if="jobs.length > 0">
      <li v-for="job in paginatedJobs" :key="job.id" class="job-posting">
        <img src="/image.png" alt="company-logo" />
        <div class="job-description">
          <h3>
            <a href="#">{{ job.title }}</a>
          </h3>
          <p>{{ job.company.name }}</p>
          <p><span class="bold">Relevance score: {{ job.score }}</span> ({{ skillsList(job.skill_list) }})</p>
        </div>
      </li>
    </ul>
    <p v-else>No job postings found for selected skills.</p>
    <div v-if="jobs.length > 0" class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapState('jobs', ['jobs']),
    ...mapState('skills', ['selectedSkills']),
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.jobs.slice(start, start + this.pageSize)
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.pageSize)
    },
  },
  methods: {
    ...mapActions('jobs', ['fetchJobs']),
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    skillsList(skill) {
      return Object.entries(skill).map(([key, value]) => `${key}: ${value}`).join(', ');
    },
  },
  mounted() {
    if (this.selectedSkills.length > 0) {
      this.fetchJobs()
    }
  },
  watch: {
    selectedSkills: {
      deep: true,
      handler() {
        this.fetchJobs()
      }
    }
  }
}
</script>
<style scoped>
.job-list {
  max-width: 600px;
  margin: 10px auto;
  padding: 10px;
}
.job-list h2 {
  color: #333;
  margin-bottom: 10px;
}
.job-list ul {
  list-style: none;
  padding: 0;
}
.job-list li {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.job-list h3 {
  margin: 0 0 5px 0;
  font-size: 15px;
}
.job-list a {
  font-weight: bold;
  padding: 0;
  color: var(--vt-c-black-soft);
}
.job-list a:hover {
  background: transparent;
  cursor: pointer;
}
.job-list p {
  margin: 4px 0;
}
.job-list img {
  width: 80px;
}
.job-posting {
  display: flex;
}
.job-description {
  margin-left: 20px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}

.pagination span {
  margin: 0 10px;
}

.bold {
  font-weight: bold;
}
</style>
