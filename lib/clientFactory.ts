import { PrompthonClient } from '@/lib/prompthonClient';
import { MemoryRepository } from '@/repository/memoryRepository';

export class Factory {
  private static prompthonClient: PrompthonClient;
  private constructor() { }
  static getPrompthonClient(): PrompthonClient {
    if (this.prompthonClient == null) {
      this.prompthonClient = new PrompthonClient(new MemoryRepository);
    }
    return this.prompthonClient
  }
}