const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let allCharacters = [];
let showingFavorites = false;

const cardsContainer = document.getElementById('cardsContainer');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const searchBtn = document.getElementById('searchBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const totalCharactersEl = document.getElementById('totalCharacters');
const totalAliveEl = document.getElementById('totalAlive');
const totalDeadEl = document.getElementById('totalDead');
const totalFavoritesEl = document.getElementById('totalFavorites');

function getFavorites() {
    const favorites = localStorage.getItem('rickAndMortyFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('rickAndMortyFavorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function isFavorite(characterId) {
    const favorites = getFavorites();
    return favorites.includes(characterId);
}

function addFavorite(characterId) {
    const favorites = getFavorites();
    if (!favorites.includes(characterId)) {
        favorites.push(characterId);
        saveFavorites(favorites);
    }
}

function removeFavorite(characterId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== characterId);
    saveFavorites(favorites);
}

function updateFavoritesCount() {
    const favorites = getFavorites();
    totalFavoritesEl.textContent = favorites.length;
}

async function fetchCharacters(page = 1, name = '', status = '') {
    try {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        cardsContainer.innerHTML = '';

        let url = `${API_URL}?page=${page}`;
        if (name) url += `&name=${name}`;
        if (status) url += `&status=${status}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Nenhum personagem encontrado');
        }

        const data = await response.json();

        allCharacters = data.results;

        updateStats(data.results);

        createCards(data.results);

        updatePagination(data.info);

        loadingElement.style.display = 'none';

    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = error.message || 'Erro ao carregar personagens. Tente novamente!';
    }
}

function createCards(characters) {
    cardsContainer.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';

        const statusClass = character.status.toLowerCase() === 'alive' 
            ? 'status-alive' 
            : character.status.toLowerCase() === 'dead' 
            ? 'status-dead' 
            : 'status-unknown';

        const isFav = isFavorite(character.id);
        const favoriteClass = isFav ? 'active' : '';
        const favoriteIcon = isFav ? '♥' : '♡';

        card.innerHTML = `
            <div class="card-header">
                <img src="${character.image}" alt="${character.name}" class="card-image">
                <button class="favorite-btn ${favoriteClass}" onclick="toggleFavorite(${character.id})">
                    ${favoriteIcon}
                </button>
            </div>
            <div class="card-body">
                <h2 class="card-title">${character.name}</h2>
                <div class="card-info">
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="status-badge ${statusClass}">${character.status}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Espécie:</span>
                        <span>${character.species}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Gênero:</span>
                        <span>${character.gender}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Origem:</span>
                        <span>${character.origin.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Localização:</span>
                        <span>${character.location.name}</span>
                    </div>
                </div>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

function updateStats(characters) {
    const alive = characters.filter(char => char.status === 'Alive').length;
    const dead = characters.filter(char => char.status === 'Dead').length;

    totalCharactersEl.textContent = characters.length;
    totalAliveEl.textContent = alive;
    totalDeadEl.textContent = dead;
}

function updatePagination(info) {
    if (!info.prev) {
        currentPage = 1;
    } else {
        const urlParams = new URLSearchParams(info.prev.split('?')[1]);
        currentPage = parseInt(urlParams.get('page')) + 1;
    }
    
    pageInfo.textContent = `Página ${currentPage} de ${info.pages}`;

    prevBtn.disabled = !info.prev;
    nextBtn.disabled = !info.next;
}

function toggleFavorite(characterId) {
    const btn = event.target;
    
    if (isFavorite(characterId)) {
        removeFavorite(characterId);
        btn.classList.remove('active');
        btn.textContent = '♡';
        console.log(`Personagem ${characterId} removido dos favoritos`);
        
        if (showingFavorites) {
            showFavorites();
        }
    } else {
        addFavorite(characterId);
        btn.classList.add('active');
        btn.textContent = '♥';
        console.log(`Personagem ${characterId} adicionado aos favoritos`);
    }
}

async function showFavorites() {
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Você ainda não tem favoritos! ⭐';
        cardsContainer.innerHTML = '';
        updateStats([]);
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        pageInfo.textContent = 'Favoritos';
        return;
    }

    try {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        cardsContainer.innerHTML = '';

        const url = `${API_URL}/${favorites.join(',')}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao carregar favoritos');
        }

        const data = await response.json();
        
        allCharacters = Array.isArray(data) ? data : [data];

        updateStats(allCharacters);
        createCards(allCharacters);

        loadingElement.style.display = 'none';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        pageInfo.textContent = `${allCharacters.length} Favorito(s)`;

    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Erro ao carregar favoritos. Tente novamente!';
    }
}

searchBtn.addEventListener('click', () => {
    showingFavorites = false;
    favoritesBtn.classList.remove('active');
    currentPage = 1;
    const searchTerm = searchInput.value.trim();
    const status = statusFilter.value;
    fetchCharacters(currentPage, searchTerm, status);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

favoritesBtn.addEventListener('click', () => {
    if (showingFavorites) {
        showingFavorites = false;
        favoritesBtn.classList.remove('active');
        searchInput.value = '';
        statusFilter.value = '';
        currentPage = 1;
        fetchCharacters(currentPage);
    } else {
        showingFavorites = true;
        favoritesBtn.classList.add('active');
        showFavorites();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        const searchTerm = searchInput.value.trim();
        const status = statusFilter.value;
        fetchCharacters(currentPage - 1, searchTerm, status);
    }
});

nextBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const status = statusFilter.value;
    fetchCharacters(currentPage + 1, searchTerm, status);
});

document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    fetchCharacters(currentPage);
});

function exportCharactersData() {
    return allCharacters;
}

window.exportCharactersData = exportCharactersData;
