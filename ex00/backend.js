
async function getNewReleases(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    return data.albums.items;
}

async function getCategoryList(accessToken) {
	const response = await fetch('https://api.spotify.com/v1/browse/categories', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	});

	const data = await response.json();
	return data.categories.items;
}

async function showNewReleases() {
	const clientId = '07a8dde75a414473a6e9243392a7846c';
	const clientSecret = 'b4d0b6243d504bab9edfddc7bed0ebdf';
    const accessToken = await getAccessToken(clientId, clientSecret);
    const newReleases = await getNewReleases(accessToken);

    const newReleasesContainer = document.getElementById('new-releases');
    newReleasesContainer.innerHTML = newReleases.map(album => `
        <div>
            <img src="${album.images[0].url}" alt="${album.name}">
            <p>${album.name}</p>
        </div>
    `).join('');
}

async function showCategories() {
	const clientId = '07a8dde75a414473a6e9243392a7846c';
	const clientSecret = 'b4d0b6243d504bab9edfddc7bed0ebdf';
    const accessToken = await getAccessToken(clientId, clientSecret);
	const categories = await getCategoryList(accessToken);

	const categoriesContainer = document.getElementById('cat-list');
	categoriesContainer.innerHTML = categories.map(category => `
		<div>
			<img src="${category.icons[0].url}" alt="${category.name}">
			<p>${category.name}</p>
		</div>
	`).join('');
}