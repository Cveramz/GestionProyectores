# Gestión de proyectores
El siguiente proyecto consiste en construir una web en la que se pueda administrar el uso de proyectores de un departamento. En este caso se usa de ejemplo el Departamento de Ingeniería Informática de la USACH.
El proyecto fue llevado a cabo utilizando microservicios, usando SpringBoot para el Backend y React para el Frontend.

## Como ejecutar el proyecto:
Debe ejecutar cada microservicio en el siguiente orden.

### Backend con Intellij Idea:
Para un correcto funcionamiento debe ejecutar el backend en el siguiente orden:
1. Config-Service
2. Profesor-Service
3. Proyector-Service
4. Prestamo-Service
5. Devolucion-Service
6. Gateway-Service

### Frontend:
Basta con tener instalado Node y abrir un terminal en la raiz de la carpeta del Frontend, debe ejecutar el siguiente código:
1. Instalación de dependencias y librerías
```npm install```
2. Iniciar servidor de Frontend
```npm run dev```