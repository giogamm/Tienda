import type { APIRoute } from "astro";
import * as MP from "mercadopago";

export const POST: APIRoute = async ({ request }) => {
  const MP_TOKEN = import.meta.env.MP_ACCESS_TOKEN;

  // Verificación de seguridad por si el token no carga
  if (!MP_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Configuración incompleta: Falta Token" }),
      {
        status: 500,
      },
    );
  }

  try {
    const client = new MP.MercadoPagoConfig({ accessToken: MP_TOKEN });
    const preference = new MP.Preference(client);

    const body = await request.json();
    const { items } = body;

    // Creamos la preferencia en Mercado Pago
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.nombre || "Producto Jenndart Pop",
          // Precio unitario redondeado
          unit_price: Math.round(Number(item.precio || item.price || 0)),
          // AQUÍ ESTÁ EL FIX: Se envía la cantidad real del carrito
          quantity: Number(item.quantity || 1),
          currency_id: "MXN",
        })),
        back_urls: {
          success: "https://jenndartpop.netlify.app/success",
          failure: "https://jenndartpop.netlify.app/carrito",
          pending: "https://jenndartpop.netlify.app/pending",
        },
        auto_return: "approved",
      },
    });

    // Devolvemos el ID de la preferencia para que el botón de MP se abra
    return new Response(JSON.stringify({ id: result.id }), { status: 200 });
  } catch (error: any) {
    console.error("ERROR CRÍTICO MP:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar el pago",
        details: error.message,
      }),
      {
        status: 500,
      },
    );
  }
};
