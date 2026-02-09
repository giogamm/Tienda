// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Esto obliga a Astro a empaquetar mercadopago correctamente para Netlify
      noExternal: ["mercadopago"],
    },
  },

  adapter: netlify(),
});
