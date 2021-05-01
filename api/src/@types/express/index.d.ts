// isso já faz o express.user funcionar
// ele adiciona o user no tipo Express.Request
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
