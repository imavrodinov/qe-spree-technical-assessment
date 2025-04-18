export interface AddressDetails {
  country: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export const userAddress: AddressDetails = {
  country: "United States",
  firstName: "John",
  lastName: "Doe",
  addressLine1: "Test st. 11",
  city: "NYC",
  state: "New York",
  zip: "10010",
  phone: "123123",
};
