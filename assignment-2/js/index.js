/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/



let albumStore = [];

async function loadAlbumData() {
    const response = await fetch('public/data/albums.json');
    const data = await response.json();
    albumStore = [...data];
    console.log(albumStore);
    render(data, albumStore);

}

function getAlbumsByArtistName(data, query) {
    // query is the artist's name you are searching for
    const results = data.filter(album => album.artistName.toLowerCase().includes(query.toLowerCase()));
    return results;
}

function getAlbumsByMinimumRating(data, minRating) {
    // minRating is the minimum average rating you are searching for
    const results = data.filter(album => album.averageRating >= minRating);
    return results;
}

// Add a submit event to the form
document.getElementById('album-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const searchText = document.getElementById('search-input').value; // Get the search query
    const minRating = parseFloat(document.getElementById('min-album-rating-input').value); // Get the minimum rating

    // Filter the albumStore using the provided search functions
    let filteredAlbums = getAlbumsByArtistName(albumStore, searchText);
    filteredAlbums = getAlbumsByMinimumRating(filteredAlbums, minRating);

    render(filteredAlbums); // Call the render function with the filtered results
});

function render(albums) {
    const albumRows = document.getElementById('album-rows');
    albumRows.innerHTML = ''; // Clear existing table rows before rendering

    albums.forEach(album => {
        albumRows.innerHTML += `
            <tr>
                <td>${album.album}</td>
                <td>${album.releaseDate}</td>
                <td>${album.artistName}</td>
                <td>${album.genres}</td>
                <td>${album.averageRating}</td>
                <td>${album.numberReviews}</td>
            </tr>
        `;
    });
}

loadAlbumData(); // Call the function to load and display the albums






