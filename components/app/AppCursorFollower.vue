<template lang="pug">
.cursor-follower(ref="layout")
  .follower.yellow(
    ref="follower"
    :style="{ width: `${followerSize}px`, height: `${followerSize}px`, left: `${followerPositionX}px`, top: `${followerPositionY}px` }"
  )
    .follower-mouth
</template>

<script>
export default {
  name: 'AppCursorFollower',
  data() {
    return {
      followerSize: 16,
      followerPositionX: 60,
      followerPositionY: 60,
      x: null,
      y: null,
      followerCenterX: null,
      followerCenterY: null,
      mouseTop: false,
      mouseBottom: false,
      directionX: null,
      directionY: null,
      runInterval: null,
      updatePositionInterval: null,
    }
  },
  mounted() {
    // await this.$nextTick()
    // this.createFood()
    this.runFollower()
    this.updatePositionData()
  },
  beforeDestroy() {
    clearInterval(this.runInterval)
    clearInterval(this.updatePositionInterval)
  },
  methods: {
    createFood() {
      const food = document.createElement('div')
      food.classList.add('follower-food')
      const left = Math.random() * window.innerWidth
      const top = Math.random() * window.innerHeight
      food.style.left = `${left}px`
      food.style.top = `${top}px`
      food.style.position = 'absolute'
      food.style.width = '4px'
      food.style.height = '4px'
      food.style.background = 'red'
      const layout = this.$refs.layout
      layout.append(food)
    },
    eatFood() {
      const { offsetLeft: foodOffsetLeft, offsetTop: foodOffsetTop } =
        document.querySelector('.follower-food')
      const { foodCenterX, foodCenterY } = {
        foodCenterX: foodOffsetLeft + 2,
        foodCenterY: foodOffsetTop + 2,
      }
    },
    listenMousePosition() {
      window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e

        this.x = x
        this.y = y
      })
    },
    runFollower() {
      this.listenMousePosition()

      this.followerPositionX = window.innerWidth * 0.9
      this.followerPositionY = window.innerHeight * 0.5

      this.runInterval = setInterval(() => {
        const follower = this.$refs.follower

        const { offsetLeft, offsetTop } = follower
        this.followerCenterX = offsetLeft + this.followerSize / 2
        this.followerCenterY = offsetTop + this.followerSize / 2
        const followerGotMouse = this.followerCenterX === this.x && this.followerCenterY === this.y

        if (!followerGotMouse) {
          if (this.followerCenterX !== this.x)
            this.followerPositionX = Math.round(+this.followerPositionX + this.directionX)
          if (this.followerCenterY !== this.y)
            this.followerPositionY = Math.round(+this.followerPositionY + this.directionY)
        }
      }, 1)
    },
    updatePositionData() {
      this.updatePositionInterval = setInterval(() => {
        const { offsetLeft, offsetTop } = this.$refs.follower

        this.followerCenterX = offsetLeft + this.followerSize / 2
        this.followerCenterY = offsetTop + this.followerSize / 2
        const { mouseTop, mouseLeft } = {
          mouseTop: this.y < this.followerCenterY,
          mouseLeft: this.x < this.followerCenterX,
        }

        this.directionX = mouseLeft ? -1 : 1
        this.directionY = mouseTop ? -1 : 1
      }, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-follower {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;

  .follower {
    z-index: 9;
    position: absolute;
    border-radius: 50%;
    right: 10%;
    top: 50%;
    overflow: hidden;

    .follower-mouth {
      position: absolute;
      width: 100%;
      height: 100%;
      background: $primary-background;
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
      animation-name: mouthAnimation;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes mouthAnimation {
    0% {
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
    }
    50% {
      clip-path: polygon(100% 50%, 44% 48%, 100% 50%);
    }
    100% {
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
    }
  }
}
</style>