# PersonalREADME.md

## Inicialización del proyecto React Native con YARN

### 1. Instalación de dependencias por primera vez

1. **Instala YARN** (si no lo tienes):
   - En la terminal, ejecuta:
     ```pwsh
     npm install --global yarn
     ```

2. **Instala las dependencias del proyecto:**
   - Ubícate en la carpeta raíz del proyecto.
   - Ejecuta:
     ```pwsh
     yarn install
     ```

3. **Inicia el proyecto:**
   - Ejecuta:
     ```pwsh
     yarn dev
     ```
   - Esto levantará el servidor de desarrollo y podrás ver la app en el navegador.

---

## Reiniciar el proyecto después de cerrarlo

1. **Abre la terminal en la carpeta raíz del proyecto.**
2. **Ejecuta el servidor de desarrollo:**
   ```pwsh
   yarn dev
   ```
3. **Si has agregado nuevas dependencias o actualizaciones, ejecuta:**
   ```pwsh
   yarn install
   ```
   (Solo si es necesario, normalmente basta con `yarn dev` si ya instalaste las dependencias antes).

---

## Notas adicionales
- Si tienes problemas con dependencias, puedes limpiar la caché y reinstalar:
  ```pwsh
  yarn cache clean
  yarn install
  ```
- Si el puerto está ocupado, puedes cambiarlo en el archivo `vite.config.ts`.

---

**¡Listo! Así puedes inicializar y reiniciar tu proyecto React Native con YARN.**

## Esto me parece muy util y lo he usado por mi experiencia entre npm y yarn

| Acción                                | npm                             | yarn                          |
| ------------------------------------- | ------------------------------- | ----------------------------- |
| **Crear proyecto con Vite**           | `npm create vite@latest my-app` | `yarn create vite my-app`     |
| **Instalar todas las dependencias**   | `npm install`                   | `yarn install` ó `yarn`       |
| **Agregar dependencia**               | `npm install paquete`           | `yarn add paquete`            |
| **Agregar dependencia de desarrollo** | `npm install -D paquete`        | `yarn add -D paquete`         |
| **Eliminar dependencia**              | `npm uninstall paquete`         | `yarn remove paquete`         |
| **Actualizar dependencia**            | `npm update paquete`            | `yarn upgrade paquete`        |
| **Ejecutar script (ej: dev)**         | `npm run dev`                   | `yarn dev`                    |
| **Ejecutar script genérico**          | `npm run <script>`              | `yarn <script>`               |
| **Instalar globalmente**              | `npm install -g paquete`        | `yarn global add paquete`     |
| **Ver versión instalada**             | `npm list paquete`              | `yarn list --pattern paquete` |



https://classic.yarnpkg.com/en/docs/cli/run

---

## 🔐 CORS (Cross-Origin Resource Sharing) - Guía Completa

### ¿Qué es CORS?
CORS es una **política de seguridad del navegador** que controla qué sitios web pueden hacer peticiones a otros dominios.

**Ejemplo:**
- Tu app React está en: `http://localhost:5173`
- Quieres consumir API de: `https://api.ejemplo.com`
- El navegador **bloquea** esta petición por seguridad (diferentes orígenes)

### ¿De qué depende que un servicio tenga CORS habilitado?

**La configuración CORS la controla el SERVIDOR (backend), NO el frontend:**

#### ✅ **APIs con CORS habilitado** (permiten peticiones desde navegadores):
```
Access-Control-Allow-Origin: *  // Permite cualquier origen
Access-Control-Allow-Origin: http://localhost:3000  // Permite solo ese origen específico
```
- **JSONPlaceholder:** `Access-Control-Allow-Origin: *`
- **APIs públicas para desarrollo:** Suelen tener CORS abierto

#### ❌ **APIs sin CORS o restringido:**
```
Access-Control-Allow-Origin: https://misitio.com  // Solo permite ese dominio
// O sin headers CORS = bloqueo total desde navegadores
```
- **Reqres.in:** CORS restringido para localhost
- **APIs corporativas:** Suelen tener CORS muy restrictivo

### 🛠️ **Soluciones para problemas de CORS:**

#### **1. Proxy en desarrollo (vite.config.ts) - RECOMENDADO**
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://reqres.in',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
```

**¿Cómo funciona?**
- Tu app hace petición a: `http://localhost:5173/api/users`
- Vite redirige automáticamente a: `https://reqres.in/api/users`
- El navegador ve la petición como "mismo origen" → No hay CORS

#### **2. Backend propio (Producción)**
```javascript
// Express.js ejemplo
app.use(cors({
  origin: ['https://miapp.com', 'http://localhost:3000']
}));
```

#### **3. Extensiones de navegador (Solo desarrollo)**
- **CORS Unblock** - Chrome Extension
- ⚠️ **NUNCA para producción** - Solo para testing

### 📝 **¿Cuándo configurar proxy en vite.config.ts?**

#### ✅ **SÍ configurar proxy cuando:**
- La API externa **no tiene CORS habilitado** para tu origen
- Necesitas **consumir múltiples APIs** con diferentes dominios
- Quieres **simular el comportamiento de producción** en desarrollo

#### ❌ **NO necesitas proxy cuando:**
- La API ya tiene **CORS habilitado** (`Access-Control-Allow-Origin: *`)
- Es una **API pública para desarrollo** (como JSONPlaceholder)
- Tienes **control del backend** y puedes configurar CORS ahí

### 🎯 **¿Es buena práctica la solución implementada?**

#### ✅ **SÍ, es excelente práctica porque:**
1. **Simula producción:** En producción normalmente tienes proxy/gateway
2. **Seguro:** No desactiva las protecciones CORS del navegador
3. **Limpio:** Mantiene URLs relativas en el código (`/api/users`)
4. **Escalable:** Fácil agregar más endpoints al proxy

#### 📋 **Configuración múltiples APIs:**
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api/users': {
        target: 'https://reqres.in',
        changeOrigin: true,
      },
      '/api/posts': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
      },
      '/api/weather': {
        target: 'https://api.openweather.com',
        changeOrigin: true,
      }
    }
  }
})
```

### 🚨 **Errores comunes CORS:**

#### **Error típico:**
```
Access to fetch at 'https://api.ejemplo.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header
```

#### **Solución paso a paso:**
1. **Identifica el problema:** CORS
2. **Verifica si puedes controlar el backend:** ¿Es tu API?
   - **SÍ:** Configura CORS en el servidor
   - **NO:** Usa proxy en desarrollo
3. **Implementa proxy en vite.config.ts**
4. **Reinicia el servidor de desarrollo**

### 💡 **Consejos importantes:**
- **CORS solo afecta navegadores** - Postman, curl, apps móviles NO tienen restricciones CORS
- **En producción** considera usar un API Gateway o proxy reverso
- **Nunca desactives CORS** en producción por seguridad
- **URLs relativas** (`/api/users`) son más flexibles que URLs absolutas

---

para la parte de formularios se instaló 

https://react-hook-form.com/

esto es importante a tener en cuenta porque esto ya hace varias cosas en los formularios de React