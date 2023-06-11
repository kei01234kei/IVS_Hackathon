import { ClientFactory } from '@/lib/clientFactory';

const prompthonClient = ClientFactory.getPrompthonClient();

export const saveScore = async (score: Number) => {
  await prompthonClient.saveScore(score);
};

export const saveBestScore = async (bestScore: Number) => {
  await prompthonClient.saveBestScore(bestScore);
};
