'use client';

import { PLANS, PlanTier } from '@/lib/plans';

export default function UpgradeButton({ tier }: { tier: PlanTier }) {
  const plan = PLANS[tier];

  const handleCheckout = () => {
    if (!plan.paddlePriceId) return;

    // @ts-ignore
    window.Paddle?.Checkout.open({
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en',
      },
      items: [{ priceId: plan.paddlePriceId, quantity: 1 }],
    });
  };

  if (tier === 'free') return null;

  return (
    <button
      onClick={handleCheckout}
      className="w-full py-3 px-6 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg transition-all transform hover:scale-105"
    >
      Upgrade to {plan.label} (${plan.price})
    </button>
  );
}
