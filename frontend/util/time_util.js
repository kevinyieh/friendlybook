const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const msInDay = (1000 * 60 * 60 * 24);
const msInHour = (1000 * 60 * 60);
const msInMinute = (1000 * 60);
const msToDays = ms => {
    return Math.floor(ms/msInDay);
}
const msToHours = ms => {
    return Math.floor(ms/msInHour);
}
const msToMinutes = ms => {
    return Math.floor(ms/msInMinute);
}
const convertToTime = (hours,minutes) => {
    const suffix = hours > 12 ? "PM" : "AM";
    if(hours > 12){
        return `${hours-12}:${minutes} ${suffix}`
    }else{
        return `${hours}:${minutes} ${suffix}`
    }
}
export const timeRender = (createDate) => {
    const now = new Date();
    const postDate = new Date(createDate);
    const msDiff = now - postDate;
    debugger;
    if(msToDays(msDiff) > 1){
        return `${months[postDate.getMonth()]} ${postDate.getDay()} at ${convertToTime(postDate.getHours(),postDate.getMinutes())}}`
    }else if(msToDays(msDiff) == 1){
        return `Yesterday at ${convertToTime(postDate.getHours(),postDate.getMinutes())}`;
    }else if(msToHours(msDiff) >= 1){
        return `${msToHours(msDiff)} hrs`;
    }else if(msToMinutes(msDiff) >= 1){
        return `${msToMinutes(msDiff)} mins`;
    }else{
        return "Just now"
    }
}