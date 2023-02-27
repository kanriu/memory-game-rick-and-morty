export const randomMinMax = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Algoritmo de Fisher-Yates
export const shuffle = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
