import { PrompthonClient } from '@/lib/prompthonClient';
import { MemoryRepository } from '@/repository/memoryRepository';
import { MixRepository } from '@/repository/mixRepository';

export class ClientFactory {
  private static prompthonClient: PrompthonClient;
  private constructor() {}
  static getPrompthonClient(): PrompthonClient {
    if (this.prompthonClient == null) {
      // memoery mode
      // this.prompthonClient = new PrompthonClient(new MemoryRepository());
      // mix mode
      this.prompthonClient = new PrompthonClient(new MixRepository());
    }
    return this.prompthonClient;
  }
}
