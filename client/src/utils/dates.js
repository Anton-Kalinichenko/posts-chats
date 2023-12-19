export const formatTimeString = (timeString) => {
    const date = new Date(timeString);
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    };
    return date.toLocaleString('en-us', options);
}
