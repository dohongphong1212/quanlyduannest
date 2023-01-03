// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { typecontract } from './typeContractSeed';

const prisma = new PrismaClient();

async function main() {
    for(let typecontracts of typecontract){
        await prisma.typeContract.create({
            data: typecontracts
        })
    }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
