import type { APIRoute } from "astro";
import { MercadoPagoConfig, Preference } from "mercadopago";

// 1. Aquí va tu Access Token de Producción (Empieza con APP_USR-...)
const client = new MercadoPagoConfig({
  accessToken: import.meta.env.MP_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items } = body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items, // Los productos que vienen del carrito
        back_urls: {
          success: "https://jenndartpop.netlify.app/success",
          failure: "https://jenndartpop.netlify.app/cart",
          pending: "https://jenndartpop.netlify.app/pending",
        },
        auto_return: "approved",
      },
    });

    return new Response(JSON.stringify({ id: result.id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error" }), { status: 500 });
  }
};
