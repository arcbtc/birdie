<template>
  <q-page class="px-4 py-6">
    <div class="text-xl q-pb-lg">Great NOSTR Projects</div>
    <div class="text-md q-pb-lg">A collection of great NOSTR projects. To contribute please add to </div>
<div class="row q-col-gutter-md">
  <div
    v-for="project in projects"
    :key="project.image"
    class="col-6 col-lg-4 col-lg-3"
  >
   <a :href="project.link"><q-card class="my-card">
      <q-img :src="project.image">
        <div class="absolute-bottom">
          <div class="text-h6">{{project.name}}</div>
          <div class="text-subtitle2">{{project.description}}</div>
        </div>
      </q-img>
    </q-card></a>
</div></div>
  </q-page>
</template>

<script>

import helpersMixin from '../utils/mixin'

export default {
  name: 'Settings',
  mixins: [helpersMixin],

  data() {
    return {
      projects: [
      {
        'name': 'Awesome NOSTR',
        'description': 'Collection of great NOSTR things',
        'image': '/awesome_nostr.png',
        'link': 'https://github.com/aljazceru/awesome-nostr'
      },
      {
        'name': 'Anigma',
        'description': 'Telegram like client',
        'image': '/anigma.png',
        'link': 'https://anigma.io'
      },
      {
        'name': 'Damus',
        'description': 'A twitter-like nostr client for iPhone, iPad and MacOS.',
        'image': '/damus.png',
        'link': 'https://github.com/damus-io/damus'
      },
      {
        'name': 'Branle',
        'description': 'A twitter type nostr web client',
        'image': 'branle.png',
        'link': 'https://github.com/fiatjaf/branle'
      },
      {
        'name': 'Nvote',
        'description': 'Reddit/HackerNews NOSTR client',
        'image': 'nvote.png',
        'link': 'https://github.com/rdbell/nvote'
      },
      {
        'name': 'Anigma',
        'description': 'Telegram like client',
        'image': '../images/anigma.png',
        'link': 'https://anigma.io'
      }
    ]
    }
  },
  mounted() {
    console.log('this.projects')
    console.log(this.projects)
    console.log('this.projects')
    fetch('../utils.nostrprojects.json')
      .then((response) => response.json())
      .then((json) => console.log(json))
  }
}
</script>
