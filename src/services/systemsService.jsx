export const getSystems = () => {
  return fetch("http://localhost:8088/systems")
    .then(res => res.json())
}