import {PrompthonClient} from '@/lib/prompthonClient';

async function main(){
  const client = new PrompthonClient("test")
  console.log("🚀 ~ file: index.ts:6 ~ main ~ client:", client)
  const res = await client.getProblem(1,1)
  console.log("🚀 ~ file: index.ts:8 ~ main ~ res:", res)
}

main()