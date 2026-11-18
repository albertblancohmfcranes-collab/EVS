export type VehicleType = '1' | '2' | '3';

export type DiagramType =
  | 'types'
  | 'pos'
  | 'fold'
  | 'cab_over'
  | 'ext_cal'
  | 'slew'
  | 'x'
  | 'ext_x'
  | 'y1_pos'
  | 'ext_y1';

export type AlertType = 'warn' | 'stop' | 'info';

export interface StepAlert {
  type: AlertType;
  label?: string;
  text: string;
}

export interface VehicleOption {
  key: VehicleType;
  text: string;
}

export interface StepData {
  n: number;
  title: string;
  badge?: string;
  screen: string[];
  diagram: DiagramType | null;
  actions: string[];
  options?: VehicleOption[];
  alerts?: StepAlert[];
  note?: string;
  branch?: string;
  finalLabel?: string;
  enter: boolean;
}

export const STEPS: StepData[] = [
  {
    n: 1,
    title: 'Entrar y elegir el tipo de vehículo',
    screen: ['Front, Long Vehicle', 'Back, Long Vehicle', 'Short Vehicle'],
    diagram: 'types',
    actions: [
      'Ve al menú **1.6.3 EVS-setup**, pulsa ENTER y pulsa **1**, **2** o **3** según tu montaje.',
    ],
    options: [
      {
        key: '1',
        text: 'Front, Long Vehicle (tras cabina, largo)',
      },
      {
        key: '2',
        text: 'Back, Long Vehicle (atrás, largo)',
      },
      {
        key: '3',
        text: 'Short Vehicle (tras cabina, corto)',
      },
    ],
    alerts: [
      {
        type: 'warn',
        text: 'Con **cesta porta-personas**, elige siempre **1 (Front, Long Vehicle)**.',
      },
    ],
    enter: false,
  },
  {
    n: 2,
    title: 'Posición de la grúa en el vehículo',
    screen: ['Select Crane pos', '1. Left', '2. Right'],
    diagram: 'pos',
    actions: [
      'Pulsa **1 (Left)** o **2 (Right)**.',
      '**AIC** (ej. 5062/1): flecha en sentido de marcha → **1 Left**.',
      '**DPS / EVSC:** mismo lado que RCL 5300 / 5400, parte redonda delante → **1 Left**.',
      'Si la grúa está girada **180°** respecto al estándar → **2 Right**.',
    ],
    enter: false,
  },
  {
    n: 3,
    title: 'Plegar la grúa',
    screen: ['Fold crane', 'Then press enter'],
    diagram: 'fold',
    actions: [
      'Pliega a **posición de transporte** o deja extensiones en **vertical**.',
    ],
    note: 'Así el peso propio no influye en la inclinación del vehículo.',
    enter: true,
  },
  {
    n: 4,
    title: 'Calibración automática',
    screen: ['Waiting for calibration'],
    diagram: null,
    actions: [
      '**No toques nada.** Calibra X e Y a 0° automáticamente.',
      'Espera a que cambie la pantalla.',
    ],
    alerts: [
      {
        type: 'info',
        label: 'SI NO CALIBRA',
        text: 'Presión del cilindro principal demasiado alta (> «Max Calibration»): **no se puede calibrar**.',
      },
      {
        type: 'warn',
        text: 'No uses **patas estabilizadoras** ni nada que cambie el cero de inclinación en **todo el procedimiento**.',
      },
    ],
    enter: false,
  },
  {
    n: 5,
    title: 'Preparar el giro de 360°',
    screen: ['Prepare Crane for 360° slew', 'Then press Enter'],
    diagram: 'cab_over',
    actions: [
      'Despliega la grúa desde transporte.',
      'Coloca extensiones para girar 360° (sobre cabina) **sin cambiarlas**.',
      'Brazo principal al **ángulo mínimo**; brazo de inclinación **horizontal** y extensiones **dentro**.',
      'Gira a la **izquierda** hasta quedar sobre la cabina (**Y1**).',
    ],
    enter: true,
  },
  {
    n: 6,
    title: 'Extender hasta carga máxima de calibración',
    screen: ['Extend to max calibration', 'load level'],
    diagram: 'ext_cal',
    actions: [
      'Saca las extensiones **lentamente** hasta que se paren y el zumbador suene **continuo**.',
    ],
    alerts: [
      {
        type: 'info',
        label: 'EL SISTEMA REGISTRA',
        text: 'Peso propio registrado en **Max calibration** (menú 1.1.1.1.1.18.2.1.1).',
      },
    ],
    enter: true,
  },
  {
    n: 7,
    title: 'Giro lento de 360°',
    screen: ['Slowly slew 360°', 'Then press Enter', 'X= -m°, Y1= -m°, Y2= -m°'],
    diagram: 'slew',
    actions: [
      'Gira **lentamente y sin parar** 360° a la **derecha**, hasta volver sobre la cabina.',
    ],
    alerts: [
      {
        type: 'info',
        label: 'EL SISTEMA REGISTRA',
        text: '**Dead Load Margin** en XL, XR, Y1 e Y2 (XL y XR salen iguales).',
      },
      {
        type: 'warn',
        text: 'Haz **solo** este giro. La velocidad baja sola a HDL.',
      },
    ],
    enter: true,
  },
  {
    n: 8,
    title: 'Buscar inclinación máxima en X (con carga)',
    screen: ['Find max inclination in', 'X-dir with load.', 'Then press Enter'],
    diagram: 'x',
    actions: [
      'Gira a la **izquierda** y cuelga el **bloque (125 %)** cerca del vehículo.',
      'Levántalo y gira a la izquierda hasta **detrás (Y2)**, cerca del suelo.',
      'Gira **90° a la derecha** hasta la **pata estabilizadora** (diagonal atrás).',
      'Oscila entre pata y atrás: **déjala donde la barra negra sea más larga**.',
    ],
    enter: true,
  },
  {
    n: 9,
    title: 'Extender hasta levantar rueda (lado X)',
    screen: ['Extend slowly until unstable', 'X= -m°, Y1= -m°, Y2= -m°'],
    diagram: 'ext_x',
    actions: [
      'Saca el bloque **lentamente** hacia fuera, **cerca del suelo**.',
      'Para cuando la **rueda del lado contrario** empiece a despegar del suelo.',
    ],
    alerts: [
      {
        type: 'info',
        label: 'EL SISTEMA REGISTRA',
        text: '**Max Margin** XL/XR (1.1.1.1.1.18.2.2.2/5) y % de carga.',
      },
    ],
    branch:
      '**Tras ENTER:** **Opción 2:** termina y vuelve al menú 1.6.3. **Opción 1 o 3:** sigue en el paso 10.',
    enter: true,
  },
  {
    n: 10,
    title: 'Llevar el bloque a la dirección Y1',
    badge: 'Solo vehículos 1 y 3',
    screen: ['Withdraw and Slew to', 'Y1-dir Then press Enter'],
    diagram: 'y1_pos',
    actions: [
      'Recoge el bloque con la extensión **lo más corta posible**.',
      'Gira a la **derecha** hasta quedar **delante de la cabina (Y1)**.',
      'Baja el brazo de articulación y saca un poco: bloque **cerca del suelo**.',
    ],
    alerts: [
      {
        type: 'warn',
        text: 'Si está muy inestable en Y1, **quita el bloque** antes del paso 11.',
      },
    ],
    enter: true,
  },
  {
    n: 11,
    title: 'Extender hasta levantar rueda (lado Y1)',
    badge: 'Solo vehículos 1 y 3',
    screen: ['Extend slowly until unstable', 'X= -m°, Y1= -m°, Y2= -m°'],
    diagram: 'ext_y1',
    actions: [
      'Saca el bloque **lentamente** hacia fuera, **cerca del suelo**.',
      'Para cuando la **rueda trasera** empiece a despegar del suelo.',
    ],
    alerts: [
      {
        type: 'info',
        label: 'EL SISTEMA REGISTRA',
        text: '**Max Margin** Y1 (1.1.1.1.1.18.2.3.2) y % de carga.',
      },
      {
        type: 'warn',
        text: 'Va a **Max stable load** (1.1.1.1.1.18.2.1.2), o la del paso 9 si es menor (ver nota final).',
      },
    ],
    enter: true,
  },
  {
    n: 12,
    title: 'Fin y guardado',
    screen: ['EVS Calibrated', 'Press Enter'],
    diagram: null,
    actions: [
      'Pulsa ENTER. Aparece **Storing in module** y guarda en RCL.',
      'Pulsa ENTER otra vez: los nuevos valores **sustituyen a los anteriores**.',
      'Vuelve solo al menú **1.6.3**.',
    ],
    finalLabel: 'Procedimiento terminado',
    enter: false,
  },
];

export const CHECKLIST_ITEMS = [
  'Bloque de peso del 125 % del momento de carga con alcance máximo.',
  'Espacio libre para girar 360° (también sobre la cabina).',
  'Grúa en posición de transporte al empezar.',
];

export const CHECKLIST_STOP_ALERT: StepAlert = {
  type: 'stop',
  text: 'No uses patas estabilizadoras ni funciones que cambien el cero de inclinación en todo el procedimiento.',
};

export interface SavedParam {
  name: string;
  route: string;
  description: string;
}

export const SAVED_PARAMS: SavedParam[] = [
  {
    name: 'Max calibration',
    route: '1.1.1.1.1.18.2.1.1',
    description: 'Peso propio al extender del todo (paso 6).',
  },
  {
    name: 'Max stable load',
    route: '1.1.1.1.1.18.2.1.2',
    description: 'Carga máx. en Y1, o en XL/XR si es menor (paso 11). Ver nota.',
  },
  {
    name: 'Max margin XL/XR',
    route: '1.1.1.1.1.18.2.2.2/5',
    description: 'Inclinación máxima en laterales (paso 9).',
  },
  {
    name: 'Max margin Y1',
    route: '1.1.1.1.1.18.2.3.2',
    description: 'Inclinación máxima hacia delante (paso 11).',
  },
  {
    name: 'Dead load margin',
    route: '(XL, XR, Y1, Y2)',
    description: 'Inclinación por peso propio en giro de 360° (paso 7).',
  },
];

export const FINISH_ACTIONS: string[] = [
  'Anota los valores en el esquema EVS, columna «Configuración básica».',
  'Revisa Dead load margin (XL/XR, Y1 e Y2): deben ser razonables.',
  'Sigue con «Control y optimización de las configuraciones del sistema EVS».',
];

export const FINISH_MAX_STABLE_LOAD_NOTE: StepAlert = {
  type: 'warn',
  label: 'Nota sobre «Max stable load»',
  text: 'Desde RCL 5300 v32_23 ya no se configura con la guía CGW 5355; hay que ajustarlo a mano (capítulo «Prueba de estabilidad»).',
};

export const USEFUL_KEYS = [
  {
    keyLabel: 'ESC',
    description: 'Interrumpe la guía y lleva al menú 1.6.3 (EVS setup).',
  },
  {
    keyLabel: 'Flecha arriba',
    description: 'Vuelve al punto anterior para repetir un parámetro.',
  },
];
