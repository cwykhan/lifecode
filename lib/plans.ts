export const SERVICE_TIERS = {
  SLAVE: {
    name: "노예 (FREE)",
    price: 0,
    maxLines: 2,
    features: ["Basic Chart", "2-line Summary"]
  },
  COMMONER: {
    name: "평민",
    price: 5,
    maxLines: 4,
    features: ["Basic Chart", "4-line Analysis", "Annual Luck"]
  },
  MERCHANT: {
    name: "상인",
    price: 15,
    maxLines: 8,
    features: ["Financial Focus", "8-line Analysis", "Element Stats"]
  },
  NOBLE: {
    name: "귀족",
    price: 30,
    maxLines: 16,
    features: ["Life-long Roadmap", "16-line Detailed Report"]
  },
  EMPEROR: {
    name: "왕·황제",
    price: 50,
    maxLines: 32,
    features: ["Unlimited Access", "32-line VIP Strategy", "Global Scaling Advice"]
  }
};
