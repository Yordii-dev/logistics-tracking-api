# Logistics Tracking API

API para gestión de **usuarios** y **paquetes**, desarrollada con **NestJS**, arquitectura limpia, Prisma ORM y MySQL como base de datos.  
El entorno local se levanta utilizando **Docker Compose** para la base de datos

---

## Requerimientos funcionales

- Node.js + NestJS
- Prisma ORM
- MySQL
- Docker
- Clean Architecture (Domain, Application, Infrastructure)
- Pnpm como gestor de paquetes (Mas rapido)

---

# HU entregadas (MVP)

### 1. Registrar usuario
**HU:** Como usuario necesito registrarme para poder gestionar mis envíos.  
**Estado:** ✔️ Completado  
**Endpoint:** `POST /users`

### 2. Consultar usuario por ID
**HU:** Como usuario necesito consultar mi información.  
**Estado:** ✔️ Completado  
**Endpoint:** `GET /users/:id`

### 3. Registrar un paquete
**HU:** Como usuario necesito registrar un paquete con origen, destino y estado.  
**Estado:** ✔️ Completado  
**Endpoint:** `POST /packages`

### 4. Listar paquetes por usuario
**HU:** Como usuario necesito ver mis paquetes registrados.  
**Estado:** ✔️ Completado  
**Endpoint:** `GET /packages/:userId`

---

## Criterios de priorización (MVP)

1. **Usuarios** (ya que sin usuarios no hay paquetes)  
2. **Registro de paquetes**  
3. **Consulta de paquetes por usuario**

Se priorizó **flujo mínimo funcional** para demostrar trazabilidad básica del sistema.

---

## Instalación del proyecto

### Clonacion del repositorio

```sh
git clone https://github.com/Yordii-dev/logistics-tracking-api.git
cd logistics-tracking-api
```

### Instalacion de dependencias

```sh
pnpm install
```

### Levantar MySQL con Docker

```sh
docker compose up -d
```

### Ejecutar migraciones de Prisma

```sh
pnpm prisma:migrate:all
```

### Levantar servidor

```sh
pnpm start:dev
```

### La API escuhara en:

```sh
http://localhost:3000
```

## Usos de la API

### Usuarios

#### Crear usuarios
POST /users

```sh
{
    "name": "Jhenifer",
    "email": "Jhenifer@gmail.com",
    "password": "12345"
}

```

#### Obtener usuario
GET /users/:id

```sh
http://localhost:3000/users/d6553513-ce8b-4cbc-bd90-fd1ba7fb5126

```

### Paquetes

#### Crear paquetes
POST /packages

```sh
{
    "ownerId": "d6553513-ce8b-4cbc-bd90-fd1ba7fb5126",
    "origin": "Trujillo",
    "destination": "Piura"
}

```

#### Obtener paquetes
GET /packages/:userId

```sh
http://localhost:3000/packages/d6553513-ce8b-4cbc-bd90-fd1ba7fb5126
```


## Mejoras futuras

Agregar autenticacion JWT

Endpoints de seguimiento de paquetes

Integrar base NoSQL para los logs y tracking

Dockerfile para empaquetar la API

Swagger para documentación automática de los endopoints