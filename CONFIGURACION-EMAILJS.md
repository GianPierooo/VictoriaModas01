# 📧 Configuración de EmailJS para Formulario de Contacto

EmailJS permite enviar correos electrónicos directamente desde el frontend sin necesidad de un servidor backend.

## 🔧 Pasos para Configurar EmailJS

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (Registrarse)
3. Regístrate con tu correo de Gmail: **victoriamodas1053@gmail.com**
4. Verifica tu correo electrónico

### 2. Conectar tu Gmail

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Conéctalo con tu cuenta **victoriamodas1053@gmail.com**
5. Autoriza el acceso
6. **Copia el "Service ID"** (algo como `service_xxxxxxx`)

### 3. Crear Plantilla de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este contenido para la plantilla:

#### **Asunto del correo:**
```
Nuevo mensaje de contacto - {{subject}}
```

#### **Contenido del correo:**
```
Has recibido un nuevo mensaje de contacto desde VictoriaModas:

---
DATOS DEL CLIENTE:
---
Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

---
MENSAJE:
---
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de victoriamodas.com
```

4. **Copia el "Template ID"** (algo como `template_xxxxxxx`)
5. Guarda la plantilla

### 4. Configurar Respuesta Automática (Opcional pero Recomendado)

Crea una **segunda plantilla** para enviar confirmación al cliente:

#### **Nombre:** "Confirmación de Mensaje - Cliente"

#### **Asunto:**
```
✓ Mensaje recibido - VictoriaModas
```

#### **Contenido:**
```
Hola {{from_name}},

¡Gracias por contactar con VictoriaModas!

Hemos recibido tu mensaje con el asunto "{{subject}}" y te responderemos a la brevedad.

---
RESUMEN DE TU MENSAJE:
{{message}}
---

📍 Puedes visitarnos en:
Galería Naranja - Puesto 47-48
Calle Misti con Huascarán

🕒 Horario de atención:
Lunes a Sábado: 4:00 AM - 3:00 PM

💬 WhatsApp disponible 24/7: +51 993 357 672
✉️ Email: victoriamodas1053@gmail.com

¡Gracias por tu preferencia!

---
VictoriaModas
Elegancia, modernidad y versatilidad para la mujer de hoy.
```

**Guarda el Template ID de esta segunda plantilla también.**

### 5. Obtener Public Key

1. Ve a **"Account"** en el menú izquierdo
2. En **"API Keys"**, encontrarás tu **"Public Key"**
3. **Copia el Public Key** (algo como `user_xxxxxxxxxxxxxx`)

### 6. Actualizar el Código

Abre el archivo `src/pages/ContactPage.jsx` y actualiza las credenciales:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'TU_SERVICE_ID',      // El Service ID que copiaste
  templateId: 'TU_TEMPLATE_ID',    // El Template ID que copiaste
  publicKey: 'TU_PUBLIC_KEY'       // El Public Key que copiaste
}
```

## 📝 Ejemplo de Configuración Final

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc1234',
  templateId: 'template_xyz5678',
  publicKey: 'user_DEF9876543210'
}
```

## ✅ Verificación

1. Guarda los cambios en `ContactPage.jsx`
2. Ve a tu sitio web
3. Completa el formulario de contacto
4. Envía un mensaje de prueba
5. Verifica que llegue a **victoriamodas1053@gmail.com**

## 🎯 Límites del Plan Gratuito

- **200 correos/mes** (suficiente para comenzar)
- Si necesitas más, puedes actualizar a un plan pago

## 🔄 Auto-Respuesta (Opcional)

Si quieres que el cliente también reciba un correo de confirmación:

1. En `ContactPage.jsx`, después de enviar el primer correo, agrega:

```javascript
// Enviar correo de confirmación al cliente
await emailjs.send(
  EMAILJS_CONFIG.serviceId,
  'template_confirmacion', // ID de la segunda plantilla
  templateParams,
  EMAILJS_CONFIG.publicKey
)
```

## 🆘 Soporte

- Documentación oficial: https://www.emailjs.com/docs/
- Si tienes problemas, revisa la consola del navegador para ver errores

---

**¡Listo! Ahora tu formulario de contacto enviará correos reales.** ✨

