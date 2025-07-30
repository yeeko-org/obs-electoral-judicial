<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import hlsQualitySelector from "videojs-hls-quality-selector";
import qualityLevels from "videojs-contrib-quality-levels";
import 'videojs-hls-quality-selector/dist/videojs-hls-quality-selector.css'


const props = defineProps({
  videoUrl: {
    type: String,
    required: true
  },
  videoPoster: {
    type: String,
    default: ''
  }
})

let player = ref(null)
const videoPlayer = ref(null)
// let player = null

onMounted(() => {

  // videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector)
  // videojs.registerPlugin('qualityLevels', qualityLevels)
  //
  // player.value = videojs(videoPlayer.value, {
  //   fluid: true,
  //   responsive: true,
  //   playbackRates: [0.5, 1, 1.25, 1.5, 2],
  //   html5: {
  //     hls: {
  //       enableLowInitialPlaylist: true,
  //       smoothQualityChange: true,
  //       overrideNative: true
  //     }
  //   },
  //   controls: true,
  //   autoplay: false,
  //   plugins: {
  //     hlsQualitySelector: {
  //       displayCurrentQuality: true,
  //     }
  //   },
  // })
  if (videoPlayer.value) {
    videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector);
    videojs.registerPlugin('qualityLevels', qualityLevels)

    const options = {
      fluid: true,
      responsive: true,
      playbackRates: [0.75, 1, 1.5, 2],
      controls: true,
      autoplay: false,
      preload: 'auto',
      // poster: props.videoPoster,
      // sources: [{
      //   src: props.videoUrl,
      //   type: 'application/x-mpegURL'
      // }],
      // Enable the quality selector plugin
      plugins: {
        hlsQualitySelector: {
          displayCurrentQuality: true,
        }
      }
    }

    // Initialize the player
    player.value = videojs(videoPlayer.value, options)
    player.value.on('loadstart', () => {
      console.log('Video loading started')
    })

    player.value.on('error', (error) => {
      console.error('Video error:', error)
    })
  }

})

onBeforeUnmount(() => {
  if (player.value) {
    if (videojs.getPlugin('hlsQualitySelector')) {
      videojs.deregisterPlugin('hlsQualitySelector');
    }
    player.value.dispose()
    player.value = null
    // console.log('Video.js player disposed')
  }})

</script>

<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      preload="auto"
      :poster="videoPoster"
      :plugins="{
        hlsQualitySelector: {
          displayCurrentQuality: true
        }
      }"
      data-setup="{}"
      playsinline
      _style="width: 400px; height: 300px;"
      style="min-width: 100%; width: 100%; min-height: 220px; height: 100%;"
    >
      <source
        :src="videoUrl"
        type="application/x-mpegURL"
      >
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that supports HTML5 video.
      </p>
    </video>
  </div>
</template>
<style scoped>
.video-js {
  width: 100%;
  height: auto;
}
</style>