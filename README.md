# Agenda · Mes de la Salud Mental 2026

Sitio estático ubicado en `docs/`, preparado para GitHub Pages y pensado para incrustarse en Wix mediante una URL. No contiene encabezado ni pie institucional. Incluye un título breve, filtros y paginación de ocho actividades. Se publica como una primera propuesta para revisar con Comunicación y Prensa.

## Datos

Las actividades están en `docs/eventos.json`. La estructura se documenta en `docs/eventos.schema.json`. Cada objeto en `events` representa una actividad. Para agregar otra, copiar un objeto, darle un `id` único, completar fecha ISO (`AAAA-MM-DD`), hora de 24 horas (`HH:MM` o `null`), título, descripción, localidad, lugar, categoría, modalidad y organización. `sourceRow` identifica la fila original si provino de la planilla; para una carga manual puede ser `null`. El sitio ordena por fecha y hora y completa automáticamente los filtros.

La planilla original tiene respuestas personales de contacto. El JSON público no incluye direcciones de quienes respondieron, teléfonos ni correos de contacto. Los títulos fueron editados para navegación; las descripciones conservan el sentido de cada respuesta. La versión inicial incluye 37 registros de octubre. Se excluyeron tres de septiembre y una carga aparentemente repetida del 5 de octubre (fila 35); se conservó la fila 32. Las cargas del 7 de octubre en Hospital Elpidio Torres aparecen separadas porque declaran horarios distintos. Dos actividades sin hora muestran “Horario a confirmar”; una no tiene localidad.

Antes de considerar la agenda definitiva conviene validar esos casos, revisar las actividades de circulación interna y confirmar los datos de lugar y hora con los equipos. La primera versión marca “Agenda en actualización”. Al aprobarse el programa se puede cambiar `status` a `publicado` y ajustar el aviso de la interfaz.

## Publicación e incrustación

Servir `docs/` como sitio estático. En Wix, incrustar la URL publicada y probar el ancho y la altura en escritorio y móvil. El contenedor de Wix puede requerir una altura manual; ofrecer también un enlace para abrir la agenda completa.

Las piezas de campaña de Drive usan principalmente Poppins con verde oscuro, verde medio y amarillo intenso. La versión actual incorpora Poppins para textos y títulos y reserva el amarillo como acento para sostener la legibilidad de la agenda. Poppins se distribuye con licencia SIL Open Font License (copia en `docs/assets/fonts/OFL.txt`). Los archivos de Wigglye y Riffic compartidos no se incorporaron porque sus licencias para este uso no quedaron acreditadas. No se reprodujeron las ilustraciones ni logos institucionales en el componente: la página de Wix aporta el marco institucional.
