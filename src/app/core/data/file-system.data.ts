import { FileNode } from '../models/file-system.model';

export const FILES: FileNode[] = [
  {
    id: 'root',
    name: 'ANDRES-SERRANO-PORTFOLIO',
    type: 'folder',
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# ¡Bienvenido a mi Portafolio! 

Usa la **Barra de Actividad** de la izquierda para navegar.
- 📂 **Explorador**: Explora los archivos del proyecto.
- 🔍 **Buscar**: Buscar archivos.
- 🐙 **Código Fuente**: Ver mi GitHub.

### Inicio Rápido
¡Haz clic en \`inicio.ts\` para ver mi perfil!

> **Tips VS Code**: 
> Puedes alternar entre la **Vista de Código** y la **Vista Previa (UI)** usando el botón de "Ojo" 👁️ en la esquina superior derecha de cada archivo.
`
      },
      {
        id: 'inicio',
        name: 'inicio.ts',
        type: 'file',
        language: 'typescript',
        content: `export const desarrollador = {
  nombre: 'Andres Serrano',
  titulo: 'Desarrollador de Software',
  ubicacion: 'Ecuador',
  disponible: true,
  stack: [
    'Angular',
    'Java', 
    'TypeScript',
    'Spring Boot',
    'PostgreSQL',
    '.NET',
    'SQL Server',
    'Arquitectura',
    'Blazor'
  ],
  bio: 'Soy un Desarrollador de Software apasionado por la tecnología y la creación de soluciones eficientes. Me encanta enfrentar nuevos desafíos, aprender constantemente y aportar ideas innovadoras.'
};
`
      },
      {
        id: 'sobre-mi',
        name: 'sobre-mi.json',
        type: 'file',
        language: 'json',
        content: `{
  "formacion": [
    {
      "titulo": "Tecnólogo Superior en Desarrollo de Software",
      "institucion": "Instituto Tecnológico Universitario Cordillera",
      "anio": "2025",
      "registro": "2250-2024-3005395"
    }
  ],
  "experiencia": [
    {
      "puesto": "Desarrollador JAVA",
      "empresa": "Secretaria Técnica de Gestión Inmobiliaria del Sector Publico “Inmobiliar”",
      "periodo": "2024/03-2024/08",
      "descripcion": "• Desarrollo e implementación de módulos empresariales con Java EE 7 y PostgreSQL.\\n• Diseño y optimización de interfaces con PrimeFaces (Backend-Frontend).\\n• Mantenimiento y soporte técnico de infraestructura TI.\\n• Capacitación a usuarios para mejora de productividad."
    }
  ],
  "intereses": [
    "Arquitectura de Software",
    "UX/UI",
    "Desarrollo de aplicaciones web",
    "Inteligencia Artificial",
  ]
}`
      },
      {
        id: 'proyectos',
        name: 'proyectos.ts',
        type: 'file',
        language: 'typescript',
        content: `/**
 * Sistema de Administración de Gimnasios - Gym FLOW
 * Solución integral para la gestión operativa y financiera de centros deportivos.
 */

export const proyectos = [
  {
    nombre: 'GYM FLOW',
    descripcionCorta: 'Solución integral para la gestión operativa y financiera de centros deportivos, diseñada con una arquitectura robusta y escalable.',
    stack: [
      { name: 'Java 21 (LTS)', icon: 'java' },
      { name: 'Spring Boot 3.5', icon: 'spring' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'JWT', icon: 'key' },
      { name: 'Flyway', icon: 'database' }
    ],
    capacidades: [
      'Gestión de Socios y Membresías: Control de suscripciones (Activo, Vencido, Pendiente), contratos dinámicos.',
      'Control Financiero: Gestión de caja, ingresos/egresos y conciliación bancaria.',
      'Ventas e Inventario: Punto de Venta (POS) y control de stock inteligente.',
      'Infraestructura: Gestión de activos y mantenimientos.',
      'BI: Métricas en tiempo real y análisis de tendencias.'
    ],
    arquitectura: 'Diseño Orientado a Dominios (DDD), Clean Code & SOLID, Seguridad Multicapa e Integración Transaccional.',
    tags: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL', 'JWT', 'Flyway'],
    estado: 'Completado',
    demoUrl: 'https://sistma-gym-frontend-angular.vercel.app/login', 
    repoUrl: 'https://github.com/andresSP23/',
    bannerUrl: 'gym-flow/GYMFLOW.webp'
  },

];`
      },
      {
        id: 'habilidades',
        name: 'habilidades.yml',
        type: 'file',
        language: 'yaml',
        content: `frontend:
  - Angular
  - React
  - CSS Grid / Flexbox
  - RxJS
  - TypeScript
  - HTML
  - CSS
  - JavaScript
backend:
  - Spring Boot
  - JAVA
  - C#  
  - Tests
  
herramientas:
  - Docker
  - Git
  - Github
  - Jmeter
  - Postman
  - Netbeans
  - VS Code
  - Antigravity

bases_de_datos:
  - PostgreSQL
  - MySQL
  - SQL Server
  
  `
      },
      {
        id: 'contacto',
        name: 'contacto.md',
        type: 'file',
        language: 'markdown',
        content: `## Contacto

- **Email:** andres.serrano.puebla@gmail.com
- **Email Provisional:** andres.dx23@gmail.com
- **Telefono:** 0999068118

¡Prefiero que me contacten por teléfono!
`
      }
    ]
  }
];
