/** @format */

export type Bags = {
  bag: [];
  _id: string;
  images: string[];
  bagName: string;
  adminColor: string;
  color: string;
  price: number;
};
export type Bag = {
  _id: string;
  bagName: string;
  colors: {
    _id: string;
    adminColor: string;
    bagCode: string;
    images: string[];
  }[];
  price: number;
};
export type Color = {
  _id: string;
  adminColor: string;
  bagCode: string;
  images: [string];
  color: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export type Colors = {
  colors: string;
};
export type Props = {
  bag: Bag;
};
type Variant = "outline";
export type CartProps = {
  variant: Variant;
};

export type Orders = {
  bagId: { price: number; bagName: string };
  colors: {
    _id: string;
    images: string[];
    bagCode: string;
    color: string;
    adminColor: string;
    status: string;
  }[];
};
export type Order = {
  bagId: { price: number; bagName: string };
  colors: {
    _id: string;
    images: string[];
    bagCode: string;
    color: string;
    adminColor: string;
    status: string;
  };
};

export type ProfileProps = {
  user: User;
};
export type UserData = {
  address: string;
  userName: string;
  email: string;
  phoneNumber: string;
};
export type bank = {
  urls: { name: string; logo: string; link: string }[];
};
