import {PrompthonClient} from '@/lib/prompthonClient';
import {MemoryRepository} from '@/repository/memoryRepository';

async function main(){
  const client = new PrompthonClient(new MemoryRepository())
  console.log("🚀 ~ file: index.ts:6 ~ main ~ client:", client)
  const res = await client.getProblem(1,1)
  console.log("🚀 ~ file: index.ts:8 ~ main ~ res:", res)
  const memory = new MemoryRepository()
  const competitions = await memory.getProblem(1,1)
  console.log("🚀 ~ file: index.ts:11 ~ main ~ competitions:", competitions)
}

main()