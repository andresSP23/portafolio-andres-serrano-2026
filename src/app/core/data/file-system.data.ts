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
- 🔍 **Buscar**: Busca cadenas (solo demostración).
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
        content: `export const proyectos = [
  {
    nombre: 'Sistema para administrar un gimnasio',
    descripcion: \`Un sistema diseñado para satisfacer todas las necesidades de un gimnasio de barrio, desde la creación de clientes, suscripciones, productos y servicios, hasta la gestión de pagos y asistencias, caja y reportes.

          Además, permite registrar todos los movimientos de dinero de la caja y bancos.Incluye gestión personalizada de contratos, facturación eficiente, control de servicios básicos y mantenimiento de equipamiento.\`,
    tags: ['Angular', 'Spring Boot', 'PostgreSQL'],
    estado: 'Completado',
    demoUrl: '#', 
    repoUrl: 'https://github.com/andresSP23'
  },
  {
    nombre: 'VS Code Portfolio',
    descripcion: 'Este portafolio simulando un IDE.',
    tags: ['Angular', 'Signals'],
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
