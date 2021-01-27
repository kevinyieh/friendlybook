const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const msInSecond = 1000
const msInMinute = msInSecond * 60;
const msInHour = msInMinute * 60;
const msInDay = msInHour  * 24;
const msInWeek = msInDay * 7;
const msInMonth = msInDay * 30;
const msInYear = msInDay * 365;

const msToSeconds = ms => {
    return Math.floor(ms/msInSecond);
}
const msToMinutes = ms => {
    return Math.floor(ms/msInMinute);
}
const msToHours = ms => {
    return Math.floor(ms/msInHour);
}
const msToDays = ms => {
    return Math.floor(ms/msInDay);
}
const msToWeeks = ms => {
    return Math.floor(ms/msInWeek);
}
const msToMonths = ms => {
    return Math.floor(ms/msInMonth);
}
const msToYears = ms => {
    return Math.floor(ms/msInYear);
}


const convertToTime = (hours,minutes) => {
    const suffix = hours > 12 ? "PM" : "AM";
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    if (hours == 0) hours = 12;
    if(hours > 12){
        return `${hours-12}:${minutes} ${suffix}`
    }else{
        return `${hours}:${minutes} ${suffix}`
    }
}
export const timeRender = (createDate) => {
    const now = new Date();
    const postDate = new Date(createDate);
    const msDiff = Math.abs(now - postDate);
    if(msToDays(msDiff) > 1){
        return `${months[postDate.getMonth()]} ${postDate.getDate()} at ${convertToTime(postDate.getHours(),postDate.getMinutes())}`
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

export const commentTimeRender = (createDate) => {
    const now = new Date();
    const postDate = new Date(createDate);
    const msDiff = Math.abs(now - postDate);
    if(msToYears(msDiff) >= 1){
        return `${msToYears(msDiff)}y`
    }else if(msToWeeks(msDiff) >= 1){
        return `${msToWeeks(msDiff)}w`
    }else if(msToDays(msDiff) >= 1){
        return `${msToDays(msDiff)}d`
    }else if(msToHours(msDiff) >= 1){
        return `${msToHours(msDiff)}hrs`
    }else if(msToMinutes(msDiff) >= 1){
        return `${msToMinutes(msDiff)}m`
    }else{
        return `${msToSeconds(msDiff)}s`
    }
}