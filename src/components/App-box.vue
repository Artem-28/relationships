<template>
  <div class="box" ref="box"
       @mousedown.self="start"
       @mouseup.self="stop"
       :style="{left, top}"
  >
    <div
        v-for="(point, key) in boxData.relationships"
        :key="point.id"
        @click="$emit('click', { boxId: boxData.id, pointKey: key })"
        class="connect-point"
        :class="`point-${key}`"
        :ref="key"
    />
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "App-box",
  props: ['boxData'],
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
      this.box = this.$refs.box
      //Устанавливаем сдвиг относительно указателя мыши
      this.shiftX = event.clientX - this.box.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.box.getBoundingClientRect().top;
      // удаляем браузерное событие
      this.box.ondragstart = () => false;
      // положим box в не relative блок
      document.body.append(this.box);
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
      const pointTop = this.$refs.top[0].getBoundingClientRect()
      const pointLeft = this.$refs.left[0].getBoundingClientRect()
      const pointBottom = this.$refs.bottom[0].getBoundingClientRect()
      const pointRight = this.$refs.right[0].getBoundingClientRect()
      const relationships = this.boxData.relationships
      const box = {
        id: this.boxData.id,
        relationships: {
          top: { id: 1, pointKey: relationships.top.pointKey, boxId: relationships.top.boxId, x: pointTop.left, y: pointTop.top },
          left: { id: 2, pointKey: relationships.left.pointKey, boxId: relationships.left.boxId, x: pointLeft.left, y: pointTop.top },
          bottom: { id: 3, pointKey: relationships.bottom.pointKey, boxId: relationships.bottom.boxId, x: pointBottom.left, y: pointBottom.top },
          right: { id: 4, pointKey: relationships.right.pointKey, boxId: relationships.right.boxId, x: pointRight.left, y: pointRight.top },
        }
      }
      this.$emit('update-box', box)
      this.left = event.pageX - this.shiftX + 'px';
      this.top = event.pageY - this.shiftY + 'px';
    },
    // отпускаем box удаляем ненужные события
    stop() {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.box.onmouseup = null;
    },
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
  .connect-point {
    z-index: 2;
    position: absolute;
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
