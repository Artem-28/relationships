<template>
  <div id="app">
    <div class="wrapper">
      {{connection}}
      {{coordsMap}}
      <app-box
          v-for="box in boxes"
          :key="box.id"
          :box-data="box"
          @click="test"
          @update-box="updateBox"
      />
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
      connection: [],
      coordsMap: [],
      boxes: [
        {
          id: 1,
          relationships: {
            top: { id: 1, pointKey: null, boxId: null, x: 0, y: 0 },
            left: { id: 2, pointKey: null, boxId: null, x: 0, y: 0 },
            bottom: { id: 3, pointKey: null, boxId: null, x: 0, y: 0 },
            right: { id: 4, pointKey: null, boxId: null, x: 0, y: 0 },
          }
        },
        {
          id: 2,
          relationships: {
            top: { id: 1, pointKey: null, boxId: null, x: 0, y: 0 },
            left: { id: 2, pointKey: null, boxId: null, x: 0, y: 0 },
            bottom: { id: 3, pointKey: null, boxId: null, x: 0, y: 0 },
            right: { id: 4, pointKey: null, boxId: null, x: 0, y: 0 },
          }
        },

      ],
    }
  },
  methods: {
    updateBox(boxData) {
      const box = this.searchBoxById(boxData.id)
      box.relationships = boxData.relationships

    },
    test({boxId, pointKey}) {
      const currentBox = this.searchBoxById(boxId)
      const currentPoint = currentBox.relationships[pointKey];
      if(currentPoint.boxId !== boxId) {
        this.updateConnection({boxId, pointKey})
      }
    /*  console.log(pointKey)
      console.log(currentPoint)*/
    },
    searchBoxById(id) {
      return this.boxes.filter(box => box.id === id)[0]
    },
    updateConnection(data){
      if(!this.connection.length) {
        this.connection.push(data)
        return
      }
      const firstPoint = this.connection[0];
      /*console.log('first', firstPoint.boxId)
      console.log(data)*/
      if(firstPoint.boxId === data.boxId) {
        this.connection.splice(0, 1, data)
        return
      }
      this.connection.push(data)
    },
    generateKeyToCoordsMap({firstPoint, secondPoint}) {
      return `${firstPoint.boxId}-${firstPoint.pointKey}-${secondPoint.boxId}-${secondPoint.pointKey}`
    },
    updateCoords(key, coords) {
      this.coordsMap.push(key)
      /*if(this.coordsMap.hasOwnProperty(key)) {
        delete this.coordsMap[key];
        return
      }
      this.coordsMap[key] = coords*/
    }
  },
  watch: {
    connection() {
      if(this.connection.length === 2) {
        const firstPoint = this.connection[0];
        const secondPoint = this.connection[1];
        const firstBox = this.searchBoxById(firstPoint.boxId)
        const secondBox = this.searchBoxById(secondPoint.boxId)
        const firstRelationship = firstBox.relationships[firstPoint.pointKey]
        const secondRelationship = secondBox.relationships[secondPoint.pointKey]
        firstRelationship.pointKey = secondPoint.pointKey
        firstRelationship.boxId = secondPoint.boxId
        secondRelationship.pointKey = firstPoint.pointKey
        secondRelationship.boxId = firstPoint.boxId
        const key = this.generateKeyToCoordsMap({firstPoint, secondPoint})
        const coords = {
          firstRelationship,
          secondRelationship
         /* x1: firstRelationship.x,
          x2: firstRelationship.y,
          y1: secondRelationship.x,
          y2: secondRelationship.y*/
        }
        this.updateCoords(key, coords)
        this.connection.length = 0
      }
    }
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
