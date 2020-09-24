export const errorAndBlank = (error, state) => {
    if(error && !state) return true;
    return false;
}