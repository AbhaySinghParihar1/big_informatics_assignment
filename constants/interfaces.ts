export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
    username: string;
  };
  id: {
    value: string;
  };
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
  };
  uuid: string;
  isFavourite: Boolean;
}

export interface RenderItemProps {
  item: User;
}
