export const transformStatesData = (data) => {
    return data?.data?.statewise ||  [];
}

export const transformDistrictData = (data) => {
    return data?.data ||  {};
}