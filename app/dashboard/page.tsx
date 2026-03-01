export default function Dashboard() {
  const subscribed = true; // 나중에 DB 연동

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {subscribed ? (
        <div className="text-green-400">Active Subscription</div>
      ) : (
        <div className="text-red-400">No Active Subscription</div>
      )}
    </div>
  );
}
