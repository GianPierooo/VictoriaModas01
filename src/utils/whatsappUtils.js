// Utilidades para WhatsApp
export const generateWhatsAppMessage = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return "¡Hola! Me gustaría hacer un pedido en VictoriaModas.";
  }

  let message = "¡Hola! Me gustaría hacer un pedido en VictoriaModas.\n\n";
  message += "*RESUMEN DE MI PEDIDO:*\n\n";

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    if (item.selectedSize) {
      message += `   Talla: ${item.selectedSize}\n`;
    }
    if (item.selectedColor) {
      message += `   Color: ${item.selectedColor}\n`;
    }
    message += "\n";
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  message += `*Total de artículos: ${totalItems}*\n\n`;
  message += "*Por favor, confírmame la disponibilidad y el proceso de pago.*\n\n";
  message += "¡Gracias!";

  return message;
};

export const openWhatsApp = (message) => {
  const phoneNumber = "51906517394"; // Número de WhatsApp de VictoriaModas
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
