"use client";

export default function Pricing() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId: "pri_XXXXXXXX" }),
    });

    const data = await res.json();

    (window as any).Paddle.Checkout.open({
      items: [{ priceId: data.priceId, quantity: 1 }],
      successUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/cancel",
    });
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl"
    >
      Subscribe
    </button>
  );
}
