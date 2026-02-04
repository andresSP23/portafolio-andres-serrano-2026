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
    'PostgreSQL'
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
      "anio": "2025"
    }
  ],
  "experiencia": [
    {
      "puesto": "Desarrollador JAVA",
      "empresa": "Secretaria Técnica de Gestión Inmobiliaria del Sector Publico “Inmobiliar”",
      "periodo": "2024/03-2024/08",
      "descripcion": "Desarrollo e implementación de módulos empresariales utilizando Java EE 7 y PostgreSQL, incluyendo el diseño de procedimientos almacenados y triggers para garantizar la integridad y eficiencia de los datos.\\n\\nDiseño, optimización e integración de interfaces de usuario con PrimeFaces, asegurando una comunicación efectiva entre el backend y el frontend.\\n\\nExperiencia en soporte técnico y mantenimiento preventivo y correctivo de equipos de cómputo y redes.\\n\\nCapacitación y acompañamiento a usuarios finales en el uso eficiente de herramientas tecnológicas, orientado a la mejora de la productividad."
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
    nombre: 'Sistema de administracion de Gimnasios - GYM FLOW',
    descripcion: \`Solución integral para la gestión operativa y financiera de centros deportivos, diseñada con una arquitectura robusta y escalable.

STACK TECNOLÓGICO:
• Lenguaje: Java 21 (LTS)
• Framework Principal: Spring Boot 3.5
• Persistencia: Spring Data JPA con Hibernate y PostgreSQL
• Seguridad: Spring Security con autenticación basada en JWT (Stateless)
• Gestión de Base de Datos: Migraciones automatizadas con Flyway
• Generación de Documentos: iTextPDF para contratos y reportes dinámicos
• Documentación de API: OpenAPI / Swagger (Springdoc)

CAPACIDADES DEL SISTEMA:
1. Gestión de Socios y Membresías: Control de suscripciones (Activo, Vencido, Pendiente), contratos dinámicos en PDF, seguimiento físico y control de asistencia.
2. Control Financiero y Contabilidad: Gestión de sesiones de caja, flujo de caja (ingresos/egresos), conciliación bancaria y categorización de gastos.
3. Ventas e Inventario: Punto de Venta (POS), control de stock inteligente y categorización comercial.
4. Infraestructura y Mantenimiento: Gestión de activos físicos y programación de mantenimientos preventivos/correctivos automáticos.
5. Inteligencia de Negocios: Métricas en tiempo real, análisis de tendencias y top de ventas.

ARQUITECTURA Y PATRONES:
Diseño Orientado a Dominios (DDD), Clean Code & SOLID, Seguridad Multicapa e Integración Transaccional para garantizar la integridad de los datos.\`,
    tags: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL', 'JWT', 'Flyway'],
    estado: 'Completado',
    demoUrl: '#', 
    repoUrl: 'https://github.com/andresSP23',
    imagenes: [
      'gym-flow/Screenshot 2026-02-03 183901.webp',
      'gym-flow/Screenshot 2026-02-03 184007.webp',
      'gym-flow/Screenshot 2026-02-03 184036.webp',
      'gym-flow/Screenshot 2026-02-03 184121.webp',
      'gym-flow/Screenshot 2026-02-03 184145.webp',
      'gym-flow/Screenshot 2026-02-03 184219 (1).webp',
      'gym-flow/Screenshot 2026-02-03 184219.webp',
      'gym-flow/Screenshot 2026-02-03 184259.webp',
      'gym-flow/Screenshot 2026-02-03 184340.webp',
      'gym-flow/Screenshot 2026-02-03 184412.webp',
      'gym-flow/Screenshot 2026-02-03 184511.webp',
      'gym-flow/Screenshot 2026-02-03 184546.webp',
      'gym-flow/Screenshot 2026-02-03 184611.webp',
      'gym-flow/Screenshot 2026-02-03 184830.webp',
      'gym-flow/Screenshot 2026-02-03 184910.webp',
      'gym-flow/Screenshot 2026-02-03 184949.webp',
      'gym-flow/Screenshot 2026-02-03 185014.webp',
      'gym-flow/Screenshot 2026-02-03 185042.webp',
      'gym-flow/Screenshot 2026-02-03 185115.webp',
      'gym-flow/Screenshot 2026-02-03 185149.webp',
      'gym-flow/Screenshot 2026-02-03 185211.webp',
      'gym-flow/Screenshot 2026-02-03 185246.webp',
      'gym-flow/Screenshot 2026-02-03 185303.webp',
      'gym-flow/Screenshot 2026-02-03 185320.webp',
      'gym-flow/Screenshot 2026-02-03 185339.webp'
    ]
  },
  {
    nombre: 'VS Code Portfolio',
    descripcion: 'Este portafolio simulando un IDE con funcionalidades de navegación, búsqueda y edición simulada.',
    tags: ['Angular', 'Signals', 'TypeScript'],
    estado: 'En Progreso',
    demoUrl: '#',
    repoUrl: 'https://github.com/andresSP23/portafolio-andres-serrano-2026'
  }
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
- **Telefono:** 0999068118

¡Hablemos de código!
`
      }
    ]
  }
];
