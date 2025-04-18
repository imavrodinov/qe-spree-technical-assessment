export interface CardDetails {
  number: string;
  expiryDate: string;
  cvvCode: string;
}

// valid spree test card
export const validCard: CardDetails = {
  number: "4111111111111111",
  expiryDate: "102030",
  cvvCode: "123",
};

// invalid spree test card
export const invalidCard: CardDetails = {
  number: "4000000000000002",
  expiryDate: "102030",
  cvvCode: "100",
};
