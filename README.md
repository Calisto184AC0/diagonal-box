# Elemento de diseño - Diagonal Box

Es un elemento `div` con una altura definida que incorpora una diagonal que se va agudizando a medida que se va escondiendo el elemento tras hacer _scroll_.

## Tecnologías

- TypeScript: Lenguaje de programación
- Vite: Generar página de ejemplo y _scaffolding_ del proyecto
- Rollup: Generar _script_ final.

## Cómo usarlo

### 1. Instalación

Primero hay que obtener el fichero `config-diagonal-box.js` dentro de la carpeta `output` e incluirlo en el proyecto en el que estés trabajando.

Añadiéndolo de esta forma:

```html
<head>
  <script async type="text/javascript" src="path/config-diagonal-box.js" />
</head>
```

O así:

```html
<head>
  <script async type="text/javascript">
    // copiando y pegando aquí el contenido del fichero config-diagonal-box.js
  </script>
</head>
```

### 2. Configuración

Tras ejecutar el _script_, el navegador ya tendrá disponible la siguiente función, `configDiagonalBox`, este o puede recibir un objecto o nada.

Pero es importante que se ejecute después de que el HTML se haya descargado y del _script_ del anterior paso. Para ello vamos a utilizar la propiedad `defer` de la etiqueta `script`.

```html
<script defer type="text/javascript">
  configDiagonalBox();
</script>
```

### 3. Uso

Ahora en tu HTML, tendrás que utilizar la siguiente clase en tus elementos `div`:

```
diagonal-box_container
```

Y así ya debería funcionar!

### 4. Estilos

Para los estilos puedes utilizar la clase CSS y el selector de line, por ejemplo, así:

```css
.diagonal-box_container line {
  stroke: red; /* color de la línea */
  stroke-width: 4; /* grosor de la línea */
}
```

## Cómo saber si funciona

Para saber si está funcionando bien el _script_, se puede añadir la siguiente opción:

```js
configDiagonalBox({
  logs: true,
});
```

De este modo, en la consola debería aparecer las siguientes líneas:

```
CONFIG DIAGONAL BOX INIT
NUMBER OF DIAGONAL BOXES: 4 <-- tendría que aparecer el número de divs que tienen la clase CSS necesaria en dicha página
```
