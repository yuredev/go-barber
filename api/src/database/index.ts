import { createConnection } from 'typeorm';

// procura o ormconfig.json em todo o projeto caso não seja passado arquivo de config pra dentro da função
// é melhor separar no json ormconfig pois a CLI do typeorm pega deste arquivo
createConnection()

// porem podemos passar diretamente tambem
// createConnection({
//   type: 'postgres',
//   host: 'localhost'
// })
