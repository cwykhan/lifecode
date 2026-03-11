export const LIFECODE_PLANS = {
  SLAVE: {
    id: 'plan_slave',
    name: 'Slave',
    price: 0,
    features: ['Basic 4 Pillars', 'Polarity Check (P/N)'],
    accessLevel: 1
  },
  COMMONER: {
    id: 'plan_commoner',
    name: 'Commoner',
    price: 9.99,
    features: ['Basic + Strength Analysis'],
    accessLevel: 2
  },
  MERCHANT: {
    id: 'plan_merchant',
    name: 'Merchant',
    price: 19.99,
    features: ['Commoner + Useful Energy Tips'],
    accessLevel: 3
  },
  NOBLE: {
    id: 'plan_noble',
    name: 'Noble',
    price: 49.99,
    features: ['Merchant + Special Combo Analysis', 'Correction Details'],
    accessLevel: 4
  },
  KING: {
    id: 'plan_king',
    name: 'King/Emperor',
    price: 99.99,
    features: ['Full Access', 'Detailed Destiny Report', 'Priority Support'],
    accessLevel: 5
  }
};
