/** @format */

export type Bags = {
  _id: string;
  images: string[];
  bagName: string;
  adminColor: string;
  color: string;
};
export type Bag = {
  _id: string;
  bagName: string;
  colors: {
    adminColor: string;
    bagCode: string;
    images: string[];
  }[];
  price: number;
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
