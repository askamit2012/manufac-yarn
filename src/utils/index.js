export const getMeanData = ( ...args ) => {
    let [type, ...all] = args;
    let mean = {}
    all.forEach(arg => {
        if(arg[0]?.Alcohol === 1) {
            mean.c1 = getMean(arg, type).toFixed(3) 
        } else if(arg[0]?.Alcohol === 2) {
            mean.c2 = getMean(arg, type).toFixed(3)
        } else {
            mean.c3 = getMean(arg, type).toFixed(3)
        }
    })
    return {
        mean: mean
    }
}

function getMean(data, type) {
    let sum = 0, average = 0;
    data?.forEach(item => {
        sum = sum + (+item?.[type])
    })
    return sum / data?.length
}

export const getMedianData = ( ...args ) => {
    const [type, ...all] = args;
    let median = { }
    all.forEach(arg => {
        if(arg[0]?.Alcohol === 1) {
            median.c1 = getMedian(arg, type).toFixed(3)  
        } else if(arg[0]?.Alcohol === 2) {
            median.c2 = getMedian(arg, type).toFixed(3)
        } else {
            median.c3 = getMedian(arg, type).toFixed(3)
        }
    })
    return {
        median: median
    } 
}

function getMedian(data, type) {
  data.sort((a, b) => a?.Flavanoids - b?.Flavanoids)
    if(data.length % 2 !== 0) {
        return data?.[Math.round(data?.length / 2)]?.Flavanoids
    } else {
        let median1 = data?.[(Math.round(data.length / 2)) - 1]?.Flavanoids
        let median2 = data?.[(data.length / 2)]?.Flavanoids
        return (median1 + median2) / 2
    }
}

export const getModeData = ( ...args ) => {
    const [type, ...all] = args;
    let mode = { }
    all.forEach(arg => {
        if(arg[0]?.Alcohol === 1) {
            mode.c1 = getMode(arg, type)
        } else if(arg[0]?.Alcohol === 2) {
            mode.c2 = getMode(arg, type)
        } else {
            mode.c3 = getMode(arg, type)
        }
    })
    return {
        mode: mode
    }
}

function getMode(data, type) {
    let countObj = { };
    data.forEach(item => {
        if(countObj[item?.[type]]) {
            countObj[item?.[type]] = countObj[item?.[type]] + 1
        } else {
            countObj[item?.[type]] = 1
        }
    });
    let modeVal = 0
    for(let key in countObj) {
        if(countObj[key] > modeVal) {
            modeVal = key
        }
    }
    return modeVal
}
