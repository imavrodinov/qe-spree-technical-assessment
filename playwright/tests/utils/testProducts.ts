export interface TestProduct {
  id: number;
  name: string;
  size: string;
  price: number;
}

export const testProducts: Record<string, TestProduct> = {
  testShirtItem: {
    id: 117,
    name: "Denim shirt",
    size: "M",
    price: 48.99,
  },
  testJacketItem: {
    id: 382,
    name: "Jacket With Liner",
    size: "M",
    price: 37.99,
  },
  testTshirtItem: {
    id: 140,
    name: "Basic T Shirt",
    size: "M",
    price: 83.99,
  },
};
