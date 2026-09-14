const timeformate = (minutes) =>
{
    const hour = Math.floor(minutes/60);
    const remainder = minutes % 60;
    return `${hour}h ${remainder}m`;
}
export default timeformate;