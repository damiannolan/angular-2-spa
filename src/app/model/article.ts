import { User } from './user';

interface ArticleJSON {
  author: User;
  createdAt: string;
  title: string;
  category: string;
  body: string;
}

export class Article {
  author: User;
  createdAt: string;
  title: string;
  category: string;
  body: string;

  constructor(author: User, createdAt: string, title: string, category: string, body: string) { }

  // Article.fromJSON()
    static fromJSON(json: ArticleJSON): Article {
        //bypassing the constructor using Object.create()
        let article = Object.create(Article.prototype);

        return Object.assign(article, json);
    }
}
