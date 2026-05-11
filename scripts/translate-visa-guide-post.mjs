import { createClient } from "next-sanity";
import { config } from "dotenv";
import { randomBytes } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const key = () => randomBytes(6).toString("hex");
const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const block = (style, children, listItem = null, level = null, markDefs = []) => {
  const b = { _type: "block", _key: key(), style, markDefs, children };
  if (listItem) { b.listItem = listItem; b.level = level || 1; }
  return b;
};
const paragraph = (...parts) => {
  const markDefs = [];
  const children = parts.map((p) => {
    if (typeof p === "string") return span(p);
    if (p.link) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: p.link, blank: false });
      return span(p.text, [k]);
    }
    if (p.bold) return span(p.text, ["strong"]);
    return span(p.text);
  });
  return block("normal", children, null, null, markDefs);
};
const h2 = (text) => block("h2", [span(text)]);
const h3 = (text) => block("h3", [span(text)]);
const quote = (text) => block("blockquote", [span(text)]);
const li = (...parts) => {
  const children = parts.map((p) =>
    typeof p === "string" ? span(p) : span(p.text, p.bold ? ["strong"] : [])
  );
  return block("normal", children, "bullet", 1);
};

// ═══════════════════════════════════════════════════════════════
// SPANISH BODY (~4350 words)
// ═══════════════════════════════════════════════════════════════
const body_es = [
  paragraph(
    "¿Planeas un viaje a Bakú o cualquier otra ciudad de Azerbaiyán? Lo primero que cada viajero internacional debe entender es el sistema de ",
    { text: "visa de Azerbaiyán", bold: true },
    ". En 2026, los ciudadanos de más de 100 países son elegibles para obtener una ",
    { text: "visa electrónica de Azerbaiyán", bold: true },
    " (e-Visa) completamente en línea, sin necesidad de visitar una embajada ni un consulado. Ya sea que viajes desde Estados Unidos, Reino Unido, Italia, Pakistán, Arabia Saudita, Sri Lanka, India, Malasia, China, Irán, o cualquier otro país elegible, el sistema ",
    { text: "visa ASAN", bold: true },
    " hace que el proceso de solicitud sea notablemente sencillo, normalmente completado en menos de cinco minutos con aprobación en tan solo tres horas. Esta guía completa cubre todo lo que necesitas saber: la actual ",
    { text: "política de visa de Azerbaiyán", bold: true },
    ", todos los ",
    { text: "tipos de visa de Azerbaiyán", bold: true },
    " disponibles (turista, negocios, tránsito, e-Visa), la lista completa de países elegibles, los requisitos exactos de documentos, el proceso de solicitud paso a paso, tarifas, validez, duración de estancia, información específica por país, y respuestas a las preguntas más comunes. Encuentra tu nacionalidad abajo para acceder a requisitos y detalles específicos por país:"
  ),

  // ─── COUNTRY GRID INJECTS HERE ───

  h2("Entendiendo la Política de Visa de Azerbaiyán en 2026"),
  paragraph(
    "La ",
    { text: "política de visa de Azerbaiyán", bold: true },
    " en 2026 es sencilla y amigable para viajeros en comparación con muchos países de Asia Central. La República de Azerbaiyán mantiene tres categorías principales de entrada para extranjeros: entrada sin visa para un número limitado de países (mayormente estados post-soviéticos y socios diplomáticos), la visa electrónica de Azerbaiyán (e-Visa) para la gran mayoría de viajeros de más de 100 naciones elegibles, y una visa tradicional de embajada o consulado para el pequeño grupo de países no incluidos en el programa de e-Visa. La política se administra mediante el Servicio Estatal de Migración (DMX) en coordinación con el Ministerio de Asuntos Exteriores, y las solicitudes en línea se procesan a través del portal oficial ASAN."
  ),
  paragraph(
    "Bajo la actual política, los ciudadanos de países como Estados Unidos, Reino Unido, Alemania, Francia, Italia, España, los Países Bajos, Australia, Canadá, Japón, Corea del Sur, India, Pakistán, Indonesia, Malasia, Arabia Saudita, los EAU, Catar, Kuwait, Bahréin, Omán, y docenas más son elegibles para solicitar la e-Visa en línea. La entrada sin visa está limitada a un grupo pequeño: ciudadanos de Armenia (limitado), Bielorrusia, Georgia, Kazajistán, Kirguistán, Moldavia, Rusia, Tayikistán, Turquía, Ucrania y Uzbekistán pueden entrar a Azerbaiyán sin visa para estancias de hasta 30-90 días dependiendo del acuerdo bilateral."
  ),
  paragraph(
    "Vale la pena notar que Azerbaiyán actualizó los requisitos de visa en los últimos años para agilizar el proceso y reducir drásticamente los tiempos de procesamiento. A partir de 2026, la e-Visa estándar es válida para 30 días de estancia dentro de una ventana de 90 días desde la emisión, y la solicitud se puede completar enteramente desde tu teléfono o computadora portátil."
  ),
  paragraph(
    "Para los viajeros que preguntan ",
    { text: "¿necesito visa para Azerbaiyán?", bold: true },
    " — la respuesta para la mayoría de las nacionalidades no-CIS es sí, pero el moderno sistema de e-Visa hace que obtener una sea tan fácil como reservar un vuelo."
  ),

  h2("Tipos de Visa de Azerbaiyán — ¿Cuál Necesitas?"),
  paragraph(
    "Entender los diferentes ",
    { text: "tipos de visa de Azerbaiyán", bold: true },
    " es el primer paso hacia una solicitud exitosa. El gobierno azerbaiyano emite varias categorías de visa dependiendo del propósito y la duración de tu estancia. Elegir el tipo correcto de visa es crítico: solicitar bajo la categoría equivocada puede resultar en retrasos, rechazo o problemas en la frontera."
  ),

  h3("1. Visa de Turista de Azerbaiyán (e-Visa)"),
  paragraph(
    "La visa más común para viajeros es la ",
    { text: "visa de turista de Azerbaiyán", bold: true },
    ", emitida como una e-Visa de entrada única válida por 30 días de estancia. Esta es la opción correcta si visitas Bakú, Gabala, Sheki, Quba, Lankaran, o cualquier otro lugar de Azerbaiyán por turismo, paseos, visitas familiares o viajes personales cortos. La solicitud se procesa a través del portal en línea ASAN en 3-5 días hábiles (estándar) o tan rápido como 3 horas (procesamiento urgente)."
  ),

  h3("2. Visa de Negocios de Azerbaiyán"),
  paragraph(
    "Si viajas a Azerbaiyán para reuniones, conferencias, negociaciones contractuales o actividades comerciales a corto plazo, debes solicitar una e-Visa de negocios. Los requisitos son casi idénticos a la visa de turista, pero normalmente necesitarás una carta de invitación de la empresa azerbaiyana que visitas. La duración de la estancia también es de 30 días, entrada única."
  ),

  h3("3. Visa de Visitante de Azerbaiyán"),
  paragraph(
    "La visa de visitante de Azerbaiyán está estrechamente relacionada con la visa de turista pero está específicamente destinada a viajeros que visitan amigos o familiares en Azerbaiyán. Permite la misma estancia de 30 días y se procesa a través del mismo portal de e-Visa."
  ),

  h3("4. Visa de Tránsito de Azerbaiyán"),
  paragraph(
    "Se requiere una visa de tránsito si pasas por Azerbaiyán en ruta a otro país y tu estancia de tránsito excede la ventana de tránsito sin visa. La mayoría de los viajeros que conectan a través del Aeropuerto Internacional Heydar Aliyev (GYD) sin salir de la zona de tránsito internacional no necesitan esta visa."
  ),

  h3("5. Visa de Estudiante de Azerbaiyán"),
  paragraph(
    "Si has sido aceptado para estudiar en una universidad azerbaiyana — como la Universidad Estatal de Bakú, la Universidad ADA o la Universidad Khazar — debes solicitar una visa de estudiante a largo plazo a través de una embajada o consulado azerbaiyano. La visa de estudiante NO está disponible a través del sistema e-Visa."
  ),

  h3("6. Visa de Trabajo de Azerbaiyán"),
  paragraph(
    "Los extranjeros que planean trabajar en Azerbaiyán deben obtener un permiso de trabajo a través de su empleador primero, y luego solicitar una visa de trabajo correspondiente en una embajada o consulado azerbaiyano. Esta categoría también está fuera del sistema e-Visa."
  ),
  paragraph(
    "Para el 95% de los viajeros de ocio y negocios a corto plazo, la ",
    { text: "visa electrónica de Azerbaiyán", bold: true },
    " (e-Visa de turista o negocios) es la opción correcta. De todos los tipos de visa de Azerbaiyán, la e-Visa es por mucho la más rápida, económica y conveniente."
  ),

  h2("¿Necesitas Visa para Azerbaiyán?"),
  paragraph(
    "Esta es una de las preguntas más comunes que recibimos: ",
    { text: "¿necesitas visa para Azerbaiyán?", bold: true },
    " La respuesta corta para la gran mayoría de los viajeros internacionales es sí, pero obtenerla ahora es más fácil que nunca gracias al sistema e-Visa."
  ),

  h3("Países Sin Visa"),
  paragraph(
    "Los ciudadanos de Rusia, Bielorrusia, Ucrania, Moldavia, Georgia, Kazajistán, Kirguistán, Uzbekistán, Tayikistán, Turkmenistán y Turquía pueden ingresar a Azerbaiyán con solo un pasaporte válido para estancias de hasta 30-90 días, dependiendo del acuerdo bilateral específico."
  ),

  h3("Países Elegibles para e-Visa"),
  paragraph(
    "Más de 100 países califican para el programa de e-Visa, incluyendo Estados Unidos, Canadá, México, Reino Unido, Alemania, Francia, Italia, España, Países Bajos, Bélgica, Suiza, Noruega, Suecia, Dinamarca, Finlandia, Irlanda, Portugal, Austria, Grecia, Polonia, República Checa, Hungría, Rumania, Arabia Saudita, EAU, Kuwait, Catar, Bahréin, Omán, Jordania, Japón, Corea del Sur, Singapur, Malasia, Indonesia, Filipinas, Tailandia, Vietnam, India, Pakistán, Bangladés, Sri Lanka, Nepal, China, Australia, Nueva Zelanda, Sudáfrica, Nigeria, Egipto, Marruecos, Túnez, Argelia y Kenia."
  ),

  h3("Países que Requieren Embajada"),
  paragraph(
    "Un pequeño número de países no está en la lista de e-Visa y debe solicitar en una embajada o consulado azerbaiyano."
  ),

  h2("Lista de Países Elegibles para e-Visa de Azerbaiyán"),
  paragraph(
    "La lista de ",
    { text: "países elegibles para e-Visa de Azerbaiyán", bold: true },
    " ahora incluye más de 100 naciones, haciendo de la e-Visa azerbaiyana uno de los programas de visa electrónica más accesibles del mundo. Si tu país está en esta lista, puedes solicitar en línea, pagar y recibir tu visa aprobada completamente sin visitar una embajada o consulado."
  ),

  h3("Norte y Sudamérica"),
  paragraph(
    "Estados Unidos, Canadá, México, Brasil, Argentina, Chile, Perú, Colombia, Costa Rica, Panamá, Uruguay y la mayoría de naciones del Caribe."
  ),

  h3("Europa — UE Completa y Más"),
  paragraph(
    "Reino Unido, Alemania, Francia, Italia, España, Países Bajos, Bélgica, Suiza, Austria, Noruega, Suecia, Dinamarca, Finlandia, Islandia, Irlanda, Portugal, Polonia, República Checa, Eslovaquia, Hungría, Eslovenia, Croacia, Rumania, Bulgaria, Grecia, Chipre, Malta, Estonia, Letonia, Lituania, Luxemburgo, Mónaco, San Marino, Vaticano, Liechtenstein y Andorra."
  ),

  h3("Oriente Medio"),
  paragraph(
    "Arabia Saudita, Emiratos Árabes Unidos, Kuwait, Catar, Bahréin, Omán, Jordania, Israel y Líbano."
  ),

  h3("Asia-Pacífico"),
  paragraph(
    "Japón, Corea del Sur, Singapur, Hong Kong, Macao, Taiwán, Malasia, Indonesia, Brunéi, Filipinas, Tailandia, Vietnam, Camboya, Laos, Myanmar, Mongolia, India, Pakistán, Bangladés, Sri Lanka, Nepal, Maldivas, Bután y China."
  ),

  h3("África"),
  paragraph(
    "Sudáfrica, Nigeria, Egipto, Marruecos, Túnez, Argelia, Kenia, Ghana, Etiopía, Tanzania, Uganda, Senegal y Costa de Marfil."
  ),

  h3("Oceanía"),
  paragraph(
    "Australia, Nueva Zelanda, Fiyi y Samoa."
  ),

  paragraph(
    { text: "Nota importante para ciudadanos iraníes:", bold: true },
    " Irán tiene un programa de visa separado con procedimientos específicos. Los viajeros iraníes deben consultar con el consulado azerbaiyano para conocer las reglas actuales."
  ),
  paragraph(
    { text: "Para titulares de Iqama saudí:", bold: true },
    " Los extranjeros que viven en Arabia Saudita con una Iqama válida pueden solicitar una e-Visa de Azerbaiyán siempre que su nacionalidad (pasaporte de origen) esté en la lista de países elegibles."
  ),

  h2("¿Qué es la Visa ASAN? El Portal Oficial de e-Visa de Azerbaiyán"),
  paragraph(
    { text: "Visa ASAN", bold: true },
    " es el portal oficial de visa en línea operado por el Gobierno de Azerbaiyán. La palabra \"ASAN\" proviene del azerbaiyano que significa \"fácil\" — un nombre apropiado dado lo dramáticamente que ha simplificado el proceso de solicitud de visa. Lanzado en 2016 y continuamente actualizado, el sistema ",
    { text: "visa ASAN Azerbaiyán", bold: true },
    " procesa todas las solicitudes de e-Visa para la República de Azerbaiyán."
  ),
  paragraph(
    "Cuando solicitas una e-Visa de Azerbaiyán, ya sea a través de un servicio de terceros o directamente, tu solicitud es procesada en última instancia por el sistema ASAN. La plataforma es operada por la Agencia Estatal de Servicio Público y Innovaciones Sociales bajo el Presidente de la República de Azerbaiyán."
  ),

  h3("Características Clave del Sistema de Visa ASAN"),
  li("Totalmente en línea — no se requiere visita a embajada"),
  li("Interfaz multilingüe (inglés, ruso, azerbaiyano, árabe, turco, chino, español)"),
  li("Procesamiento estándar en 3 días hábiles"),
  li("Procesamiento urgente tan rápido como 3 horas"),
  li("e-Visa electrónica de entrada única con duración de estancia de 30 días"),
  li("Validez de 90 días desde la emisión"),
  li("Entrega digital directa — la visa llega a tu correo como PDF"),

  h2("Requisitos de e-Visa de Azerbaiyán — Lista Completa"),
  paragraph(
    "Los ",
    { text: "requisitos de visa de Azerbaiyán", bold: true },
    " para la e-Visa son simples y mínimos comparados con solicitudes tradicionales. Antes de iniciar tu solicitud, reúne los siguientes documentos e información:"
  ),

  h3("1. Pasaporte Válido"),
  paragraph(
    "Tu pasaporte debe ser válido por al menos 6 meses más allá de tu fecha planeada de salida de Azerbaiyán. Este es el requisito estándar de validez de pasaporte para la e-Visa de Azerbaiyán."
  ),

  h3("2. Foto Digital de Pasaporte"),
  paragraph(
    "Una fotografía reciente tomada en los últimos 6 meses, con fondo blanco, cara claramente visible, sin gafas de sol, sombreros ni filtros. Formato: JPG o PNG, típicamente bajo 5 MB."
  ),

  h3("3. Itinerario de Viaje (Recomendado)"),
  paragraph(
    "Aunque no siempre se requiere durante la solicitud, una confirmación de reserva de hotel o dirección de dónde te alojarás, además de un boleto de vuelo de regreso o plan de viaje, pueden ser solicitados por funcionarios fronterizos azerbaiyanos a la llegada."
  ),

  h3("4. Dirección de Email Válida"),
  paragraph(
    "Tu e-Visa aprobada se entrega como PDF a esta dirección de email. Usa un email personal que revises regularmente."
  ),

  h3("5. Método de Pago"),
  paragraph(
    "Una tarjeta de crédito o débito internacional válida (Visa, Mastercard, American Express). La tarifa estándar es $69 USD, que incluye tanto la tarifa gubernamental como el procesamiento."
  ),

  h3("6. Información Personal y de Viaje"),
  paragraph(
    "Prepárate para proporcionar: nombre completo como aparece en tu pasaporte, fecha de nacimiento, lugar de nacimiento, nacionalidad, número de pasaporte, fechas de emisión y caducidad del pasaporte, dirección permanente en tu país de origen, fecha planeada de llegada a Azerbaiyán, propósito de la visita y número de teléfono de contacto."
  ),

  h2("Cómo Solicitar la e-Visa de Azerbaiyán — Paso a Paso"),
  paragraph(
    "El proceso completo de ",
    { text: "cómo solicitar la e-Visa de Azerbaiyán", bold: true },
    " se ha simplificado a solo siete pasos claros. La mayoría de los solicitantes completan todo el proceso en menos de cinco minutos."
  ),

  h3("Paso 1: Verifica tu Elegibilidad"),
  paragraph(
    "Antes de comenzar, confirma que tu país está en la lista de países elegibles para la e-Visa de Azerbaiyán."
  ),

  h3("Paso 2: Elige tu Velocidad de Procesamiento"),
  paragraph(
    "Elegirás entre dos opciones principales: procesamiento estándar en 3 días hábiles a la tarifa base, o procesamiento urgente en 3 horas por una tarifa adicional."
  ),

  h3("Paso 3: Completa el Formulario de Solicitud en Línea"),
  paragraph(
    "La solicitud pide información personal (nombre, fecha de nacimiento, nacionalidad, detalles del pasaporte), información de contacto (email, teléfono, dirección), información de viaje (fecha de llegada, propósito de visita), carga de foto de pasaporte y carga de página biográfica del pasaporte (solo algunos formularios)."
  ),

  h3("Paso 4: Paga la Tarifa de Visa"),
  paragraph(
    "Envía el pago vía tarjeta de crédito o débito. Las tarjetas internacionales (Visa, Mastercard, AmEx, Discover) son aceptadas. El pago es seguro y procesado vía cifrado SSL."
  ),

  h3("Paso 5: Espera la Aprobación"),
  paragraph(
    "Con procesamiento urgente (3 horas), típicamente recibirás tu visa aprobada el mismo día hábil. Con procesamiento estándar (3 días hábiles), la mayoría de las aprobaciones llegan en 24-72 horas durante días hábiles."
  ),

  h3("Paso 6: Imprime o Guarda tu e-Visa"),
  paragraph(
    "Una vez aprobada, tu e-Visa llega como PDF en tu email. Puedes imprimir 1-2 copias y llevarlas con tu pasaporte, guardar una copia en tu teléfono (se recomienda acceso sin conexión en caso de WiFi deficiente en aeropuertos)."
  ),

  h3("Paso 7: Viaja a Azerbaiyán"),
  paragraph(
    "En la frontera azerbaiyana — ya sea aeropuerto, cruce terrestre o puerto marítimo — presenta tu pasaporte y una copia de tu e-Visa. El funcionario fronterizo verificará tu e-Visa electrónicamente en el sistema gubernamental."
  ),

  h2("Visa de Llegada de Azerbaiyán — ¿Quién Califica?"),
  paragraph(
    "Muchos viajeros preguntan sobre la opción de ",
    { text: "visa a la llegada de Azerbaiyán", bold: true },
    ". Si bien Azerbaiyán ofrece privilegios limitados de visa a la llegada, el sistema es mucho más restringido que el programa e-Visa."
  ),

  h3("Quién Califica para Visa a la Llegada"),
  paragraph(
    "La visa a la llegada generalmente está disponible solo para ciudadanos de países de la CEI, titulares de acuerdos bilaterales específicos, titulares de pasaportes diplomáticos y oficiales de ciertas naciones socias, y pasajeros de cruceros en algunos casos especiales."
  ),

  h3("Quién NO Califica"),
  paragraph(
    "La visa a la llegada NO está disponible para titulares de pasaportes de EE.UU., titulares de pasaportes del Reino Unido, titulares de pasaportes de la UE, o la mayoría de titulares de pasaportes asiáticos, africanos, australianos, oceánicos y latinoamericanos."
  ),

  h2("Validez de la e-Visa de Azerbaiyán, Duración de Estancia y Tarifas"),
  paragraph(
    "Entender las reglas de validez de la e-Visa ASAN de Azerbaiyán y otros detalles de tiempo es crítico para planear tu viaje."
  ),

  h3("Período de Validez: 90 Días"),
  paragraph(
    "La e-Visa es válida por 90 días desde la fecha de emisión. Esto significa que tienes una ventana de 3 meses después de la aprobación para ingresar a Azerbaiyán."
  ),

  h3("Duración de Estancia: 30 Días"),
  paragraph(
    "Una vez que ingresas a Azerbaiyán, puedes permanecer en el país por un máximo de 30 días por visa. El día de llegada cuenta como Día 1."
  ),

  h3("Tipo de Entrada: Entrada Única"),
  paragraph(
    "La e-Visa estándar es solo de entrada única. Esto significa que una vez que sales de Azerbaiyán, la visa se agota."
  ),

  h3("Resumen de Tarifas"),
  paragraph(
    "e-Visa estándar (3 días hábiles): $69 USD. e-Visa urgente (3 horas): $69 más tarifa de procesamiento urgente que varía según el servicio."
  ),

  h2("Notas Específicas por País"),
  paragraph(
    "Diferentes países tienen experiencias de solicitud ligeramente diferentes. Aquí están las notas clave para los principales países por interés de búsqueda:"
  ),

  h3("e-Visa de Azerbaiyán para Ciudadanos de EE.UU."),
  paragraph(
    "Los titulares de pasaportes estadounidenses son completamente elegibles para la e-Visa. Procesamiento promedio: 3 horas con urgente, 3 días con estándar."
  ),

  h3("e-Visa de Azerbaiyán para Ciudadanos del Reino Unido"),
  paragraph(
    "Los titulares de pasaportes del Reino Unido son elegibles. El Brexit no cambió la política de visa de Azerbaiyán — los ciudadanos del Reino Unido continúan solicitando vía el portal e-Visa."
  ),

  h3("Visa de Azerbaiyán para Ciudadanos Italianos"),
  paragraph(
    "Los ciudadanos italianos son completamente elegibles para la e-Visa. Pasaporte debe tener 6 meses de validez, tarifa estándar de $69."
  ),

  h3("Requisitos de Visa de Azerbaiyán para Ciudadanos Paquistaníes"),
  paragraph(
    "Los titulares de pasaportes paquistaníes son elegibles para la e-Visa. La solicitud es idéntica a otras nacionalidades — no se requiere documentación adicional de embajada."
  ),

  h3("e-Visa de Azerbaiyán para Titulares de Iqama Saudí"),
  paragraph(
    "Aclaración importante: La Iqama es un permiso de residencia saudí, no un pasaporte. Al solicitar, usas el pasaporte de tu país de origen (no la Iqama)."
  ),

  h3("Visa de Azerbaiyán para Titulares de Pasaporte de Sri Lanka"),
  paragraph(
    "Los titulares de pasaportes de Sri Lanka son completamente elegibles para la e-Visa. La solicitud es el proceso estándar en línea — tarifa de $69, procesamiento de 3 días o 3 horas."
  ),

  h3("Requisitos de e-Visa de Azerbaiyán para Ciudadanos Argentinos"),
  paragraph(
    "Los requisitos para ciudadanos argentinos son los mismos que para otras nacionalidades sudamericanas. Documentos estándar — pasaporte, foto, pago."
  ),

  h3("Visa de Llegada de Azerbaiyán para Ciudadanos Malayos"),
  paragraph(
    "La visa a la llegada para Malasia ha sido reemplazada por la e-Visa estándar para ciudadanos malayos. Todos los viajeros malayos ahora deben solicitar la e-Visa en línea antes de volar."
  ),

  h2("Preguntas Frecuentes"),

  h3("¿Hay una visa especial para Bakú Azerbaiyán?"),
  paragraph(
    "No hay una visa separada para Bakú. La e-Visa de Azerbaiyán cubre la entrada a todo el país, incluyendo Bakú, Gabala, Sheki, Quba, Lankaran y todas las demás ciudades y regiones."
  ),

  h3("¿Azerbaiyán es libre de visa para algún país?"),
  paragraph(
    "La entrada libre de visa a Azerbaiyán está disponible solo para una pequeña lista de países, mayormente estados post-soviéticos como Rusia, Georgia, Ucrania, Bielorrusia, Kazajistán, Uzbekistán y Tayikistán, además de Turquía."
  ),

  h3("¿Cuál es la diferencia entre e-Visa y visa ASAN?"),
  paragraph(
    "Son lo mismo. La visa ASAN es el nombre del portal gubernamental que procesa las solicitudes de e-Visa. Los términos e-visa para Azerbaiyán, visa electrónica y visa ASAN todos se refieren al mismo producto de visa en línea."
  ),

  h3("¿Puedo extender mi e-Visa de Azerbaiyán?"),
  paragraph(
    "No — la e-Visa no se puede extender desde dentro de Azerbaiyán. Debes salir del país antes de que expire tu estancia de 30 días."
  ),

  h3("¿Qué pasa si mi solicitud de e-Visa es rechazada?"),
  paragraph(
    "Los rechazos son muy raros para solicitudes de turistas con documentación completa. Si es rechazada, puedes volver a aplicar (después de corregir el problema) o solicitar vía embajada azerbaiyana."
  ),

  h3("¿La e-Visa es aceptada en todos los puntos de entrada?"),
  paragraph(
    "Sí — el Aeropuerto Internacional Heydar Aliyev (Bakú), todos los cruces fronterizos terrestres y los puertos del Mar Caspio aceptan la e-Visa para la entrada."
  ),

  quote(
    "Consejo final: solicita tu visa de Azerbaiyán al menos 5 días antes de tu fecha de viaje planificada para evitar estrés, y siempre imprime 1-2 copias de tu e-Visa aprobada para llevar junto a tu pasaporte. ¡Buen viaje a Bakú!"
  ),
];

// ═══════════════════════════════════════════════════════════════
// ARABIC BODY (~4350 words)
// ═══════════════════════════════════════════════════════════════
const body_ar = [
  paragraph(
    "هل تخطط لرحلة إلى باكو أو أي مدينة أخرى في أذربيجان؟ أول شيء يحتاج كل مسافر دولي إلى فهمه هو نظام ",
    { text: "تأشيرة أذربيجان", bold: true },
    ". في عام 2026، يحق لمواطني أكثر من 100 دولة الحصول على ",
    { text: "التأشيرة الإلكترونية لأذربيجان", bold: true },
    " (e-Visa) بالكامل عبر الإنترنت — دون زيارة سفارة، ودون مقابلة قنصلية، ودون وثائق ورقية. سواء كنت تسافر من الولايات المتحدة، المملكة المتحدة، إيطاليا، باكستان، المملكة العربية السعودية، سريلانكا، الهند، ماليزيا، الصين، إيران، أو أي دولة مؤهلة أخرى، فإن منصة ",
    { text: "تأشيرة ASAN", bold: true },
    " تجعل الطلب بسيطًا بشكل ملحوظ — يُكتمل عادةً في أقل من خمس دقائق مع الموافقة في غضون ثلاث ساعات فقط. هذا الدليل الشامل يغطي كل ما تحتاج معرفته: ",
    { text: "سياسة التأشيرة لأذربيجان", bold: true },
    " الحالية، جميع ",
    { text: "أنواع تأشيرة أذربيجان", bold: true },
    " المتاحة (سياحية، أعمال، عبور، إلكترونية)، قائمة الدول المؤهلة الكاملة، متطلبات الوثائق، عملية التقديم خطوة بخطوة، الرسوم، الصلاحية، مدة الإقامة، معلومات خاصة بكل بلد، وأجوبة على الأسئلة الأكثر شيوعًا. ابحث عن جنسيتك أدناه للحصول على متطلبات وتفاصيل خاصة بالبلد:"
  ),

  // ─── COUNTRY GRID INJECTS HERE ───

  h2("فهم سياسة التأشيرة لأذربيجان في 2026"),
  paragraph(
    { text: "سياسة التأشيرة لأذربيجان", bold: true },
    " في عام 2026 مباشرة وودية للمسافرين مقارنة بالعديد من دول آسيا الوسطى. تحتفظ جمهورية أذربيجان بثلاث فئات رئيسية للدخول للأجانب: الدخول بدون تأشيرة لعدد محدود من البلدان (معظمها دول ما بعد السوفياتية وشركاء دبلوماسيون)، التأشيرة الإلكترونية لأذربيجان (e-Visa) للغالبية العظمى من المسافرين من أكثر من 100 دولة مؤهلة، وتأشيرة السفارة أو القنصلية التقليدية للمجموعة الصغيرة من البلدان غير المدرجة في برنامج التأشيرة الإلكترونية."
  ),
  paragraph(
    "بموجب السياسة الحالية، يحق لمواطني دول مثل الولايات المتحدة، المملكة المتحدة، ألمانيا، فرنسا، إيطاليا، إسبانيا، هولندا، أستراليا، كندا، اليابان، كوريا الجنوبية، الهند، باكستان، إندونيسيا، ماليزيا، المملكة العربية السعودية، الإمارات، قطر، الكويت، البحرين، عمان، وعشرات أخرى التقديم للتأشيرة الإلكترونية عبر الإنترنت."
  ),
  paragraph(
    "للمسافرين الذين يسألون ",
    { text: "هل تحتاج إلى تأشيرة لأذربيجان", bold: true },
    " — الإجابة لمعظم الجنسيات غير CIS هي نعم، ولكن نظام التأشيرة الإلكترونية الحديث يجعل الحصول على واحدة سهلًا مثل حجز رحلة طيران."
  ),

  h2("أنواع تأشيرة أذربيجان — أيها تحتاج؟"),
  paragraph(
    "فهم مختلف ",
    { text: "أنواع تأشيرة أذربيجان", bold: true },
    " هو الخطوة الأولى نحو طلب ناجح. تصدر الحكومة الأذربيجانية عدة فئات تأشيرة اعتمادًا على غرض ومدة إقامتك."
  ),

  h3("1. تأشيرة سياحية لأذربيجان (e-Visa)"),
  paragraph(
    "التأشيرة الأكثر شيوعًا للمسافرين هي ",
    { text: "التأشيرة السياحية لأذربيجان", bold: true },
    "، صادرة كتأشيرة إلكترونية بدخول واحد صالحة لمدة 30 يومًا من الإقامة. هذا هو الخيار الصحيح إذا كنت تزور باكو، أو أي مكان آخر في أذربيجان للسياحة، أو الزيارات العائلية، أو الرحلات الشخصية القصيرة."
  ),

  h3("2. تأشيرة الأعمال لأذربيجان"),
  paragraph(
    "إذا كنت تسافر إلى أذربيجان للاجتماعات والمؤتمرات أو الأنشطة التجارية قصيرة الأجل، يجب عليك التقديم للتأشيرة الإلكترونية للأعمال. المتطلبات مماثلة تقريبًا للتأشيرة السياحية، لكنك ستحتاج عادةً إلى رسالة دعوة من الشركة الأذربيجانية."
  ),

  h3("3. تأشيرة زيارة لأذربيجان"),
  paragraph(
    "تأشيرة الزيارة لأذربيجان مرتبطة ارتباطًا وثيقًا بالتأشيرة السياحية ولكنها مخصصة بشكل خاص للمسافرين الذين يزورون الأصدقاء أو العائلة في أذربيجان."
  ),

  h3("4. تأشيرة العبور لأذربيجان"),
  paragraph(
    "تأشيرة العبور مطلوبة إذا كنت تمر عبر أذربيجان في طريقك إلى بلد آخر وتجاوزت إقامتك العابرة نافذة العبور بدون تأشيرة."
  ),

  h3("5. تأشيرة الطلاب لأذربيجان"),
  paragraph(
    "إذا تم قبولك للدراسة في جامعة أذربيجانية، يجب عليك التقديم للحصول على تأشيرة طلاب طويلة الأجل من خلال سفارة أو قنصلية أذربيجانية."
  ),

  h3("6. تأشيرة العمل لأذربيجان"),
  paragraph(
    "يجب على الأجانب الذين يخططون للعمل في أذربيجان الحصول على تصريح عمل من خلال صاحب العمل أولاً، ثم التقديم للحصول على تأشيرة عمل مقابلة في سفارة أذربيجانية."
  ),
  paragraph(
    "بالنسبة لـ 95٪ من المسافرين للترفيه والأعمال قصيرة الأجل، التأشيرة الإلكترونية لأذربيجان (سياحية أو أعمال) هي الخيار الصحيح. من بين جميع أنواع تأشيرة أذربيجان، التأشيرة الإلكترونية هي الأسرع والأرخص والأكثر ملاءمة."
  ),

  h2("هل تحتاج إلى تأشيرة لأذربيجان؟"),
  paragraph(
    "هذا هو أحد الأسئلة الأكثر شيوعًا التي نتلقاها: ",
    { text: "هل تحتاج إلى تأشيرة لأذربيجان", bold: true },
    "؟ الإجابة المختصرة للغالبية العظمى من المسافرين الدوليين هي نعم — ولكن الحصول عليها الآن أسهل من أي وقت مضى بفضل نظام التأشيرة الإلكترونية."
  ),

  h3("البلدان بدون تأشيرة"),
  paragraph(
    "يمكن لمواطني روسيا وبيلاروسيا وأوكرانيا ومولدوفا وجورجيا وكازاخستان وقيرغيزستان وأوزبكستان وطاجيكستان وتركمانستان وتركيا الدخول إلى أذربيجان بجواز سفر ساري المفعول فقط لإقامات تصل إلى 30-90 يومًا."
  ),

  h3("الدول المؤهلة للتأشيرة الإلكترونية"),
  paragraph(
    "أكثر من 100 دولة مؤهلة لبرنامج التأشيرة الإلكترونية، بما في ذلك الولايات المتحدة، كندا، المكسيك، المملكة المتحدة، ألمانيا، فرنسا، إيطاليا، إسبانيا، هولندا، اليابان، كوريا الجنوبية، سنغافورة، ماليزيا، إندونيسيا، الفلبين، تايلاند، فيتنام، الهند، باكستان، بنغلاديش، سريلانكا، نيبال، الصين، أستراليا، نيوزيلندا، جنوب أفريقيا، مصر."
  ),

  h2("قائمة الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان"),
  paragraph(
    "قائمة ",
    { text: "الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان", bold: true },
    " تشمل الآن أكثر من 100 دولة، مما يجعل التأشيرة الإلكترونية الأذربيجانية واحدة من أكثر برامج التأشيرة الإلكترونية إمكانية الوصول في العالم."
  ),

  h3("أمريكا الشمالية والجنوبية"),
  paragraph(
    "الولايات المتحدة، كندا، المكسيك، البرازيل، الأرجنتين، تشيلي، بيرو، كولومبيا، كوستاريكا، بنما، أوروغواي ومعظم دول الكاريبي."
  ),

  h3("أوروبا — الاتحاد الأوروبي بالكامل والمزيد"),
  paragraph(
    "المملكة المتحدة، ألمانيا، فرنسا، إيطاليا، إسبانيا، هولندا، بلجيكا، سويسرا، النمسا، النرويج، السويد، الدنمارك، فنلندا، أيسلندا، أيرلندا، البرتغال، بولندا، جمهورية التشيك، سلوفاكيا، المجر، سلوفينيا، كرواتيا، رومانيا، بلغاريا، اليونان، قبرص، مالطا."
  ),

  h3("الشرق الأوسط"),
  paragraph(
    "المملكة العربية السعودية، الإمارات العربية المتحدة، الكويت، قطر، البحرين، عمان، الأردن، إسرائيل، لبنان."
  ),

  h3("آسيا والمحيط الهادئ"),
  paragraph(
    "اليابان، كوريا الجنوبية، سنغافورة، هونغ كونغ، ماكاو، تايوان، ماليزيا، إندونيسيا، بروناي، الفلبين، تايلاند، فيتنام، كمبوديا، الهند، باكستان، بنغلاديش، سريلانكا، نيبال، الصين."
  ),

  h3("أفريقيا"),
  paragraph(
    "جنوب أفريقيا، نيجيريا، مصر، المغرب، تونس، الجزائر، كينيا، غانا، إثيوبيا، تنزانيا، أوغندا، السنغال، ساحل العاج."
  ),

  h3("أوقيانوسيا"),
  paragraph(
    "أستراليا، نيوزيلندا، فيجي، ساموا."
  ),

  paragraph(
    { text: "ملاحظة هامة للمواطنين الإيرانيين:", bold: true },
    " إيران لديها برنامج تأشيرة منفصل بإجراءات خاصة. يجب على المسافرين الإيرانيين الاتصال بالقنصلية الأذربيجانية للحصول على القواعد الحالية."
  ),
  paragraph(
    { text: "لحاملي الإقامة السعودية:", bold: true },
    " يمكن للأجانب الذين يعيشون في المملكة العربية السعودية بإقامة سارية المفعول التقدم بطلب للحصول على التأشيرة الإلكترونية لأذربيجان طالما أن جنسيتهم (جواز سفرهم الأصلي) مدرجة في قائمة الدول المؤهلة."
  ),

  h2("ما هي تأشيرة ASAN؟ البوابة الرسمية للتأشيرة الإلكترونية في أذربيجان"),
  paragraph(
    { text: "تأشيرة ASAN", bold: true },
    " هي البوابة الرسمية للتأشيرة عبر الإنترنت التي تديرها حكومة أذربيجان. كلمة \"ASAN\" تأتي من الكلمة الأذربيجانية التي تعني \"سهل\" — وهو اسم مناسب نظرًا لمدى تبسيط عملية تقديم طلب التأشيرة بشكل كبير. تم إطلاقه في عام 2016 وتمت ترقيته باستمرار، يعالج نظام تأشيرة ASAN أذربيجان جميع طلبات التأشيرة الإلكترونية لجمهورية أذربيجان."
  ),

  h3("الميزات الرئيسية لنظام تأشيرة ASAN"),
  li("على الإنترنت بالكامل — لا يلزم زيارة السفارة"),
  li("واجهة متعددة اللغات (الإنجليزية، الروسية، الأذربيجانية، العربية، التركية، الصينية، الإسبانية)"),
  li("معالجة قياسية في 3 أيام عمل"),
  li("معالجة عاجلة في 3 ساعات فقط"),
  li("تأشيرة إلكترونية بدخول واحد مدتها 30 يومًا"),
  li("صلاحية 90 يومًا من الإصدار"),
  li("تسليم رقمي مباشر — تصل التأشيرة إلى بريدك الإلكتروني كملف PDF"),

  h2("متطلبات التأشيرة الإلكترونية لأذربيجان — قائمة كاملة"),
  paragraph(
    { text: "متطلبات تأشيرة أذربيجان", bold: true },
    " للتأشيرة الإلكترونية بسيطة ومحدودة مقارنة بطلبات التأشيرة التقليدية. قبل بدء طلبك، اجمع المستندات والمعلومات التالية:"
  ),

  h3("1. جواز سفر ساري المفعول"),
  paragraph(
    "يجب أن يكون جواز سفرك ساري المفعول لمدة 6 أشهر على الأقل بعد التاريخ المخطط لمغادرتك أذربيجان."
  ),

  h3("2. صورة جواز السفر الرقمية"),
  paragraph(
    "صورة فوتوغرافية حديثة التقطت خلال الأشهر الستة الماضية، بخلفية بيضاء، الوجه مرئي بوضوح، بدون نظارات شمسية أو قبعات أو مرشحات."
  ),

  h3("3. خط سير الرحلة (موصى به)"),
  paragraph(
    "في حين أنه ليس مطلوبًا دائمًا أثناء التقديم، قد يطلب المسؤولون الأذربيجانيون على الحدود تأكيد حجز فندق أو عنوان إقامتك، بالإضافة إلى تذكرة طيران للعودة أو خطة سفر."
  ),

  h3("4. عنوان بريد إلكتروني صالح"),
  paragraph(
    "يتم تسليم التأشيرة الإلكترونية المعتمدة كملف PDF إلى عنوان البريد الإلكتروني هذا."
  ),

  h3("5. طريقة الدفع"),
  paragraph(
    "بطاقة ائتمان أو خصم دولية صالحة (فيزا، ماستركارد، أمريكان إكسبريس). الرسوم القياسية هي 69 دولارًا أمريكيًا، تشمل كلاً من رسوم الحكومة والمعالجة."
  ),

  h3("6. المعلومات الشخصية ومعلومات السفر"),
  paragraph(
    "كن مستعدًا لتقديم: الاسم الكامل كما يظهر في جواز سفرك، تاريخ الميلاد، مكان الميلاد، الجنسية، رقم جواز السفر، تواريخ إصدار وانتهاء جواز السفر، العنوان الدائم في بلدك الأصلي، التاريخ المخطط للوصول إلى أذربيجان، الغرض من الزيارة، ورقم الهاتف."
  ),

  h2("كيفية التقديم للتأشيرة الإلكترونية لأذربيجان — خطوة بخطوة"),
  paragraph(
    "العملية الكاملة لـ ",
    { text: "كيفية التقديم للتأشيرة الإلكترونية لأذربيجان", bold: true },
    " مبسطة إلى سبع خطوات واضحة. يكمل معظم المتقدمين العملية بأكملها في أقل من خمس دقائق."
  ),

  h3("الخطوة 1: تحقق من أهليتك"),
  paragraph(
    "قبل أن تبدأ، تأكد من أن بلدك مدرج في قائمة الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان."
  ),

  h3("الخطوة 2: اختر سرعة المعالجة"),
  paragraph(
    "ستختار بين خيارين رئيسيين: المعالجة القياسية في 3 أيام عمل بالرسوم الأساسية، أو المعالجة العاجلة في 3 ساعات برسوم إضافية."
  ),

  h3("الخطوة 3: أكمل نموذج الطلب عبر الإنترنت"),
  paragraph(
    "يسأل الطلب عن المعلومات الشخصية (الاسم، تاريخ الميلاد، الجنسية، تفاصيل جواز السفر)، معلومات الاتصال (البريد الإلكتروني، الهاتف، العنوان)، معلومات السفر (تاريخ الوصول، غرض الزيارة)، تحميل صورة جواز السفر."
  ),

  h3("الخطوة 4: دفع رسوم التأشيرة"),
  paragraph(
    "قدم الدفع عبر بطاقة الائتمان أو الخصم. البطاقات الدولية (فيزا، ماستركارد، أمريكان إكسبريس، ديسكفر) مقبولة. الدفع آمن ومعالج عبر تشفير SSL."
  ),

  h3("الخطوة 5: انتظر الموافقة"),
  paragraph(
    "مع المعالجة العاجلة (3 ساعات)، عادة ستتلقى تأشيرتك المعتمدة في نفس يوم العمل. مع المعالجة القياسية (3 أيام عمل)، تصل معظم الموافقات في 24-72 ساعة خلال أيام العمل."
  ),

  h3("الخطوة 6: اطبع أو احفظ التأشيرة الإلكترونية"),
  paragraph(
    "بمجرد الموافقة، تصل التأشيرة الإلكترونية كملف PDF في بريدك الإلكتروني. يمكنك طباعة 1-2 نسخ وحملها مع جواز سفرك."
  ),

  h3("الخطوة 7: السفر إلى أذربيجان"),
  paragraph(
    "في الحدود الأذربيجانية — سواء كان المطار أو المعبر البري أو ميناء بحري — قدم جواز سفرك ونسخة من التأشيرة الإلكترونية."
  ),

  h2("تأشيرة عند الوصول إلى أذربيجان — من المؤهل؟"),
  paragraph(
    "يسأل العديد من المسافرين عن خيار ",
    { text: "تأشيرة عند الوصول إلى أذربيجان", bold: true },
    ". في حين أن أذربيجان تقدم امتيازات محدودة للتأشيرة عند الوصول، فإن النظام مقيد أكثر بكثير من برنامج التأشيرة الإلكترونية."
  ),

  h3("من المؤهل للتأشيرة عند الوصول"),
  paragraph(
    "التأشيرة عند الوصول متاحة عمومًا فقط لمواطني دول رابطة الدول المستقلة، وحاملي الاتفاقيات الثنائية المحددة، وحاملي جوازات السفر الدبلوماسية والرسمية من دول شريكة معينة."
  ),

  h3("من لا يحق له الحصول"),
  paragraph(
    "التأشيرة عند الوصول غير متاحة لحاملي جوازات السفر الأمريكية، حاملي جوازات السفر البريطانية، حاملي جوازات سفر الاتحاد الأوروبي، أو معظم حاملي جوازات السفر الآسيوية والأفريقية والأسترالية واللاتينية الأمريكية."
  ),

  h2("صلاحية التأشيرة الإلكترونية لأذربيجان ومدة الإقامة والرسوم"),
  paragraph(
    "فهم قواعد صلاحية التأشيرة الإلكترونية وغيرها من تفاصيل التوقيت أمر بالغ الأهمية لتخطيط رحلتك."
  ),

  h3("فترة الصلاحية: 90 يومًا"),
  paragraph(
    "التأشيرة الإلكترونية صالحة لمدة 90 يومًا من تاريخ الإصدار. هذا يعني أن لديك نافذة 3 أشهر بعد الموافقة لدخول أذربيجان."
  ),

  h3("مدة الإقامة: 30 يومًا"),
  paragraph(
    "بمجرد دخولك إلى أذربيجان، يمكنك البقاء في البلاد لمدة أقصاها 30 يومًا لكل تأشيرة. يحسب يوم الوصول كيوم 1."
  ),

  h3("نوع الدخول: دخول واحد"),
  paragraph(
    "التأشيرة الإلكترونية القياسية بدخول واحد فقط. هذا يعني أنه بمجرد مغادرتك أذربيجان، يتم استخدام التأشيرة."
  ),

  h3("ملخص الرسوم"),
  paragraph(
    "التأشيرة الإلكترونية القياسية (3 أيام عمل): 69 دولارًا أمريكيًا. التأشيرة الإلكترونية العاجلة (3 ساعات): 69 دولارًا بالإضافة إلى رسوم المعالجة العاجلة التي تختلف حسب الخدمة."
  ),

  h2("ملاحظات خاصة بكل بلد"),
  paragraph(
    "البلدان المختلفة لها تجارب طلب مختلفة قليلاً. فيما يلي ملاحظات مهمة للبلدان الأكثر شيوعًا حسب اهتمام البحث:"
  ),

  h3("التأشيرة الإلكترونية لأذربيجان للمواطنين الأمريكيين"),
  paragraph(
    "حاملو جوازات السفر الأمريكية مؤهلون تمامًا للتأشيرة الإلكترونية. متوسط المعالجة: 3 ساعات بالعاجلة، 3 أيام بالقياسية."
  ),

  h3("التأشيرة الإلكترونية لأذربيجان للمواطنين البريطانيين"),
  paragraph(
    "حاملو جوازات السفر البريطانية مؤهلون. لم يغير خروج بريطانيا من الاتحاد الأوروبي سياسة التأشيرة في أذربيجان."
  ),

  h3("تأشيرة أذربيجان للمواطنين الإيطاليين"),
  paragraph(
    "المواطنون الإيطاليون مؤهلون تمامًا للتأشيرة الإلكترونية. يجب أن يكون جواز السفر صالحًا لمدة 6 أشهر، رسوم قياسية 69 دولارًا."
  ),

  h3("متطلبات تأشيرة أذربيجان للمواطنين الباكستانيين"),
  paragraph(
    "حاملو جوازات السفر الباكستانية مؤهلون للتأشيرة الإلكترونية. الطلب مماثل لجنسيات أخرى — لا حاجة لوثائق إضافية من السفارة."
  ),

  h3("التأشيرة الإلكترونية لأذربيجان لحاملي الإقامة السعودية"),
  paragraph(
    "توضيح مهم: الإقامة هي إذن إقامة سعودي، وليست جواز سفر. عند التقديم، استخدم جواز سفر بلدك الأصلي (وليس الإقامة)."
  ),

  h3("تأشيرة أذربيجان لحاملي جواز سفر سريلانكا"),
  paragraph(
    "حاملو جواز سفر سريلانكا مؤهلون تمامًا للتأشيرة الإلكترونية. الطلب هو العملية القياسية عبر الإنترنت — رسوم 69 دولارًا، معالجة 3 أيام أو 3 ساعات."
  ),

  h3("متطلبات التأشيرة الإلكترونية لأذربيجان للمواطنين الأرجنتينيين"),
  paragraph(
    "متطلبات المواطنين الأرجنتينيين هي نفسها مثل الجنسيات الأخرى من أمريكا الجنوبية. وثائق قياسية — جواز سفر، صورة، دفع."
  ),

  h3("تأشيرة عند الوصول إلى أذربيجان للمواطنين الماليزيين"),
  paragraph(
    "تأشيرة عند الوصول إلى أذربيجان لماليزيا تم استبدالها بالتأشيرة الإلكترونية القياسية للمواطنين الماليزيين."
  ),

  h2("الأسئلة المتداولة"),

  h3("هل هناك تأشيرة خاصة لباكو أذربيجان؟"),
  paragraph(
    "لا توجد تأشيرة منفصلة لباكو. التأشيرة الإلكترونية لأذربيجان تغطي الدخول إلى البلد بأكمله، بما في ذلك باكو وغبالا وشكي وقوبا ولنكران وجميع المدن والمناطق الأخرى."
  ),

  h3("هل أذربيجان خالية من التأشيرة لأي بلد؟"),
  paragraph(
    "الدخول بدون تأشيرة إلى أذربيجان متاح فقط لقائمة صغيرة من البلدان، معظمها دول ما بعد السوفياتية مثل روسيا وجورجيا وأوكرانيا وبيلاروسيا وكازاخستان وأوزبكستان وطاجيكستان، بالإضافة إلى تركيا."
  ),

  h3("ما الفرق بين التأشيرة الإلكترونية وتأشيرة ASAN؟"),
  paragraph(
    "هما نفس الشيء. تأشيرة ASAN هي اسم البوابة الحكومية التي تعالج طلبات التأشيرة الإلكترونية."
  ),

  h3("هل يمكنني تمديد تأشيرتي الإلكترونية لأذربيجان؟"),
  paragraph(
    "لا — لا يمكن تمديد التأشيرة الإلكترونية من داخل أذربيجان. يجب عليك مغادرة البلاد قبل انتهاء إقامتك التي تبلغ 30 يومًا."
  ),

  h3("ماذا لو تم رفض طلب التأشيرة الإلكترونية؟"),
  paragraph(
    "الرفض نادر جدًا لطلبات السياح بالوثائق الكاملة. إذا تم رفضك، يمكنك إعادة التقديم (بعد تصحيح المشكلة) أو التقديم عبر السفارة الأذربيجانية."
  ),

  h3("هل يتم قبول التأشيرة الإلكترونية في جميع نقاط الدخول؟"),
  paragraph(
    "نعم — مطار حيدر علييف الدولي (باكو)، وجميع المعابر الحدودية البرية مع جورجيا وروسيا وإيران وتركيا، وموانئ بحر قزوين تقبل التأشيرة الإلكترونية للدخول."
  ),

  quote(
    "نصيحة أخيرة: قدم طلب الحصول على تأشيرة أذربيجان قبل 5 أيام على الأقل من تاريخ السفر المخطط لتجنب التوتر، واطبع دائمًا نسخة أو نسختين من التأشيرة الإلكترونية المعتمدة لحملها مع جواز سفرك. سفر آمن إلى باكو!"
  ),
];

async function run() {
  console.log("Updating post with Spanish and Arabic translations...");

  const slug = "azerbaijan-visa-complete-guide-2026";
  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  if (!existing) {
    console.error("Post not found. Run create-visa-guide-post.mjs first.");
    process.exit(1);
  }

  const result = await client
    .patch(existing._id)
    .set({
      "spanish.title_es": "Visa Azerbaiyán 2026: Guía Completa de e-Visa, Política y Requisitos",
      "spanish.category_es": "Guía de Visa",
      "spanish.excerpt_es":
        "Todo lo que necesitas saber sobre la visa de Azerbaiyán en 2026 — e-Visa, visa ASAN, tipos de visa, política, países elegibles, requisitos y cómo solicitar paso a paso.",
      "spanish.metaTitle_es":
        "Visa Azerbaiyán 2026: Guía Completa e-Visa, ASAN, Política y Requisitos",
      "spanish.metaDescription_es":
        "Guía completa de la visa de Azerbaiyán 2026. Conoce la e-Visa, visa ASAN, tipos, requisitos, países elegibles, política de visa y cómo solicitar online. 100+ países.",
      "spanish.body_es": body_es,

      "arabic.title_ar": "تأشيرة أذربيجان 2026: الدليل الكامل للتأشيرة الإلكترونية والسياسة والمتطلبات",
      "arabic.category_ar": "دليل التأشيرة",
      "arabic.excerpt_ar":
        "كل ما تحتاج إلى معرفته عن تأشيرة أذربيجان في عام 2026 — التأشيرة الإلكترونية، تأشيرة ASAN، أنواع التأشيرة، السياسة، الدول المؤهلة، المتطلبات، وكيفية التقديم خطوة بخطوة.",
      "arabic.metaTitle_ar":
        "تأشيرة أذربيجان 2026: الدليل الكامل للتأشيرة الإلكترونية ومتطلبات ASAN",
      "arabic.metaDescription_ar":
        "الدليل الكامل لتأشيرة أذربيجان 2026. تعرف على التأشيرة الإلكترونية، تأشيرة ASAN، الأنواع، المتطلبات، الدول المؤهلة، وكيفية التقديم عبر الإنترنت.",
      "arabic.body_ar": body_ar,
    })
    .commit();

  console.log("Done. Post updated:", result._id);
  console.log(`Live URLs:`);
  console.log(`  EN: https://azerbaijan-evisa.com/en/${slug}`);
  console.log(`  ES: https://azerbaijan-evisa.com/es/${slug}`);
  console.log(`  AR: https://azerbaijan-evisa.com/ar/${slug}`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
