export const deliveryMethods = {
  upsGround: {
    name: "UPS Ground (USD)",
    price: 5.0,
  },
  upsTwoDay: {
    name: "UPS Two Day (USD)",
    price: 10.0,
  },
  upsOneDay: {
    name: "UPS One Day (USD)",
    price: 15.0,
  },
} as const;
export type DeliveryMethodsKey = keyof typeof deliveryMethods;
