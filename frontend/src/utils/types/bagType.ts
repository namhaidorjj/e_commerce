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
  _id: string;
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
