import { VolleyballQuestion, CourseModule } from '../types';

export const VOLLEYBALL_QUESTIONS: VolleyballQuestion[] = [
  {
    id: 'vb-1',
    category: 'Historia y Cancha',
    question: '¿Quién inventó el voleibol en el año 1895 en Massachusetts, Estados Unidos?',
    options: [
      'James Naismith',
      'William G. Morgan',
      'Pierre de Coubertin',
      'Michael Jordan'
    ],
    correctIndex: 1,
    explanation: 'William G. Morgan era director de educación física y buscaba un deporte sin choques bruscos para sus alumnos.',
    didYouKnow: 'Al principio, el voleibol se llamaba "Mintonette" antes de recibir su nombre actual por la volea del balón.'
  },
  {
    id: 'vb-2',
    category: 'Historia y Cancha',
    question: '¿Cuáles son las medidas oficiales del campo de juego de voleibol?',
    options: [
      '18 metros de largo por 9 metros de ancho',
      '20 metros de largo por 10 metros de ancho',
      '15 metros de largo por 8 metros de ancho',
      '28 metros de largo por 15 metros de ancho'
    ],
    correctIndex: 0,
    explanation: 'El campo mide 18x9 metros, dividido por la red en dos cuadrados iguales de 9x9 metros para cada equipo.',
    didYouKnow: 'Cada mitad de la cancha tiene exactamente la misma área: 81 metros cuadrados.'
  },
  {
    id: 'vb-3',
    category: 'Reglas Oficiales',
    question: '¿Cuántos toques como máximo puede dar un equipo antes de enviar el balón al campo contrario?',
    options: [
      '2 toques',
      '3 toques (sin contar el bloqueo)',
      '4 toques',
      'Toques ilimitados'
    ],
    correctIndex: 1,
    explanation: 'La regla fundamental permite hasta 3 toques (típicamente: recepción, colocación y remate). El toque de bloqueo no cuenta como uno de esos tres.',
    didYouKnow: 'Un mismo jugador no puede tocar el balón dos veces consecutivas.'
  },
  {
    id: 'vb-4',
    category: 'Fundamentos Técnicos',
    question: '¿Qué fundamento técnico se utiliza principalmente para recibir saques y defender remates potentes?',
    options: [
      'Golpe de antebrazo (o pase de recepción)',
      'Toque de dedos (voleo alto)',
      'Bloqueo con una sola mano',
      'Pase con el pie'
    ],
    correctIndex: 0,
    explanation: 'El golpe de antebrazo con brazos estirados y muñecas juntas amortigua la fuerza del balón y lo dirige con precisión al colocador.',
    didYouKnow: 'Se recomienda flexionar las rodillas para usar la fuerza de las piernas al golpear con los antebrazos.'
  },
  {
    id: 'vb-5',
    category: 'Fundamentos Técnicos',
    question: '¿Cómo se llama el pase alto que se realiza con las yemas de los dedos para preparar el remate de un compañero?',
    options: [
      'Golpe de muñeca',
      'Toque de dedos o Voleo',
      'Saque bajo mano',
      'Plancha defensiva'
    ],
    correctIndex: 1,
    explanation: 'El voleo o toque de dedos forma un triángulo con los dedos índices y pulgares sobre la frente para distribuir el juego con suavidad.',
    didYouKnow: 'El colocador o armador es como el "cerebro" del equipo porque decide quién rematará la jugada.'
  },
  {
    id: 'vb-6',
    category: 'Reglas Oficiales',
    question: 'En un partido oficial de voleibol, ¿cuántos jugadores de un equipo están en la cancha al mismo tiempo?',
    options: [
      '5 jugadores',
      '6 jugadores',
      '7 jugadores',
      '11 jugadores'
    ],
    correctIndex: 1,
    explanation: 'En voleibol de pista juegan 6 jugadores por equipo: 3 delanteros cerca de la red y 3 zagueros en la zona defensiva trasera.',
    didYouKnow: 'En voleibol de playa solo juegan 2 personas por equipo y no hay sustituciones.'
  },
  {
    id: 'vb-7',
    category: 'Posiciones y Tácticas',
    question: '¿En qué sentido se realiza la rotación de los jugadores cuando recuperan el servicio?',
    options: [
      'En el sentido de las agujas del reloj (hacia la derecha)',
      'En sentido contrario a las agujas del reloj (hacia la izquierda)',
      'No hay rotación obligatoria',
      'Solo rotan los zagueros'
    ],
    correctIndex: 0,
    explanation: 'Cuando el equipo receptor gana el punto, todos sus jugadores rotan una posición en el sentido de las agujas del reloj.',
    didYouKnow: 'El jugador de la posición 2 pasa a la posición 1 para realizar el nuevo saque.'
  },
  {
    id: 'vb-8',
    category: 'Posiciones y Tácticas',
    question: '¿Quién es el jugador que viste una camiseta de color diferente al resto de sus compañeros?',
    options: [
      'El Capitán del equipo',
      'El Líbero (especialista defensivo)',
      'El Rematador principal',
      'El Árbitro auxiliar'
    ],
    correctIndex: 1,
    explanation: 'El Líbero viste de otro color para ser fácilmente identificado. Es un defensor excepcional que no puede rematar por encima de la red ni sacar en muchas ligas.',
    didYouKnow: 'La palabra "líbero" viene del italiano y significa "libre", porque puede entrar y salir en la zona zaguera sin pedir cambio al árbitro.'
  },
  {
    id: 'vb-9',
    category: 'Reglas Oficiales',
    question: 'Si el balón cae y toca exactamente la línea que delimita la cancha, ¿qué se cobra?',
    options: [
      'Balón fuera (punto para el rival)',
      'Balón dentro / punto válido',
      'Se repite el punto',
      'Falta técnica'
    ],
    correctIndex: 1,
    explanation: 'En el voleibol, las líneas forman parte del campo de juego. Si cualquier parte del balón toca la línea blanca, es punto válido (dentro).',
    didYouKnow: 'Los árbitros de línea usan banderines rojos para indicar claramente si cayó adentro o afuera.'
  },
  {
    id: 'vb-10',
    category: 'Fundamentos Técnicos',
    question: '¿Qué acción defensiva consiste en saltar junto a la red con las manos arriba para interceptar el remate rival?',
    options: [
      'El Bloqueo',
      'El Saque flotante',
      'La Recepción',
      'El Engaño o finta'
    ],
    correctIndex: 0,
    explanation: 'El bloqueo es la primera línea defensiva. Puede ser individual, doble o triple para devolver el balón al campo contrario.',
    didYouKnow: 'Al bloquear, las manos deben estar firmes y los dedos bien abiertos pero sin tocar jamás la red.'
  },
  {
    id: 'vb-11',
    category: 'Reglas Oficiales',
    question: '¿Qué ocurre si un jugador toca la red con el cuerpo durante una jugada activa?',
    options: [
      'Se le permite si fue sin intención',
      'Se cobra falta de red (punto para el equipo contrario)',
      'Se cobra tiro libre',
      'Se amonesta al entrenador'
    ],
    correctIndex: 1,
    explanation: 'Tocar la red entre las dos varillas durante la disputa del balón es falta, ya que interfiere con el juego limpio.',
    didYouKnow: 'Las varillas o antenas rojas y blancas señalan el límite exacto por donde debe pasar el balón.'
  },
  {
    id: 'vb-12',
    category: 'Juego Limpio y Arbitraje',
    question: '¿A qué distancia de la red se encuentra la "Línea de Ataque" que divide la zona de delanteros y zagueros?',
    options: [
      'A 1 metro',
      'A 3 metros',
      'A 5 metros',
      'A 6 metros'
    ],
    correctIndex: 1,
    explanation: 'La línea de 3 metros marca el límite para que los zagueros puedan saltar a rematar solo si impulsan su salto por detrás de ella.',
    didYouKnow: 'Esta regla protege el equilibrio del juego para que los atacantes no rematen todos pegados a la red.'
  },
  {
    id: 'vb-13',
    category: 'Fundamentos Técnicos',
    question: 'Para un estudiante principiante de 6to grado, ¿cuál es el tipo de saque más seguro y fácil de aprender?',
    options: [
      'Saque en salto potente',
      'Saque por abajo (saque de seguridad)',
      'Saque con efecto curvado',
      'Saque de espaldas'
    ],
    correctIndex: 1,
    explanation: 'El saque por abajo permite controlar la dirección y fuerza con la mano abierta o puño firme, ideal para iniciar los partidos con éxito.',
    didYouKnow: 'El saque es el único momento del voleibol donde el jugador tiene el control absoluto del balón sin interferencia.'
  },
  {
    id: 'vb-14',
    category: 'Juego Limpio y Arbitraje',
    question: '¿Cuál de estas actitudes representa el verdadero espíritu deportivo y Juego Limpio en Voleibol?',
    options: [
      'Burlarse del rival cuando falla un saque',
      'Felicitar y chocar las manos con los compañeros tras cada punto, se gane o se pierda',
      'Discutir agresivamente con el árbitro',
      'Negarse a saludar al equipo rival al terminar'
    ],
    correctIndex: 1,
    explanation: 'El voleibol es el deporte de equipo por excelencia: tras cada jugada los jugadores se reúnen en el centro para apoyarse mutuamente.',
    didYouKnow: 'La unión y el ánimo constante del equipo aumentan la concentración y el rendimiento en un 40%.'
  }
];

export const VOLLEYBALL_COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Origen, Valores y Filosofía del Voleibol',
    iconName: 'Sparkles',
    description: 'Descubre cómo nació este emocionante deporte y por qué promueve el trabajo en equipo y el respeto.',
    lessons: [
      {
        id: 'les-1-1',
        title: 'El Nacimiento del Mintonette en 1895',
        duration: '4 min',
        summary: 'William G. Morgan inventó el voleibol para que personas de todas las edades pudieran jugar activamente sin riesgo de colisiones duras.',
        content: [
          'En febrero de 1895, en la ciudad de Holyoke, Massachusetts (Estados Unidos), William G. Morgan buscaba una alternativa deportiva.',
          'Quería un juego bajo techo para el invierno que combinara elementos del tenis, el baloncesto y el balonmano, pero sin el contacto físico directo entre oponentes.',
          'Diseñó una red elevada de 1.98 metros y utilizó una cámara inflable de un balón de baloncesto. Lo bautizó originalmente como "Mintonette".',
          'Un espectador llamado Alfred Halstead observó que el balón se jugaba siempre "en el aire" o en "volea" (volleying), por lo que propuso el nombre definitivo: Volleyball (Voleibol).'
        ],
        keyRules: [
          'Deporte de no invasión: cada equipo permanece en su propia mitad de la cancha.',
          'El balón nunca debe detenerse ni apoyarse en el suelo; debe mantenerse siempre vivo en el aire.',
          'Se promueve la cooperación absoluta, ya que nadie puede jugar solo.'
        ],
        interactiveTip: '¡Recuerda el nombre de William G. Morgan! Es una de las preguntas clave en tu examen de graduación.',
        quiz: {
          question: '¿Cuál fue el primer nombre que recibió el voleibol antes de su nombre actual?',
          options: ['Basket-net', 'Mintonette', 'Volley-ballon', 'Air-ball'],
          correctIndex: 1,
          explanation: '¡Exacto! William G. Morgan lo llamó Mintonette, y luego se cambió a Volleyball debido a la acción de volear el balón.'
        }
      },
      {
        id: 'les-1-2',
        title: 'Los Valores del Deporte: Juego Limpio y Compañerismo',
        duration: '4 min',
        summary: 'En 6to grado aprendemos que la comunicación positiva y el saludo deportivo son tan importantes como anotar puntos.',
        content: [
          'A diferencia de otros deportes donde un jugador estrella puede correr con el balón por toda la cancha y anotar solo, en voleibol es IMPOSIBLE.',
          'Para que haya un remate exitoso, primero se necesita una buena recepción (antebrazo) y un pase milimétrico (voleo). Todos son indispensables.',
          'El respeto al árbitro, reconocer cuando tocamos la red aunque nadie lo haya visto, y animar al compañero que falló un saque definen al verdadero voleibolista.'
        ],
        keyRules: [
          'Saludar siempre a la red con el equipo contrario al inicio y al final.',
          'Celebrar cada esfuerzo positivo en equipo reuniéndose en el centro de la cancha.',
          'Aceptar las decisiones arbitrales con madurez y educación.'
        ],
        interactiveTip: 'La regla del aplauso de apoyo: cuando alguien falla, ¡le decimos "buena intención, a la siguiente sale mejor"!',
        quiz: {
          question: '¿Por qué se dice que el voleibol es el deporte de equipo por excelencia?',
          options: [
            'Porque se necesita que varios compañeros toquen el balón para construir la jugada',
            'Porque se juega con 15 personas a la vez',
            'Porque no hay árbitro en el partido',
            'Porque el balón es muy pesado'
          ],
          correctIndex: 0,
          explanation: '¡Excelente! Nadie puede ganar un partido de voleibol en solitario; se requiere coordinación y confianza entre los 6 integrantes.'
        }
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'La Cancha, la Red y las 6 Posiciones',
    iconName: 'LayoutGrid',
    description: 'Aprende las medidas reglamentarias, cómo se divide el campo y cómo rotan los jugadores.',
    lessons: [
      {
        id: 'les-2-1',
        title: 'Medidas Oficiales y Líneas de la Cancha',
        duration: '5 min',
        summary: 'Un rectángulo de 18x9 metros con una red central, líneas laterales y la famosa línea de ataque a 3 metros.',
        content: [
          'Dimensiones: La cancha es un rectángulo perfecto de 18 metros de longitud por 9 metros de ancho.',
          'Dos campos iguales: La red divide la cancha en dos cuadrados idénticos de 9 metros por 9 metros.',
          'Línea de Ataque (3 metros): En cada campo, a 3 metros de la red, existe una línea paralela. Divide la cancha en "Zona de Delanteros" (frente a la red) y "Zona de Zagueros" (defensa trasera).',
          'La Red y Antenas: La altura de la red varía según la categoría escolar. En los extremos de la red hay dos varillas rojiblancas llamadas "Antenas" o "Varillas". El balón debe pasar obligatoriamente entre ellas.'
        ],
        keyRules: [
          'Las líneas de la cancha miden 5 cm de ancho y son PARTE del campo (balón en la línea es BUENO).',
          'Si el balón toca la antena o pasa por fuera de ella, se declara balón fuera.',
          'La zona libre exterior debe tener al menos 3 metros de despeje para que los jugadores puedan salvar balones.'
        ],
        interactiveTip: 'Visualiza la cancha como dos cubos gemelos de 9x9m. ¡Es fácil de recordar multiplicando 9 x 2 = 18m!',
        quiz: {
          question: '¿A qué distancia de la red se traza la línea de ataque?',
          options: ['A 1.5 metros', 'A 3 metros', 'A 4.5 metros', 'A 6 metros'],
          correctIndex: 1,
          explanation: '¡Correcto! Está a exactamente 3 metros de la red y delimita la zona de ataque frente a la zona de zagueros.'
        }
      },
      {
        id: 'les-2-2',
        title: 'Las 6 Posiciones y el Sentido de Rotación',
        duration: '5 min',
        summary: 'Conoce los números de las posiciones en la cancha del 1 al 6 y cómo rotan en sentido horario.',
        content: [
          'En el voleibol las posiciones se numeran del 1 al 6. No van en orden circular simple, ¡atención!',
          'Posición 1: Zaguero derecho (¡desde aquí se realiza el saque!).',
          'Posición 2: Delantero derecho.',
          'Posición 3: Delantero centro (bloqueador central y atacante rápido).',
          'Posición 4: Delantero izquierdo (rematador de punta).',
          'Posición 5: Zaguero izquierdo.',
          'Posición 6: Zaguero centro (defensa principal de fondo).',
          '¿Cuándo se rota? Solo cuando tu equipo recibe el saque rival y GANA el punto (recuperación de saque). Todos los jugadores se mueven UNA posición en el sentido de las agujas del reloj.'
        ],
        keyRules: [
          'La rotación es obligatoria para garantizar que todos los jugadores experimenten ataque y defensa.',
          'Si un equipo no respeta el orden de rotación al momento del saque, comete "Falta de Posición".',
          'El jugador que rota hacia la Posición 1 es quien toma el balón para ejecutar el saque.'
        ],
        interactiveTip: 'Acuérdate: Delanteros arriba (4, 3, 2 de izquierda a derecha), Zagueros abajo (5, 6, 1 de izquierda a derecha).',
        quiz: {
          question: '¿Desde cuál de las 6 posiciones de la cancha se efectúa el saque?',
          options: ['Posición 3', 'Posición 6', 'Posición 1', 'Posición 4'],
          correctIndex: 2,
          explanation: '¡Exacto! El jugador en la posición 1 (zaguero derecho) va detrás de la línea de fondo para sacar.'
        }
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Los 5 Fundamentos Técnicos del Voleibol',
    iconName: 'Activity',
    description: 'Aprende la postura y técnica correcta para el saque, antebrazo, voleo, remate y bloqueo.',
    lessons: [
      {
        id: 'les-3-1',
        title: 'El Saque y el Golpe de Antebrazo',
        duration: '6 min',
        summary: 'Inicia el juego con precisión y defiende con solidez usando la superficie plana de tus brazos.',
        content: [
          '1. El Saque (Servicio): Es el gesto técnico con el que se pone en juego el balón. Para 6to grado recomendamos el "Saque por Abajo": pies firmes, rodillas semi-flexionadas, sostén el balón con una mano y golpea con la otra en forma de péndulo.',
          '2. Golpe de Antebrazo (Pase de Manos Bajas / Recepción): Se usa para recibir balones rápidos o bajos. Junta tus manos uniendo pulgares paralelos, gira los codos hacia adentro para formar una tabla plana con los antebrazos, y amortigua sin doblar los codos.',
          'Error común a evitar: No golpees con las muñecas ni con los dedos cerrados en bola; el impacto debe ser en el tercio medio del antebrazo.'
        ],
        keyRules: [
          'El sacador tiene 8 segundos después del silbato del árbitro para realizar el saque.',
          'No se puede pisar la línea de fondo antes de golpear el balón en el saque.',
          'Los antebrazos no deben balancearse exageradamente hacia arriba; la fuerza proviene de las piernas.'
        ],
        interactiveTip: 'Piensa en tus antebrazos como una rampa de madera inclinada hacia donde quieres dirigir el balón.',
        quiz: {
          question: '¿Con qué parte de los brazos se debe golpear el balón durante la recepción defensiva?',
          options: [
            'Con los codos',
            'Con la superficie plana de los antebrazos',
            'Con las palmas abiertas de las manos',
            'Con la punta de los dedos'
          ],
          correctIndex: 1,
          explanation: '¡Muy bien! Los antebrazos ofrecen una plataforma amplia, estable y precisa para controlar el balón.'
        }
      },
      {
        id: 'les-3-2',
        title: 'El Voleo, el Remate y el Bloqueo',
        duration: '6 min',
        summary: 'Arma la jugada con las yemas de tus dedos, salta para rematar con fuerza y defiende sobre la red con el bloqueo.',
        content: [
          '3. Toque de Dedos o Voleo: Se realiza colocándose exactamente debajo del balón con los codos abiertos. Las manos forman una copa o "triángulo" con pulgares e índices a la altura de la frente, tocando el balón únicamente con las yemas de los dedos.',
          '4. El Remate (Ataque): Es la acción ofensiva para enviar el balón con fuerza hacia el piso contrario. Consta de 4 fases: carrera de impulso, batida de salto, golpeo en el punto más alto con la mano abierta envolviendo el balón, y caída equilibrada.',
          '5. El Bloqueo: Defensa en la red donde uno, dos o tres jugadores saltan con brazos estirados y manos firmes para devolver el remate rival antes de que cruce a nuestro campo.'
        ],
        keyRules: [
          'El toque de dedos debe ser limpio; si el balón descansa en las manos se cobra "retención" o "acarreo".',
          'El contacto del bloqueo NO cuenta como uno de los 3 toques permitidos por equipo.',
          'Durante el remate o bloqueo, está terminantemente prohibido tocar la malla o pisar completamente el campo rival.'
        ],
        interactiveTip: 'Al bloquear, ¡nunca cierres los ojos! Mira la trayectoria del balón y las manos del rematador.',
        quiz: {
          question: '¿El toque que realiza un jugador durante un bloqueo cuenta como el primer toque de los 3 permitidos?',
          options: [
            'Sí, siempre cuenta como primer toque',
            'No, el bloqueo no cuenta y el equipo aún dispone de sus 3 toques completos',
            'Solo si el balón sale hacia atrás',
            'Depende de la decisión del capitán'
          ],
          correctIndex: 1,
          explanation: '¡Excelente regla! En el voleibol oficial de sala, el bloqueo no consume ninguno de los 3 toques del equipo.'
        }
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Reglas de Oro, Puntuación y el Líbero',
    iconName: 'ShieldCheck',
    description: 'Comprende el sistema de puntos Rally Point, las faltas más comunes y el rol del especialista líbero.',
    lessons: [
      {
        id: 'les-4-1',
        title: 'El Sistema de Puntos y Faltas Frecuentes',
        duration: '5 min',
        summary: 'Cada jugada otorga un punto al ganador. Conoce qué cosas están prohibidas según el reglamento oficial.',
        content: [
          'Sistema Rally Point (Punto por Jugada): Antiguamente solo sumaba quien tenía el saque; hoy en día CADA JUGADA otorga un punto a quien la gane, sin importar quién haya sacado.',
          'Partidos estándar: Se juegan al mejor de 3 o 5 sets. Los sets normales se ganan a 25 puntos con al menos 2 puntos de ventaja. En nuestro juego interactivo de práctica jugamos a 10 puntos directos para partidas ágiles y didácticas.',
          'Faltas más comunes en 6to grado:',
          '• Cuatro toques: Dar más de tres contactos en el equipo.',
          '• Doble golpe: Un mismo jugador golpea dos veces consecutivas el balón.',
          '• Toque de red: Rozar la red con cualquier parte del cuerpo mientras el balón está en juego.',
          '• Invasión: Cruzar completamente la línea central bajo la red estorbando al contrario.'
        ],
        keyRules: [
          'Un balón que toca la red durante el saque y pasa al otro campo ES VÁLIDO y sigue en juego.',
          'El balón puede ser golpeado con cualquier parte del cuerpo, ¡incluso con el pie si es un rescate de emergencia!',
          'Para ganar un set debe haber una diferencia mínima de 2 puntos.'
        ],
        interactiveTip: 'Si salvas el balón con el pie cuando ya no llegas con las manos, ¡es totalmente legal según las reglas modernas!',
        quiz: {
          question: '¿Qué sucede si el balón roza la parte superior de la red durante el saque pero cae dentro del campo rival?',
          options: [
            'Es falta y se pierde el punto',
            'El saque es válido y el juego continúa normalmente',
            'Se debe repetir el saque sin sanción',
            'Se cobra invasión de red'
          ],
          correctIndex: 1,
          explanation: '¡Correcto! En las reglas actuales, si el balón toca la red en el servicio y cruza al otro campo dentro de las líneas, ¡la jugada sigue activa!'
        }
      },
      {
        id: 'les-4-2',
        title: 'El Líbero: Guardián de la Defensa',
        duration: '4 min',
        summary: 'El jugador más ágil y con uniforme distinto que domina la recepción y las salvadas acrobáticas.',
        content: [
          'En 1998 la Federación Internacional de Voleibol (FIVB) introdujo la figura del LÍBERO para hacer los partidos más dinámicos y espectaculares.',
          'Características principales del Líbero:',
          '1. Viste una camiseta de color claramente contrastante con el resto de su equipo.',
          '2. Es el mejor receptor y defensor del equipo.',
          '3. Solo puede jugar en la zona de zagueros (posiciones 5, 6 y 1).',
          '4. Puede entrar y salir de la cancha tantas veces como sea necesario para reemplazar a cualquier zaguero sin gastar sustituciones oficiales.',
          'Restricciones: No puede rematar balones que estén completamente por encima de la red, no puede bloquear ni participar en tentativas de bloqueo.'
        ],
        keyRules: [
          'Si el líbero hace un pase de dedos dentro de la zona de ataque (3m), su compañero no puede rematar el balón por encima de la red.',
          'El líbero no puede ser capitán del equipo en cancha en muchas competiciones por sus constantes rotaciones.',
          'Su presencia equilibra el juego entre la fuerza de los rematadores gigantes y la velocidad defensiva.'
        ],
        interactiveTip: 'Si eres rápido de reflejos y te encanta defender, ¡la posición de líbero es perfecta para ti!',
        quiz: {
          question: '¿Cuál de las siguientes acciones NO tiene permitido realizar el Líbero?',
          options: [
            'Hacer una recepción con golpe de antebrazo',
            'Rematar un balón por encima de la altura de la red',
            'Salvar un balón lanzándose al suelo (plancha)',
            'Pasar el balón con toque de dedos desde la zona de zagueros'
          ],
          correctIndex: 1,
          explanation: '¡Excelente! El Líbero tiene prohibido rematar balones por encima de la red y bloquear, pues su especialidad es 100% defensiva.'
        }
      }
    ]
  }
];

export const GRADUATION_EXAM_QUESTIONS: VolleyballQuestion[] = [
  {
    id: 'exam-1',
    category: 'Historia y Cancha',
    question: '¿En qué año y en qué país nació el voleibol como deporte educativo?',
    options: [
      '1895 en Estados Unidos',
      '1924 en Francia',
      '1950 en Brasil',
      '1904 en Inglaterra'
    ],
    correctIndex: 0,
    explanation: 'Fue creado en 1895 por William G. Morgan en Holyoke, Massachusetts, Estados Unidos.'
  },
  {
    id: 'exam-2',
    category: 'Historia y Cancha',
    question: '¿Cuáles son las dimensiones reglamentarias de la cancha de voleibol?',
    options: [
      '15 metros por 7 metros',
      '18 metros de largo por 9 metros de ancho',
      '22 metros por 11 metros',
      '20 metros por 10 metros'
    ],
    correctIndex: 1,
    explanation: 'El campo mide 18x9 metros, con dos áreas simétricas de 9x9 metros.'
  },
  {
    id: 'exam-3',
    category: 'Reglas Oficiales',
    question: '¿Cuántos toques consecutivos puede dar un MISMO jugador al balón?',
    options: [
      'Máximo 2 toques',
      'Solo 1 toque (no puede tocarlo dos veces seguidas)',
      'Hasta 3 toques',
      'Ilimitados si el balón no cae'
    ],
    correctIndex: 1,
    explanation: 'Un jugador no puede tocar el balón dos veces seguidas, excepto si el primer toque fue un bloqueo.'
  },
  {
    id: 'exam-4',
    category: 'Fundamentos Técnicos',
    question: 'Para recibir un saque potente o defender un remate bajo, ¿cuál es el gesto técnico adecuado?',
    options: [
      'Golpe de antebrazo con brazos estirados y rodillas flexionadas',
      'Golpear con la cabeza hacia arriba',
      'Intentar atrapar el balón con las manos y lanzarlo',
      'Empujar el balón con una sola mano'
    ],
    correctIndex: 0,
    explanation: 'El golpe de antebrazo proporciona la superficie plana ideal para controlar la velocidad del balón.'
  },
  {
    id: 'exam-5',
    category: 'Posiciones y Tácticas',
    question: '¿Cuántos jugadores de cada equipo participan en el campo durante un partido oficial?',
    options: ['4 jugadores', '5 jugadores', '6 jugadores', '8 jugadores'],
    correctIndex: 2,
    explanation: 'Cada equipo cuenta con 6 jugadores en cancha: 3 delanteros y 3 zagueros.'
  },
  {
    id: 'exam-6',
    category: 'Posiciones y Tácticas',
    question: '¿Hacia qué lado giran los jugadores durante la rotación al recuperar el saque?',
    options: [
      'En el sentido de las agujas del reloj (hacia la derecha)',
      'En sentido antihorario (hacia la izquierda)',
      'Hacia adelante en línea recta',
      'No se rota, cada quien mantiene su sitio todo el partido'
    ],
    correctIndex: 0,
    explanation: 'Todos los jugadores rotan un puesto en el sentido de las manecillas del reloj.'
  },
  {
    id: 'exam-7',
    category: 'Posiciones y Tácticas',
    question: '¿Cuál es la función exclusiva del Líbero en el voleibol?',
    options: [
      'Es el rematador estrella del equipo',
      'Es un especialista defensivo que viste camiseta diferente y solo juega de zaguero',
      'Es el jugador encargado de arbitrar las faltas',
      'Es el entrenador en la cancha'
    ],
    correctIndex: 1,
    explanation: 'El líbero refuerza la recepción y defensa zaguera y no puede rematar ni bloquear.'
  },
  {
    id: 'exam-8',
    category: 'Reglas Oficiales',
    question: 'Si el balón cae sobre la línea limítrofe de la cancha, el árbitro señala:',
    options: [
      'Balón Fuera (Out)',
      'Balón Dentro (In / Punto Válido)',
      'Falta del sacador',
      'Repetición de jugada'
    ],
    correctIndex: 1,
    explanation: 'Las líneas perimetrales forman parte activa del campo de juego.'
  },
  {
    id: 'exam-9',
    category: 'Fundamentos Técnicos',
    question: '¿Con qué parte de las manos se debe ejecutar el voleo o toque de dedos?',
    options: [
      'Con la palma de la mano plana',
      'Con las yemas de los dedos formando un triángulo sobre la frente',
      'Con los puños cerrados',
      'Con las muñecas cruzadas'
    ],
    correctIndex: 1,
    explanation: 'El toque de dedos suave con las yemas permite una colocación amortiguada y precisa.'
  },
  {
    id: 'exam-10',
    category: 'Juego Limpio y Arbitraje',
    question: '¿Qué valor deportivo fundamental se destaca en el voleibol escolar de 6to grado?',
    options: [
      'La rivalidad individualista',
      'La cooperación, el respeto al rival y el ánimo constante al compañero',
      'Protestar cada punto al árbitro',
      'Jugar sin pasar el balón a los demás'
    ],
    correctIndex: 1,
    explanation: 'El voleibol fomenta el juego limpio, la empatía y la unión en cada punto disputado.'
  }
];
