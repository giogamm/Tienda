# 🛍️ Jenndart Pop — E-commerce & Plataforma de Productos Personalizados

Plataforma de comercio electrónico moderna, rápida y adaptable diseñada para la venta y personalización de productos. Incluye gestión completa de carrito en cliente, persistencia de datos y pasarelas de pago reales integradas mediante endpoints de backend.

🔗 **Demo en vivo:** [jenndartpop.netlify.app](https://jenndartpop.netlify.app)

---

## 🚀 Características Principales

* **Catálogo interactivo:** Navegación optimizada y vistas de producto de alto rendimiento.
* **Carrito de compras persistente:** Gestión de estado y sincronización local en el navegador (`localStorage`).
* **Pasarelas de pago integradas:**
  * **Mercado Pago (Wallet Brick API):** Procesamiento de pagos con tarjeta de crédito/débito y saldo.
  * **PayPal SDK:** Creación y captura de órdenes en tiempo real con soporte multimoneda (MXN).
  * **Checkout asistido:** Canal directo de cierre de pedido vía WhatsApp.
* **Rendimiento:** Arquitectura basada en islas de componentes para carga ultrarrápida y mínimo bundle de JavaScript.
* **Diseño Responsivo:** Interfaz adaptada a móviles, tablets y escritorio con Tailwind CSS.

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Astro](https://astro.build/) + TypeScript / JavaScript
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **APIs / Backend:** Endpoints en Astro (Server Endpoints) para creación de preferencias y captura de cobros
* **Integraciones:** Mercado Pago SDK v2, PayPal JS SDK, WhatsApp API
* **Despliegue:** [Netlify](https://www.netlify.com/)

---

## 📦 Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/portfolio-gio.git](https://github.com/TU_USUARIO/portfolio-gio.git)
   cd portfolio-gio
