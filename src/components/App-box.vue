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
      const relationships = this.boxData.relationships
      console.log('left:', this.left, 'top: ', this.top)
      console.log(this.box.getBoundingClientRect())
      const coordsPointers = this.calculateCoordsPoints()
      const box = {
        id: this.boxData.id,
        relationships: {
          top: { id: 1, pointKey: relationships.top.pointKey, boxId: relationships.top.boxId, x: coordsPointers.topPointer.x, y: coordsPointers.topPointer.y },
          left: { id: 2, pointKey: relationships.left.pointKey, boxId: relationships.left.boxId, x: coordsPointers.leftPointer.x, y: coordsPointers.leftPointer.y },
          bottom: { id: 3, pointKey: relationships.bottom.pointKey, boxId: relationships.bottom.boxId, x: coordsPointers.bottomPointer.x, y: coordsPointers.bottomPointer.y },
          right: { id: 4, pointKey: relationships.right.pointKey, boxId: relationships.right.boxId, x: coordsPointers.rightPointer.x, y: coordsPointers.rightPointer.y },
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
    calculateCoordsPoints() {
      const coordsBox = this.box.getBoundingClientRect()
      const widthBox = coordsBox.width
      const topPointer = {
        x: coordsBox.left + (widthBox / 2),
        y: coordsBox.top
      }
      const rightPointer = {
        x: coordsBox.right,
        y: coordsBox.top + (widthBox / 2)
      }
      const bottomPointer = {
        x: coordsBox.left + (widthBox / 2),
        y: coordsBox.bottom
      }
      const leftPointer = {
        x: coordsBox.left,
        y: coordsBox.top + (widthBox / 2)
      }

      return {topPointer, rightPointer, bottomPointer, leftPointer}
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
