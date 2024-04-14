import { FastifyInstance } from 'fastify';
import * as fs from 'fs';
import { Member } from '../../data/model';
// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(__dirname, '..', '..', 'data', 'members.json');
// try {
//   const data = await fs.promises.readFile(filePath, 'utf8');
//   return JSON.parse(data);
// } catch (error) {
//   console.error(error);
//   throw error;
// }

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  // To get all Data from Local JSON
  try {
    const rawData: Buffer = fs.readFileSync(
      'D:/APIs/team-tigers/apps/test-api/src/data/members.json'
    ); // the actual path to our JSON file
    const jsonData: Member[] = JSON.parse(rawData.toString());
    console.log(jsonData); // Use the data as needed

    fastify.get('/api', () => {
      return jsonData;
    });

    // Get a specific member by ID
    fastify.get('/api/:id', (request: any, reply: any) => {
      const id: number = parseInt(request.params.id);
      const singleData: Member | undefined = jsonData.find(
        (singleData) => parseInt(singleData.id) === id
      );
      if (!singleData) {
        return reply.code(404).send({ message: 'member not found' });
      }
      return singleData;
    });
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
  }
}
