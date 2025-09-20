// This service mocks the application's OWN backend API endpoints.
// In a real application, the frontend would make fetch calls to these endpoints.
// The backend server would then securely call the real Pi Platform API using its
// secret Server API Key. This is a critical security measure.
//
// The Authorization header for these server-to-server calls must be:
// `Authorization: Key YOUR_SERVER_API_KEY`

export const approvePayment = (paymentId: string): Promise<{ ok: boolean }> => {
  console.log(`[MOCK BACKEND] Calling /api/approvePayment with paymentId: ${paymentId}`);
  // In a real backend, this is where you'd call:
  // POST https://api.minepi.com/v2/payments/${paymentId}/approve
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[MOCK BACKEND] Payment approved on Pi server: ${paymentId}`);
      resolve({ ok: true });
    }, 1000); // Simulate network latency
  });
};

export const completePayment = (paymentId: string, txid: string): Promise<{ ok: boolean }> => {
  console.log(`[MOCK BACKEND] Calling /api/completePayment with paymentId: ${paymentId} and txid: ${txid}`);
  // In a real backend, this is where you'd call:
  // POST https://api.minepi.com/v2/payments/${paymentId}/complete
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[MOCK BACKEND] Payment completed on Pi server: ${paymentId}`);
      resolve({ ok: true });
    }, 1000);
  });
};