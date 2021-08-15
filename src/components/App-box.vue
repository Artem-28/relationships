<template>
  <div class="box" ref="box"
       @mousedown.self="start"
       @mouseup.self="stop"
       :style="{left, top}"
  >
    <div
        v-for="(point, key) in boxData.pointer"
        :key="key"
        @click="$emit('click', { boxId: boxData.id, pointKey: key })"
        class="connect-point"
        :class="`point-${key} ${point.relationship.status}`"
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
      fieldCoordinates: null,
      left: 0,
      top: 0,
      shiftX: 0,
      shiftY: 0
    }
  },
  methods: {
    start(event) {
      //Устанавливаем сдвиг относительно указателя мыши
      this.shiftX = event.clientX - this.box.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.box.getBoundingClientRect().top;
      // удаляем браузерное событие
      this.box.ondragstart = () => false;
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
      this.updateCoordinatesPointersBox()
      this.left = event.pageX - this.fieldCoordinates.left - this.shiftX + 'px';
      this.top = event.pageY - this.fieldCoordinates.top - this.shiftY + 'px';
    },
    // отпускаем box удаляем ненужные события
    stop() {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.box.onmouseup = null;
    },
    updateCoordinatesPointersBox() {
      const coordsPointers = this.calculateCoordsPoints()
      const box = {
        id: this.boxData.id,
        coordinates: {
          top: { x: coordsPointers.topPointer.x, y: coordsPointers.topPointer.y },
          left: { x: coordsPointers.leftPointer.x, y: coordsPointers.leftPointer.y },
          bottom: { x: coordsPointers.bottomPointer.x, y: coordsPointers.bottomPointer.y},
          right: { x: coordsPointers.rightPointer.x, y: coordsPointers.rightPointer.y},
        }
      }
      this.$emit('update-box', box)
    },
    calculateCoordsPoints() {
      const widthBox = this.box.getBoundingClientRect().width
      const coordsBox = {
        left: this.box.offsetLeft,
        top: this.box.offsetTop,
        right: this.box.offsetLeft + widthBox,
        bottom: this.box.offsetTop + widthBox
      }
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
  },
  mounted() {
    this.box = this.$refs.box
    this.fieldCoordinates = this.box.parentNode.getBoundingClientRect()
    this.updateCoordinatesPointersBox()
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
  .empty {
    background: cornflowerblue;
  }
  .wait {
    background: gold;
  }
  .ready {
    background: green;
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
