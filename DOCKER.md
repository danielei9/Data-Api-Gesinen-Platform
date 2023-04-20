# DOCKER

Para crear un contenedor de Docker para tu API de Node.js y Express, debes seguir los siguientes pasos:

Crear un archivo Dockerfile: En tu proyecto, crea un archivo llamado "Dockerfile" en la raíz del proyecto. Este archivo es una receta que le indica a Docker cómo construir la imagen de tu contenedor.

Especificar la imagen base: En el archivo Dockerfile, especifica la imagen base que deseas utilizar. Por ejemplo, puedes utilizar la imagen oficial de Node.js para construir tu contenedor:

    FROM node:latest

Copiar el código de la aplicación: Copia todo el código de tu aplicación (incluyendo el archivo package.json) a la carpeta de trabajo del contenedor, que se especifica con el comando "WORKDIR" en el Dockerfile:

    WORKDIR /usr/src/app
    COPY . .

Instalar dependencias: Ejecuta el comando "npm install" para instalar todas las dependencias de Node.js:

    RUN npm install

Exponer el puerto: Especifica el puerto que utilizará tu aplicación en el contenedor con el comando "EXPOSE" en el Dockerfile:

    EXPOSE 3000

Iniciar la aplicación: Finalmente, inicia tu aplicación con el comando "npm start" en el Dockerfile:

    CMD ["npm", "start"]

Construir la imagen: Ahora que has creado tu Dockerfile, puedes construir la imagen de tu contenedor utilizando el siguiente comando en la terminal (debes estar en el mismo directorio que el archivo Dockerfile):

    docker build -t nombre_del_contenedor .

Este comando creará una imagen de Docker con el nombre especificado y el último punto indica la ubicación del archivo Dockerfile.

Ejecutar el contenedor: Para ejecutar tu contenedor, utiliza el siguiente comando en la terminal:

    docker run -p 3000:3000 nombre_del_contenedor

Este comando ejecutará tu contenedor y mapeará el puerto 3000 del contenedor al puerto 3000 de tu sistema operativo. Ahora puedes acceder a tu API en tu navegador web visitando "localhost:3000".

Desplegar en un servidor Linux: Finalmente, para desplegar tu contenedor en un servidor Linux, debes asegurarte de tener Docker instalado en el servidor y utilizar los comandos "docker build" y "docker run" para construir y ejecutar la imagen de tu contenedor en el servidor.

También puedes utilizar herramientas de orquestación de contenedores como Kubernetes o Docker Swarm para simplificar el proceso de despliegue.

## Docker Compose

Es posible configurar la conexión a la base de datos externa de PostgreSQL utilizando Sequelize en el archivo Dockerfile. Sin embargo, es más común hacerlo en el archivo docker-compose.yml porque es más fácil de mantener y configurar.

La principal diferencia entre Dockerfile y docker-compose.yml es que el Dockerfile se utiliza para definir la configuración de una imagen de contenedor, mientras que el docker-compose.yml se utiliza para definir la configuración de una aplicación que consta de varios contenedores.

En otras palabras, el Dockerfile se utiliza para crear una imagen de contenedor que contiene el código y las dependencias de la aplicación, mientras que el docker-compose.yml se utiliza para definir cómo se ejecutarán los contenedores de la aplicación y cómo se conectarán entre sí.****

Ejecute el siguiente comando para iniciar los contenedores y la red de Docker:

    docker-compose up -d

Si está intentando conectarse desde un contenedor Docker que ejecuta su API a otro contenedor Docker que ejecuta su base de datos, debe asegurarse de que ambos contenedores se ejecuten en la misma red de Docker. Esto permitirá que los contenedores se comuniquen entre sí utilizando sus nombres de contenedor en lugar de direcciones IP.

Puede crear una red de Docker utilizando el siguiente comando:

    docker network create <nombre-de-la-red>
