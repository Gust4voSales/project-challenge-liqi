export function getCurrentTimeUnix() {
  return Math.floor(+Date.now() / 1000); // Timestamp in seconds 
}