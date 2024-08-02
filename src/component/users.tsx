export interface User {
    login: {
      uuid: string;
    };
    name: {
      first: string;
      last: string;
    };
    email: string;
    phone: string;
    picture: {
    thumbnail: string;
    };
  }
  