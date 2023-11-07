const lowerCase = (value: any): string => {
    return String(value)?.toLocaleLowerCase()
}

export const useArray = (
    state: Array<any>,
    method: string,
    item: any,
    key: string | object = 'id'
): Array<any> => {
    if (method == 'add') {
        state.push(item)
        return state
    }

    if (method == 'update' && typeof key == 'string') {
        const index = state.findIndex(el => el?.[key] === item?.[key])
        state.splice(index, 1, item)
        return state
    }

    if (method == 'remove' && typeof key == 'string') {
        if (typeof item === 'number') {
            state.splice(item, 1)
            return state
        }

        state = state.filter(el => el?.[key] !== item?.[key])
        return state
    }

    if (method == 'filter' && typeof item == 'object') {
        const filter = Object.keys(item)
        for (const iterator of filter) {
            if (String(item?.[iterator])) {
                state = state.filter(el => lowerCase(item?.[iterator]) .includes(lowerCase(el?.[iterator])) )
            }
        }
    }

    return state
}
