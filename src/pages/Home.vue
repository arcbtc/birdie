<template>
  <q-page class="px-4 py-6">
    <div class="text-xl">What is Nostr?</div>
    <div class="text-lg q-pt-lg">A decentralized network based on cryptographic keypairs and that is not peer-to-peer, it is super simple and scalable and therefore has a chance of working. Read more about the <a href="https://github.com/nostr-protocol/nostr">protocol</a>. You can also reach us at our <a href="https://t.me/nostr_protocol">Telegram group</a> (while we don't have a decent group chat application fully working on Nostr).</div>
    <div class="text-xl q-pb-lg q-pt-lg">Great Nostr projects</div>

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
        'name': 'Nostr Gateway',
        'description': 'Pull Nostr data from relays',
        'image': 'gateway.png',
        'link': 'https://gateway.nostr.com'
      },
      {
        'name': 'Nostr.ch',
        'description': 'Nostr web client',
        'image': 'nostrch.png',
        'link': 'https://nostr.ch'
      },
      {
        'name': 'Jester',
        'description': 'Chess over nostr',
        'image': 'jester.png',
        'link': 'Jester - Chess over nostr'
      },
      {
        'name': 'Nostros',
        'description': 'Nostr mobile client',
        'image': 'nostros.png',
        'link': 'https://github.com/KoalaSat/nostros'
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
