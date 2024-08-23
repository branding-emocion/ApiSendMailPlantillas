// const express = require("express");
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "landing@brandingemocion.com", // Cambia esto por tu dirección de correo electrónico
    pass: "n&fjGdx1", // Cambia esto por tu contraseña de correo electrónico
  },
});

// Middleware
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("<h1>¡Hola, mundo!</h1>");
});

// Ruta de contacto
app.get("/contacto", async (req, res) => {
  const { nombre, telefono, correo, mensaje, correoDestino } = req.query;

  // Configuración del correo
  // Configuración del correo
  const mailOptions = {
    from: "landing@brandingemocion.com",
    to: `${correoDestino}`, // Cambia esto por la dirección de correo electrónico a la que quieres enviar el mensaje
    subject: "Nuevo mensaje desde el formulario de contacto",
    html: `
      <h1>Nuevo mensaje desde el formulario de contacto</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `,
  };

  try {
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    res.send("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el correo");
  }
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
