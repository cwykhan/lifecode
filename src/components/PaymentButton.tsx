'use client';

import Script from 'next/script';

export default function PaymentButton() {
  const handlePayment = () => {
    // @ts-ignore
    window.Paddle.Checkout.open({
      product: 12345, // Paddle 대시보드에서 생성한 테스트 상품 ID
      email: 'test@example.com',
      successCallback: (data: any) => {
        console.log('Payment Success:', data);
        alert('LifeCode Upgrade Complete!');
      }
    });
  };

  return (
    <>
      <Script 
        src="https://cdn.paddle.com/paddle/paddle.js" 
        onLoad={() => {
          // @ts-ignore
          window.Paddle.Setup({ vendor: 123456 }); // Paddle Vendor ID
        }} 
      />
      <button 
        onClick={handlePayment}
        className="mt-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all"
      >
        UPGRADE TO EMPEROR PLAN
      </button>
    </>
  );
}
