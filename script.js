var prev = document.getElementById('prev');
var next = document.getElementById('next');
var current = "characters";
getCharacters("https://rickandmortyapi.com/api/character/");

// Фильтр персонажей
var nameFilter = document.getElementById('characterName');
var statusFilter = document.getElementById('status');
var speciesFilter = document.getElementById('species');
var genderFilter = document.getElementById('gender');
var filterCharacters = document.getElementById('filterCharacters');
clearCharacterFilters();

function clearCharacterFilters() {
  nameFilter.value = "";
  statusFilter.value = "";
  speciesFilter.value = "";
  genderFilter.value = "";
}
function pageClickHandlerCharacter() {
  clearTabContent();
  setPagerActive(next, true);
  if (nameFilter.value !== "" || statusFilter.value !== "" || speciesFilter.value !== "" || genderFilter.value !== "") {
    getCharacters("https://rickandmortyapi.com/api/character/" + "?name=" + nameFilter.value + "&status=" + statusFilter.value + "&species=" + speciesFilter.value + "&gender=" + genderFilter.value);
  } else {
    getCharacters("https://rickandmortyapi.com/api/character/");
  }
}

function addEnterHandler(field, handler) {
  field.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      handler();
    }
  });
}
addEnterHandler(nameFilter, pageClickHandlerCharacter);
addEnterHandler(statusFilter, pageClickHandlerCharacter);
addEnterHandler(speciesFilter, pageClickHandlerCharacter);
addEnterHandler(genderFilter, pageClickHandlerCharacter);

filterCharacters.onclick = pageClickHandlerCharacter;

// Фильтр локаций
var locationFilter = document.getElementById('locationName');
var typeFilter = document.getElementById('type');
var dimensionFilter = document.getElementById('dimension');
var filterLocations = document.getElementById('filterLocations');
clearLocationFilters();

function clearLocationFilters() {
  locationFilter.value = "";
  typeFilter.value = "";
  dimensionFilter.value = "";
}
function pageClickHandlerLocation() {
  clearTabContent();
  setPagerActive(next, true);
  if (locationFilter.value !== "" || typeFilter.value !== "" || dimensionFilter.value !== "") {
    getLocations("https://rickandmortyapi.com/api/location/" + "?name=" + locationFilter.value + "&type=" + typeFilter.value + "&dimension=" + dimensionFilter.value);
  } else {
    getLocations("https://rickandmortyapi.com/api/location/");
  }
}

addEnterHandler(locationFilter, pageClickHandlerLocation);
addEnterHandler(typeFilter, pageClickHandlerLocation);
addEnterHandler(dimensionFilter, pageClickHandlerLocation);

filterLocations.onclick = pageClickHandlerLocation;

// Фильтр эпизодов
var episodeNameFilter = document.getElementById('episodeName');
var episodeFilter = document.getElementById('episode');
var filterEpisodes = document.getElementById('filterEpisodes');
clearEpisodeFilters();

function clearEpisodeFilters() {
  episodeNameFilter.value = "";
  episodeFilter.value = "";
}

function pageClickHandlerEpisode() {
  clearTabContent();
  setPagerActive(next, true);
  if (episodeNameFilter.value !== "" || episodeFilter.value !== "") {
    getEpisodes("https://rickandmortyapi.com/api/episode/" + "?name=" + episodeNameFilter.value + "&episode=" + episodeFilter.value);
  } else {
    getEpisodes("https://rickandmortyapi.com/api/episode/");
  }
}

addEnterHandler(episodeNameFilter, pageClickHandlerEpisode);
addEnterHandler(episodeFilter, pageClickHandlerEpisode);

filterEpisodes.onclick = pageClickHandlerEpisode;

// Переключение между разделами
var characters = document.getElementById('characters');
characters.onclick = function () {
  clearCharacterFilters();
  clearTabContent();
  hideFilters();
  document.getElementById('characterFilters').style.display = "inline-block";
  setPagerActive(next, true);
  getCharacters("https://rickandmortyapi.com/api/character/");
  current = "characters";
};

var locations = document.getElementById('locations');
locations.onclick = function () {
  clearLocationFilters();
  clearTabContent();
  hideFilters();
  document.getElementById('locationFilters').style.display = "inline-block";
  setPagerActive(next, true);
  getLocations('https://rickandmortyapi.com/api/location/');
  current = "locations";
};

var episodes = document.getElementById('episodes');
episodes.onclick = function () {
  clearEpisodeFilters();
  clearTabContent();
  hideFilters();
  document.getElementById('episodeFilters').style.display = "inline-block";
  setPagerActive(next, true);
  getEpisodes('https://rickandmortyapi.com/api/episode/');
  current = "episodes";
};
characters.onmousedown = locations.onmousedown = episodes.onmousedown = function () {
  return false;
};

// Переключение между страницами
function getLink(direction) {
  if (current === "characters") getCharacters(direction.dataset.link);
  if (current === "locations") getLocations(direction.dataset.link);
  if (current === "episodes") getEpisodes(direction.dataset.link);
}

prev.onclick = function () {
  if (prev.dataset.link !== "") {
    setPagerActive(next, true);
    clearTabContent();
    getLink(prev);
  }
};
next.onclick = function () {
  if (next.dataset.link !== "") {
    setPagerActive(prev, true);
    clearTabContent();
    getLink(next);
  }
};
prev.onmousedown = next.onmousedown = function () {
  return false;
};

// Функции
function setPagerActive(direction, boolean) {
  if (boolean) {
    direction.classList.remove('unactive');
  } else {
    direction.classList.add('unactive');
  }
}

function clearTabContent() {
  var tabcontent = document.getElementsByClassName('tabcontent');
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
}

function hideFilters() {
  var filters = document.getElementsByClassName('filters');
  for (var i = 0; i < filters.length; i++) {
    filters[i].style.display = "none";
  }
}

function getCharacters(link) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
  } else {
    var characters = JSON.parse(xhr.responseText);
    for (var i = 0; i < characters.results.length; i++) {
      createCharacterCard(characters.results[i]);
    }
    prev.dataset.link = characters.info.prev;
    next.dataset.link = characters.info.next;
    if (prev.dataset.link === "") {
      setPagerActive(prev, false);
    }
    if (next.dataset.link === "") {
      setPagerActive(next, false);
    }
  }

  function createCharacterCard(character) {
    var container = createContainer();
    var characterDiv = document.createElement('div');
    characterDiv.className = "character-card";
    container.appendChild(characterDiv);
    var photo = document.createElement('img');
    photo.src = character.image;
    characterDiv.appendChild(photo);
    var title = document.createElement('div');
    title.className = 'title';
    characterDiv.appendChild(title);
    var name = document.createElement('div');
    title.appendChild(name);
    name.innerHTML = character.name;
    name.style.fontSize = "26px";
    var id = document.createElement('div');
    title.appendChild(id);
    id.innerHTML = "id: " + character.id;

    var info = document.createElement('div');
    characterDiv.appendChild(info);
    info.className = "info";

    info.appendChild(createRow("status", character.status));
    info.appendChild(createRow("species", character.species));
    info.appendChild(createRow("gender", character.gender));
    info.appendChild(createRow("origin", character.origin.name));
    info.appendChild(createRow("last location", character.location.name));
  }

}

function createContainer() {
  var container = document.createElement('div');
  container.className = "container";
  container.classList.add('tabcontent');
  document.body.appendChild(container);
  return container;
}

function createRow(key, value) {
  var row = document.createElement('div');
  row.className = "row";

  var keyDiv = document.createElement('div');
  keyDiv.className = "key";
  row.appendChild(keyDiv);
  keyDiv.innerHTML = key;

  var valueDiv = document.createElement('div');
  valueDiv.className = "value";
  row.appendChild(valueDiv);
  valueDiv.innerHTML = value;
  return row;
}

function getLocations(link) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(xhr.status + ' : ' + xhr.statusText)
  } else {
    var locations = JSON.parse(xhr.responseText);
    for (var i = 0; i < locations.results.length; i++) {
      createLocationCard(locations.results[i]);
    }
    prev.dataset.link = locations.info.prev;
    next.dataset.link = locations.info.next;
    if (prev.dataset.link === "") {
      setPagerActive(prev, false);
    }
    if (next.dataset.link === "") {
      setPagerActive(next, false);
    }
  }
  function createLocationCard(location) {
    var container = createContainer();
    var locationDiv = document.createElement('div');
    locationDiv.className = "location-card";
    container.appendChild(locationDiv);
    locationDiv.appendChild(createRow("id", location.id));
    locationDiv.appendChild(createRow("name", location.name));
    locationDiv.appendChild(createRow("type", location.type));
    locationDiv.appendChild(createRow("dimension", location.dimension));
  }
}

function getEpisodes(link) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(xhr.status + ' : ' + xhr.statusText)
  } else {
    var episodes = JSON.parse(xhr.responseText);
    for (var i = 0; i < episodes.results.length; i++) {
      createEpisodeCard(episodes.results[i]);
    }
    prev.dataset.link = episodes.info.prev;
    next.dataset.link = episodes.info.next;
    if (prev.dataset.link === "") {
      setPagerActive(prev, false);
    }
    if (next.dataset.link === "") {
      setPagerActive(next, false);
    }
  }
  function createEpisodeCard(episode) {
    var container = createContainer();
    var episodeDiv = document.createElement('div');
    episodeDiv.className = "episode-card";
    container.appendChild(episodeDiv);
    episodeDiv.appendChild(createRow("id", episode.id));
    episodeDiv.appendChild(createRow("name", episode.name));
    episodeDiv.appendChild(createRow("air date", episode.air_date));
    episodeDiv.appendChild(createRow("episode", episode.episode));
  }
}


