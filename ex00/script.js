const spotifyToken = localStorage.getItem('spotifyAccessToken');

// Make the burger button work
document.getElementById('burger-button').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('visible');
});

// Make the title clickable ~~ gloBify ~~
document.getElementById('title').addEventListener('click', function() {
    var titleElement = document.getElementById('title');
    var text = titleElement.innerHTML;
    var num = (text.match(/B/g) || []).length;
    var newText = 'GLO' + 'B'.repeat(num + 1) + 'IFY';
    
    if (num < 3)
        titleElement.innerHTML = newText;
});

// Set onclick event for logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const audio = new Audio('piksha.mp3');
    
    function playAudio() {
        audio.play();
    }

    logo.removeEventListener('click', playAudio);
    logo.addEventListener('click', playAudio);
});


// Fetching data that will be included
async function fetchGenres() {
    let response;
    try {
        response = await fetch('https://api.spotify.com/v1/browse/categories', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }
    } catch (error) {
        localStorage.removeItem('spotifyAccessToken');
        window.location.href = 'login.html';
        return;
    }
    const data = await response.json();
    return data.categories.items;
}

async function fetchFavorites() {
    let response;
    try {
        response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch favorites');
        }
    } catch (error) {
        localStorage.removeItem('spotifyAccessToken');
        window.location.href = 'login.html';
        return;
    }
    const data = await response.json();
    return data.items;
}

async function fetchPlaylists() {
    let response;
    try {
        response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }
    } catch (error) {
        localStorage.removeItem('spotifyAccessToken');
        window.location.href = 'login.html';
        return;
    }
    const data = await response.json();
    return data.items;
}

// Music player
let currentAudio = null; // Reference to the currently playing audio
let currentButton = null; // Reference to the currently active button

function togglePlayPause(button) {
    const musicUrl = button.getAttribute('songUrl');
    if (!musicUrl) return;

    // If there's an audio currently playing and it's not the same as the new one, pause it
    if (currentAudio && currentAudio.src !== musicUrl) {
        currentAudio.pause();
        if (currentButton) {
            currentButton.textContent = '▶️';
        }
    }

    // If the same button is clicked, toggle play/pause
    if (currentAudio && currentAudio.src === musicUrl) {
        if (currentAudio.paused) {
            currentAudio.play();
            button.textContent = '⏸️';
        } else {
            currentAudio.pause();
            button.textContent = '▶️';
        }
    } else {
        // Create a new audio object and play it
        currentAudio = new Audio(musicUrl);
        currentAudio.play();
        button.textContent = '⏸️';
    }

    // Update the current button reference
    currentButton = button;
}

// Functions to create VIEWsSss
function createHomeView() {
    return `
        <div id="home">
            <div id="search-bar">
                <input type="text" id="search" placeholder="Search for songs">
                <button id="search-button" onclick="showSection('search-result')"><img src="loupe.svg"></button>
            </div>
            <h1 class="white">Home</h1>
            <div id="list"></div>
        </div>
    `;
}

function createFavoritesView() {
    return `
        <div id="favorites">
            <div id="search-bar">
                <input type="text" id="search" placeholder="Search for songs">
                <button id="search-button" onclick="showSection('search-result')"><img src="loupe.svg"></button>
            </div>
            <h1 class="white">Favorite songs</h1>
            <div id="list"></div>
        </div>
    `;
}

function createPlaylistsView() {
    return `
        <div id="playlists">
            <div id="search-bar">
                <input type="text" id="search" placeholder="Search for songs">
                <button id="search-button" onclick="showSection('search-result')"><img src="loupe.svg"></button>
            </div>
            <h1 class="white">Playlists</h1>
            <div id="list"></div>
        </div>
    `;
}

function createProfileView() {
    return `
        <div id="profile">
            <h1 class="white">Profile</h1>
        </div>
    `;
}

function createSearchResultView() {
    return `
        <div id="search-result">
            <h1 class="white">Results:</h1>
            <div id="result-list"></div>
        </div>
    `;
}

// Function to show a section
async function showSection(section) {

    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        if (currentButton) {
            currentButton.textContent = '▶️';
        }
    }

    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = ''; // Clear current content

    switch(section) {
        case 'home':
            wrapper.innerHTML = createHomeView();
            const genres = await fetchGenres();
            const listDiv = document.getElementById('list');
            genres.forEach(genre => {
                const genreDiv = document.createElement('div');
                const genreImg = document.createElement('img');
                const genreName = document.createElement('p');

                genreDiv.classList.add('square');

                genreImg.src = genre.icons[0].url;
                genreImg.alt = genre.name;
                genreName.textContent = genre.name;

                genreDiv.appendChild(genreImg);
                genreDiv.appendChild(genreName);
                listDiv.appendChild(genreDiv);
            });
            break;
        case 'favorites':
            wrapper.innerHTML = createFavoritesView();
            const favorites = await fetchFavorites();
            const favoritesListDiv = document.getElementById('list');
            favorites.forEach(favorite => {
                const favoriteDiv = document.createElement('div');
                const favoriteImg = document.createElement('img');
                const favoriteName = document.createElement('p');
                const favoriteBtn = document.createElement('div');

                favoriteDiv.classList.add('square');
                favoriteBtn.classList.add('play-pause-button');

                favoriteImg.src = favorite.album.images[0].url;
                favoriteImg.alt = favorite.name;
                favoriteName.textContent = favorite.name;

                let songUrl = favorite.preview_url;

                if (songUrl) {
                    favoriteBtn.textContent = '▶️';
                    favoriteBtn.setAttribute('songUrl', songUrl);
                    favoriteBtn.onclick = function() {
                        togglePlayPause(favoriteBtn);
                    };
                } else {
                    favoriteBtn.textContent = '🚫';
                    favoriteBtn.style.cursor = 'not-allowed';
                }

                favoriteDiv.appendChild(favoriteImg);
                favoriteDiv.appendChild(favoriteName);
                favoriteDiv.appendChild(favoriteBtn);
                favoritesListDiv.appendChild(favoriteDiv);
            });
            break;
        case 'playlists':
            wrapper.innerHTML = createPlaylistsView();
            const playlists = await fetchPlaylists();
            const playlistsListDiv = document.getElementById('list');
            playlists.forEach(playlist => {
                const playlistDiv = document.createElement('div');
                const playlistImg = document.createElement('img');
                const playlistName = document.createElement('p');

                playlistDiv.classList.add('square');

                playlistImg.src = playlist.images[0].url;
                playlistImg.alt = playlist.name;
                playlistName.textContent = playlist.name;

                playlistDiv.appendChild(playlistImg);
                playlistDiv.appendChild(playlistName);
                playlistsListDiv.appendChild(playlistDiv);
            });
            break;
        case 'profile':
            wrapper.innerHTML = createProfileView();
            break;
        case 'search-result':
            wrapper.innerHTML = createSearchResultView();
            break;
    }

    document.getElementById('menu').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', function() {
    if (!spotifyToken) {
        window.location.href = 'login.html';
    } else {
        showSection('home');
    }
});