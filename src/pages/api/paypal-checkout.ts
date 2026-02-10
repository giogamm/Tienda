import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const PAYPAL_CLIENT_ID = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = import.meta.env.PAYPAL_SECRET;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    return new Response(
      JSON.stringify({
        error: "Configuración incompleta: Faltan credenciales de PayPal",
      }),
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { items } = body;

    // 1. Obtener Token de Acceso de PayPal
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

    // 2. Calcular el total (Aquí es donde podrías consultar tu BD por ID)
    const totalAmount = items
      .reduce((acc: number, item: any) => {
        const price = Number(item.precio || item.price || 0);
        const qty = Number(item.quantity || 1);
        return acc + price * qty;
      }, 0)
      .toFixed(2);

    // 3. Crear la orden en PayPal
    const orderResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: totalAmount,
                breakdown: {
                  item_total: {
                    currency_code: "MXN",
                    value: totalAmount,
                  },
                },
              },
              items: items.map((item: any) => ({
                name: item.nombre || "Producto Jenndart Pop",
                unit_amount: {
                  currency_code: "MXN",
                  value: Number(item.precio || item.price || 0).toFixed(2),
                },
                quantity: Number(item.quantity || 1).toString(),
              })),
            },
          ],
        }),
      },
    );

    const order = await orderResponse.json();

    if (!order.id) {
      throw new Error("No se pudo generar el ID de orden de PayPal");
    }

    return new Response(JSON.stringify({ id: order.id }), { status: 200 });
  } catch (error: any) {
    console.error("ERROR CRÍTICO PAYPAL:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la orden de PayPal",
        details: error.message,
      }),
      { status: 500 },
    );
  }
};
