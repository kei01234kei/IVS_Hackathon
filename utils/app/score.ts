import { PrompthonClient } from '@/lib/prompthonClient';

const prompthonClient = new PrompthonClient('MOCK');

export const saveScore = async (score: Number) => {
  await prompthonClient.saveScore(score);
};

export const saveBestScore = async (bestScore: Number) => {
  await prompthonClient.saveBestScore(bestScore);
};
