// Anti-spam
const usedCommandRecently = new Set()

const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 15000) // 15 seconds delay.
}

module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
}