export const saveScore = (score: Number) => {
  localStorage.setItem('score', score.toString());
};
