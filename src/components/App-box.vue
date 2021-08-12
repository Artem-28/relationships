<template>
  <div class="box" ref="box"
       @mousedown="start"
       @mouseup="stop"
       :style="{left, top}"
  >
    <div class="box__content">
      <div @click.stop="test" class="box__connect-point point-top" />
      <div class="box__connect-point point-right" />
      <div class="box__connect-point point-bottom" />
      <div class="box__connect-point point-left" />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "App-box",
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
    start(event) {
      console.log(event)
      this.box = event.path[0]
      //Устанавливаем сдвиг относительно указателя мыши
      this.shiftX = event.clientX - event.path[0].getBoundingClientRect().left;
      this.shiftY = event.clientY - event.path[0].getBoundingClientRect().top;
      // удаляем браузерное событие
      this.box.ondragstart = () => false;
      // положим box в не relative блок
     /* document.body.append(this.box);*/
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
      document.removeEventListener('mousemove', this.onMouseMove);
      this.box.onmouseup = null;
    },
    test(event){
      event.stopImmediatePropagation()
      console.log('click')
    }
  }

}
</script>

<style lang="scss">
.box {
  z-index: 1;
  position: absolute;
  width: 100px;
  height: 100px;
  background: green;
  &__content {
    position: relative;
  }
  &__connect-point {
    z-index: 2;
    position: relative;
    width: 30px;
    height: 30px;
    background: red;
    border-radius: 50%;
    border: 4px solid #fff;
  }
  .point-top {
    left: 31px;
    top: -19px
  }
  .point-right {
    top: 31px;
    right: -19px;
  }
  .point-bottom {
    top: 81px;
    left: 31px;
  }
  .point-left {
    top: 31px;
    left: -19px;
  }
}
</style>
