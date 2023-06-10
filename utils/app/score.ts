export const saveScore = (score: Number) => {
  localStorage.setItem('score', score.toString());
};

export const saveBestScore = (score: Number) => {
  localStorage.setItem('bestScore', score.toString());
};
