export default {
    namespaced: true,
    state: {
        connection: [],
        coordinationLine: {}
    },
    getters: {
        firstConnect: state => state.connection[0],
        coordinationLine: state => state.coordinationLine,
        isReadyConnection: state => state.connection.length === 2,
        isEmptyConnection: state => !state.connection.length,
        connectionData: (state, getters) => {
            return {
                firstConnect: getters.firstConnect,
                secondConnect: state.connection[1],
            }
        }
    },
    mutations: {
        addedConnect: (state, connect) => {
            state.connection.push(connect);
        },
        replaceConnect: (state, connect) => {
            state.connection.splice(0, 1, connect)
        },
        addedCoordinationLine(state, key) {
            const coordinationLine = {...state.coordinationLine}
            coordinationLine[key] = this.getters['Relationship/connectionData']
            state.coordinationLine = coordinationLine
            state.connection.length = 0
        },
        deleteCoordinationLine: (state, connectId) => {
            const coordinationLine = {...state.coordinationLine}
            delete coordinationLine[connectId]
            state.coordinationLine = coordinationLine
        }
    }
}
