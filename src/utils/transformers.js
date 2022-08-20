export const transformStatesData = (data) => {
    const stateWise = data?.data?.statewise ||  [];
    const stateWiseObject = stateWise.reduce((acc, curr) => {
        acc[curr.state] = {
            ...curr
        };
        return acc
    }, {});
    
    return stateWiseObject;
}

export const transformDistrictData = (data) => {
    return data?.data ||  {};
}