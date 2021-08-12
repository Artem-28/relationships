<template>
  <div id="app">
    <div class="wrapper">
      <app-box/>
    </div>
  </div>
</template>

<script>
import AppBox from "./components/App-box";

export default {
  name: 'App',
  components: {
    AppBox,
  },
  data() {
    return {
      box: null,
      left: 0,
      top: 0,
      shiftX: 0,
      shiftY: 0
    }
  },
  methods: {
    /*start(event) {
      const ball = event.path[0]
     /!* const ball = this.$refs.box*!/
      //Устанавливаем сдвиг относительно указателя мыши
      this.shiftX = event.clientX - ball.getBoundingClientRect().left;
      this.shiftY = event.clientY - ball.getBoundingClientRect().top;
      // удаляем браузерное событие
      ball.ondragstart = () => false;
      // положим box в не relative блок
      document.body.append(ball);
      // перетаскиваем box под указатель мыши
      this.moveAt(event);
      // передвигаем box при событии mousemove
      document.addEventListener('mousemove', this.onMouseMove);
    },

    // передвигаем box при событии mousemove
    onMouseMove(event) {
      this.moveAt(event);
    },
    // переносит box на координаты (pageX, pageY),
    moveAt(event) {
      this.left = event.pageX - this.shiftX + 'px';
      this.top = event.pageY - this.shiftY + 'px';
    },
    // отпускаем box удаляем ненужные события
    stop() {
      const ball = this.$refs.box
      document.removeEventListener('mousemove', this.onMouseMove);
      ball.onmouseup = null;
      console.log(ball)
    },
  }*/
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
.wrapper {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;
  border: 1px solid black;
}

</style>
