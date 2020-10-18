
let films; // ¿Const? 

function getFilmsFromApi() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://swapi.dev/api/films/');
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                document

                document.getElementById("principal-header").classList.add("hidden-animation");
                document.getElementById("principal-header").classList.remove("hidden");

                document.getElementById("init").style.display = "none"

                document.getElementById("general-container").classList.add("hidden-animation");
                document.getElementById("general-container").classList.remove("hidden");

                resolve(JSON.parse(xhr.response));
            } else {
                reject(`Error: ${xhr.status}
                        message: ${xhr.statusText}`);
            }
        };
    });
}

function getCharacterFromApi(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();

        xhr.onload= () => {
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(`Error: ${xhr.status}
                        message: ${xhr.statusText}`);
            }
        }
    });
}

async function setFilmsInView() {
    const jsonFilms = await getFilmsFromApi();
    films = jsonFilms.results;

    for (let i = 0 ; i < films.length ; i++) {
        document.getElementById("films-list").innerHTML += `
            <li class="clickable" onclick="setFilmInfoInView(${i})"><i class="fab fa-galactic-senate"></i> ${films[i].title}</li>
            `;
    }
}

function setFilmInfoInView(index) {
   document.getElementById("title").innerText = films[index].title;
   document.getElementById("episode").innerText = films[index].episode_id;
   document.getElementById("director").innerText = films[index].director;
   document.getElementById("release-date").innerText = films[index].release_date;
   document.getElementById("film-description-container").classList.remove("film-description-container");
   setFilmCharactersInView(films[index].characters);
   document.getElementById("main-container").classList.add("hidden-animation");
   document.getElementById("main-container").classList.remove("hidden");
}

async function setFilmCharactersInView(charactersUrl) {
    let character;
    document.getElementById("characters-list").innerHTML ="";
    for(let characterUrl of charactersUrl) {
        try{
            character = await getCharacterFromApi(characterUrl);
            document.getElementById("characters-list").innerHTML += `
            <li onclick="setCharacterInfoInView('${character.url}')" class="clickable"><i class="fab fa-galactic-senate"></i> ${character.name}</li>
            `;
        } catch(error) {
            console.error(error);
        }
    }
}

async function setCharacterInfoInView(url) {
    const character = await getCharacterFromApi(url);
    
    document.getElementById("character-name").innerText = character.name;
    document.getElementById("character-height").innerText = character.height;
    document.getElementById("character-mass").innerText = character.mass;
    document.getElementById("character-hair").innerText = character.hair_color;
    document.getElementById("character-skin").innerText = character.skin_color;
    document.getElementById("character-eyes").innerText = character.eye_color;
    document.getElementById("character-birth-year").innerText = character.birth_year;
    document.getElementById("character-gender").innerText = character.gender;

    document.getElementById("character-info-container").classList.add("hidden-animation");
    document.getElementById("character-info-container").classList.remove("hidden");
}
document.getElementById("init").classList.add("init-animation");
setFilmsInView();

