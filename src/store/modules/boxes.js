export default {
    namespaced: true,
    state: [
        {
            id: 1,
            pointer: {
                top: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                left: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                bottom: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                right: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
            }
        },
        {
            id: 2,
            pointer: {
                top: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                left: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                bottom: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
                right: {
                    relationship: {
                        status: 'empty',
                        connect: null,
                        connectId: null
                    },
                    coordinates: { x: 0, y: 0 }
                },
            }
        },
    ],
    getters: {
        getBoxById: state => id => state.filter(box => box.id === id)[0],
        boxes: state => state
    },
    mutations: {
        updateCoordinationPointer(state, {boxId, coordinates}) {
            const boxPointer = this.getters['Boxes/getBoxById'](boxId).pointer
            Object.keys(coordinates).forEach(key => {
                boxPointer[key].coordinates = coordinates[key]
            })
        },
        updatePointStatus(state, { boxId, pointKey, status}) {
            const box =  this.getters['Boxes/getBoxById'](boxId)
            box.pointer[pointKey].relationship.status = status;
        },
        connectionOfBoxes(state, { firstConnect, secondConnect, connectionKey }) {
            const relationship = { firstConnect, secondConnect }
            const firstBox = this.getters['Boxes/getBoxById'](firstConnect.boxId)
            const secondBox = this.getters['Boxes/getBoxById'](secondConnect.boxId)
            const firstBoxRelationship = firstBox.pointer[firstConnect.pointKey].relationship
            const secondBoxRelationship =  secondBox.pointer[secondConnect.pointKey].relationship
            firstBoxRelationship.connect = relationship
            firstBoxRelationship.status = 'ready'
            firstBoxRelationship.connectId = connectionKey
            secondBoxRelationship.connect = relationship
            secondBoxRelationship.status = 'ready'
            secondBoxRelationship.connectId = connectionKey
        },
        deleteConnectionOfBoxes(state, relationship) {
            const firstBox = this.getters['Boxes/getBoxById'](relationship.connect.firstConnect.boxId)
            const secondBox = this.getters['Boxes/getBoxById'](relationship.connect.secondConnect.boxId)
            const firstBoxPoint = firstBox.pointer[relationship.connect.firstConnect.pointKey]
            const secondBoxPoint = secondBox.pointer[relationship.connect.secondConnect.pointKey]
            firstBoxPoint.relationship.connectId = null
            firstBoxPoint.relationship.connect = null
            firstBoxPoint.relationship.status = 'empty'
            secondBoxPoint.relationship.connectId = null
            secondBoxPoint.relationship.connect = null
            secondBoxPoint.relationship.status = 'empty'
        }
    }
}
