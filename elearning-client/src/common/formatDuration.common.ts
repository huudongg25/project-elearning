export const formatDuration = (duration:number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - hours * 3600 - minutes * 60;
    return `${hours}:${minutes}:${seconds}`
}