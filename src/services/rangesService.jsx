export const getRanges = () => {
  return fetch("http://localhost:8088/ranges")
    .then(res => res.json())
}