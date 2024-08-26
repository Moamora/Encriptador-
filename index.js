// Función para mostrar una alerta con un mensaje personalizado
function mostrarAlerta(mensaje) {
  alert(mensaje); // Muestra una ventana de alerta con el mensaje dado
}

// Función principal para procesar el texto según la acción (encriptar o desencriptar)
function procesarTexto(accion) {
  const texto = document.getElementById("texto").value; // Obtiene el valor del texto ingresado
  const tituloMensaje = document.getElementById("titulo-mensaje"); // Obtiene el elemento del título del mensaje
  const parrafo = document.getElementById("parrafo"); // Obtiene el elemento del párrafo
  const imagen = document.getElementById("imagen"); // Obtiene el elemento de la imagen

  if (texto.length === 0) {
    imagen.src = "imagen.png"; // Cambia la imagen a una imagen por defecto
    tituloMensaje.textContent = "Ningún mensaje fue encontrado"; // Muestra un mensaje de error en el título
    parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar"; // Muestra un mensaje en el párrafo
    mostrarAlerta("Debes ingresar un texto"); // Muestra una alerta diciendo que no se ingresó texto
    return;
  }

  if (texto !== texto.toLowerCase()) {
    mostrarAlerta("El texto contiene mayúsculas. Por favor, ingresa solo texto en minúsculas."); // Muestra una alerta si el texto tiene mayúsculas
    return;
  }

  let textoCifrado;

  if (accion === "encriptar") {
    textoCifrado = texto
      .replace(/e/gi, "enter") // Reemplaza 'e' por 'enter'
      .replace(/i/gi, "imes") // Reemplaza 'i' por 'imes'
      .replace(/a/gi, "ai") // Reemplaza 'a' por 'ai'
      .replace(/o/gi, "ober") // Reemplaza 'o' por 'ober'
      .replace(/u/gi, "ufat"); // Reemplaza 'u' por 'ufat'
  } else if (accion === "desencriptar") {
    textoCifrado = texto
      .replace(/enter/gi, "e") // Reemplaza 'enter' por 'e'
      .replace(/imes/gi, "i") // Reemplaza 'imes' por 'i'
      .replace(/ai/gi, "a") // Reemplaza 'ai' por 'a'
      .replace(/ober/gi, "o") // Reemplaza 'ober' por 'o'
      .replace(/ufat/gi, "u"); // Reemplaza 'ufat' por 'u'
  }

  const esFrase = texto.includes(" ");

  // Muestra el texto cifrado o descifrado en el campo de texto
  document.getElementById("texto").value = textoCifrado;

  if (accion === "encriptar") {
    tituloMensaje.textContent = esFrase ? `La frase fue encriptada: ${textoCifrado}` : `La palabra fue encriptada: ${textoCifrado}`;
  } else if (accion === "desencriptar") {
    tituloMensaje.textContent = esFrase ? `La frase fue desencriptada: ${textoCifrado}` : `La palabra fue desencriptada: ${textoCifrado}`;
  }

  parrafo.textContent = ""; // Borra cualquier mensaje en el párrafo
  imagen.src = accion === "encriptar" ? "Encriptado.jpg" : "desencriptado.png"; // Cambia la imagen según la acción realizada
  
  // Limpia el campo de texto después de procesar
  document.getElementById("texto").value = "";
}

// Función para encriptar el texto, llama a procesarTexto con la acción 'encriptar'
function encriptar() {
  procesarTexto("encriptar");
}

// Función para desencriptar el texto, llama a procesarTexto con la acción 'desencriptar'
function desencriptar() {
  procesarTexto("desencriptar");
}

// Función para copiar el texto cifrado o descifrado al portapapeles
function copiarTexto() {
  const tituloMensaje = document.getElementById("titulo-mensaje"); // Obtiene el elemento del título del mensaje
  const textoMensaje = tituloMensaje.textContent; // Obtiene el texto completo del mensaje

  // Encuentra el texto después de las frases específicas
  const regex = /(?:La frase fue encriptada:|La frase fue desencriptada:|La palabra fue encriptada:|La palabra fue desencriptada:)\s*(.*)$/;
  const match = textoMensaje.match(regex);

  if (match) {
    const textoParaCopiar = match[1]; // Texto que sigue a la frase específica
    navigator.clipboard.writeText(textoParaCopiar)
      .then(() => {
        mostrarAlerta("Texto copiado al portapapeles");
      })
      .catch(err => {
        mostrarAlerta("Error al copiar el texto: " + err);
      });
  } else {
    mostrarAlerta("No hay texto para copiar");
  }
}
