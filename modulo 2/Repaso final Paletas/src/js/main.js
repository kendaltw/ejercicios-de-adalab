'use strict';

/* 1
Pintar todas las paletas que me da el servidor
Seleccionar los elementos de mi html
Pido los datos al servidos
Acceder/guardar los datos que necesito
Por cada paleta de mi lista,
    Pintar la paleta de colores en mi html con esa información
        Por cada color (cada elemento de la lista)
            Pintar un div
*/

const list = document.querySelector(".js-list");
let paletteList = [];
let favoritePalleteList = [];
const favoriteList = document.querySelector(".js-list-favorites");


function renderPalettes(palettes) {
    for (const palette of palettes) {
        let content = `
            <div class="palette_list js-palette" id=${palette.id}>
                <h5>${palette.name}</h5>
            
        `
        for (const color of palette.colors) {
            content += `<div class="paletteColors" style="background-color: #${color}"></div>`

        }
        content += `</div>`;
        list.innerHTML += content;
        //4 añadimos la constante para recoger cada una de las paletas (para los favoritos)
        const allPalettesDOM = document.querySelectorAll(".js-palette");
        //al usar querySelectorAll habrá que hacer un bucle para poder escuchar cada elemento del array
        for (const paletteDOM of allPalettesDOM) {
            paletteDOM.addEventListener("click", handleAddFavorites);
        }
    }
}
//4+
function handleAddFavorites(event) {
    const idPaletteClicked = event.currentTarget.id;
    //buscar la paleta clicada a partir de ese id
    const paletteSelected = paletteList.find((palette) => {
        return palette.id === idPaletteClicked;
    })
    //añadir esa paleta a la lista de paletas favoritas
    favoritePalleteList.push(paletteSelected);

    //Pintar las paletas favoritas
    favoriteList.innerHTML = "";
    for (const palette of favoritePalleteList) {
        let content = `
            <div class="palette_list js-palette" id=${palette.id}>
                <h5>${palette.name}</h5>

        `
        for (const color of palette.colors) {
            content += `<div class="paletteColors" style="background-color: #${color}"></div>`

        }
        content += `</div>`;
        favoriteList.innerHTML += content;
    }
}

// 3 filtrar paletas, buscador
const inputSearch = document.querySelector(".js-input");

function handleSearch() {
    const inputText = inputSearch.value; //lo que escribe la usuaria
    //filtrar la lista de paletas por el nombre escrito por la usuaria
    //aplicar el metodo funcional filter en mi array de paletas

    const filteredPallets = paletteList.filter((palette) => {
        //condición:lo que escribe la usuaria esté incluido en el nombre
        return palette.name.toLowerCase().includes(inputText.toLowerCase());
    })
    list.innerHTML = ""; //borro el contenido del html antes de volver a pintar, para no duplicar
    renderPalettes(filteredPallets);
}


inputSearch.addEventListener("input", handleSearch);

//2
const paletteLocalStorage = JSON.parse(localStorage.getItem("palettesInfo"));


if (paletteLocalStorage !== null) {
    renderPalettes(paletteLocalStorage);
    paletteList = paletteLocalStorage;
} else {
    //1
    fetch("https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json")
        .then(response => response.json())
        .then(data => {
            paletteList = data.palettes; //actualizo el valor de la variable global
            //guardar en el localStorage
            localStorage.setItem("palettesInfo", JSON.stringify(palettes));
            //pintar paletas
            renderPalettes(palettes);

        })
};




/* 2 Cachear la respuesta del servidor en localStorage
    -cuando el servidor me consteste con la info de las paletas,
        -guardar todas las paletas en el localStorage
    
    -Obtener las paletas del local storage
    -si están las paletas en el local Storage
        -pintarlas en el html con la info del localStorage
        -si no están las paletas en el localStorage,
            -Pido los datos al servidor (fetch)
                -Pinto la paleta de colores en mi html con esta info
*/

/* 3 Filtrar las paletas, buscador
    -crear un input en el html
    -cuando la usuaria escriba en el input
        -recojo lo que ha escrito
        -filtrar la lista de paletas por el nombre con lo que se ha escrito
        -pintar las paletas (actualizadas/filtradas)
*/

/* 4 Marcar paletas como favoritas
    -cuando la usuaria haga click en una paleta,
        -tengo que saber qué paleta ha clicado
        -voy a añadir esa paleta a la lista de favoritos
        -pinto las paletas favoritas 
*/