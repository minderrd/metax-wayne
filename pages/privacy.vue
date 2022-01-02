<template>
  <div class="bg-cloud">
    <v-container justify="center">
      <v-card outlined>
        <v-card-text>
          <div class="markdown-body" v-html="privacy" />
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import privacy from '@/privacy.md'

export default {
  name: 'PravicyPage',
  data() {
    return {
      privacy,
    }
  },
}
</script>

<style>
.bg-cloud {
  /* fallback for old browsers */
  background: #ECE9E6;
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}

.markdown-body {
  background: none;
  color: #555555
}
</style>
