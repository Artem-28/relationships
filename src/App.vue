<template>
  <div id="app">
    <div class="wrapper">
      <app-box
          v-for="box in boxesT"
          :key="box.id"
          :box-data="box"
          @click="updateConnection"
          @update-box="updateBox"
      />
      <svg class="field">
        <line
            v-for="(coords, key) in coordinationLine"
            :key="key"
            stroke="red"

            :x1="getBoxById(coords.firstConnect.boxId).pointer[coords.firstConnect.pointKey].coordinates.x"
            :x2="getBoxById(coords.secondConnect.boxId).pointer[coords.secondConnect.pointKey].coordinates.x"
            :y1="getBoxById(coords.firstConnect.boxId).pointer[coords.firstConnect.pointKey].coordinates.y"
            :y2="getBoxById(coords.secondConnect.boxId).pointer[coords.secondConnect.pointKey].coordinates.y"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import AppBox from "./components/App-box";
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    AppBox,
  },
  computed: {
    ...mapGetters({
      connectionData: "Relationship/connectionData",
      boxesT: "Boxes/boxes",
      coordinationLine: "Relationship/coordinationLine",
      isReadyConnection: "Relationship/isReadyConnection",
      isEmptyConnection: "Relationship/isEmptyConnection",
      firstConnect: "Relationship/firstConnect",
      getBoxById: "Boxes/getBoxById",
    }),
  },
  methods: {
    ...mapMutations({
      updateCoordinationPointer: "Boxes/updateCoordinationPointer",
      updatePointStatus: "Boxes/updatePointStatus",
      addedConnect: "Relationship/addedConnect",
      replaceConnect: "Relationship/replaceConnect",
      connectionOfBoxes: "Boxes/connectionOfBoxes",
      addedCoordinationLine: "Relationship/addedCoordinationLine",
      deleteConnectionOfBoxes: "Boxes/deleteConnectionOfBoxes",
      deleteCoordinationLine: "Relationship/deleteCoordinationLine"
    }),

    updateBox(boxData) {
      this.updateCoordinationPointer({ boxId: boxData.id, coordinates: boxData.coordinates })
    },

    updateConnection(data){
      const currentBox = this.getBoxById(data.boxId)
      const currentPoint = currentBox.pointer[data.pointKey]

      if (currentPoint.relationship.status === 'ready') {
        const connectId = this.getBoxById(data.boxId).pointer[data.pointKey].relationship.connectId
        this.deleteCoordinationLine(connectId)
        this.deleteConnectionOfBoxes(currentPoint.relationship)

        if(this.isEmptyConnection) return;
      }

      if(this.isEmptyConnection) {
        this.addedConnect(data)
        this.updatePointStatus({boxId: data.boxId, pointKey: data.pointKey, status: 'wait'})

        return
      }

      if(this.firstConnect.boxId === data.boxId) {
        const oldConnect = this.firstConnect
        this.updatePointStatus({boxId: oldConnect.boxId, pointKey: oldConnect.pointKey, status: 'empty'})
        this.replaceConnect(data)
        this.updatePointStatus({boxId: data.boxId, pointKey: data.pointKey, status: 'wait'})

        return
      }
      this.addedConnect(data)
    },

    generateKeyForMap({firstConnect, secondConnect}) {
      return `${firstConnect.boxId}-${firstConnect.pointKey}-${secondConnect.boxId}-${secondConnect.pointKey}`
    }
  },
  watch: {
    isReadyConnection() {
      if(this.isReadyConnection){
        const key = this.generateKeyForMap(this.connectionData)
        this.connectionOfBoxes({...this.connectionData, connectionKey: key})
        this.addedCoordinationLine(key)
      }
    }
  }

}
</script>

<style lang="scss">
#app {
  width: 100%;
  padding: 100px;
  height: 100vh;
}
.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 700px;
  border: 1px solid black;
}
.field {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 700px;
  opacity: 0.5;
}

</style>
