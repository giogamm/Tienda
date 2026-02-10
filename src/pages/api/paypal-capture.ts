import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const PAYPAL_CLIENT_ID = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = import.meta.env.PAYPAL_SECRET;

  try {
    const { orderID } = await request.json();

    // 1. Obtener Token de Acceso (Igual que en el checkout)
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
      "base64",
    );
    const tokenResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    const { access_token } = await tokenResponse.json();

    // 2. CAPTURAR EL PAGO
    const captureResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await captureResponse.json();

    if (data.status === "COMPLETED") {
      // Aquí es donde podrías marcar el pedido como "Pagado" en tu base de datos
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      throw new Error("El pago no se pudo completar");
    }
  } catch (error: any) {
    console.error("ERROR CAPTURA PAYPAL:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
