export const saveDay = (entry) => {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(entry);

  if (data.length > 30) data.shift(); // keep last 30 days

  localStorage.setItem("data", JSON.stringify(data));
};

export const getData = () => {
  return JSON.parse(localStorage.getItem("data")) || [];
};