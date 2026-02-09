import type { APIRoute } from "astro";
// Cambiamos la forma de importar si la anterior fallaba:
import * as MP from "mercadopago";

export const POST: APIRoute = async ({ request }) => {
  const MP_TOKEN = import.meta.env.MP_ACCESS_TOKEN;

  try {
    // Usamos la importación compatible
    const client = new MP.MercadoPagoConfig({ accessToken: MP_TOKEN });
    const preference = new MP.Preference(client);

    const body = await request.json();
    const { items } = body;

    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.nombre || "Producto",
          unit_price: Math.round(Number(item.precio || item.price)),
          quantity: Number(item.quantity || 1),
          currency_id: "MXN",
        })),
        back_urls: {
          success: "https://jenndartpop.netlify.app/success",
          failure: "https://jenndartpop.netlify.app/cart",
          pending: "https://jenndartpop.netlify.app/pending",
        },
        auto_return: "approved",
      },
    });

    return new Response(JSON.stringify({ id: result.id }), { status: 200 });
  } catch (error: any) {
    console.error("ERROR MP:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
