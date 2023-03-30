import { purple, red, green, pink, blue } from "@mui/material/colors";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomColor() {
  const randomInt = getRandomInt(5);
  const colorObj = {
    0: purple,
    1: red,
    2: green,
    3: pink,
    4: blue,
  };

  return colorObj[randomInt][500];
}
