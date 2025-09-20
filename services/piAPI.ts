
// This service mocks the server-side API calls to the Pi Network backend.
// In a real application, these would be fetch calls to your own backend (e.g., Next.js API routes)
// which would then securely call the Pi API.

export const approvePayment = (paymentId: string): Promise<{ ok: boolean }> => {
  console.log(`[API MOCK] Approving payment: ${paymentId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[API MOCK] Payment approved: ${paymentId}`);
      resolve({ ok: true });
    }, 1000); // Simulate network latency
  });
};

export const completePayment = (paymentId: string, txid: string): Promise<{ ok: boolean }> => {
  console.log(`[API MOCK] Completing payment: ${paymentId} with txid: ${txid}`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[API MOCK] Payment completed: ${paymentId}`);
      resolve({ ok: true });
    }, 1000);
  });
};
