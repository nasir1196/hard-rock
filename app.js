const searchSongs = async () => {
    const getInput = document.getElementById('input-song').value;
    getInput.innerText = '';
    const lyricContainer = document.getElementById('lyric-container');
    lyricContainer.innerHTML = '';
    const getError = document.getElementById('error-massage');
    getError.innerText = '';
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    document.getElementById('input-song').value = '';
    loadingSpinner();
    const url = `https://api.lyrics.ovh/suggest/${getInput}`;
    try {
        const promise = await fetch(url);
        const data = await promise.json();
        displaySongs(data.data);
    }

    catch (error) {
        displayErrorMassage("Something went wrong load this song!! please try again later");
        loadingSpinner();
    }

}


const displaySongs = (songs) => {
    console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getSongLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        loadingSpinner();
    });
}


const getSongLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const promise = await fetch(url);
        const data = await promise.json();
        displayLyric(data.lyrics);
    }
    catch (error) {
        displayErrorMassage("Something went wrong load lyrics!! please try again later");
        loadingSpinner();
    }


}


const displayLyric = (lyric) => {
    const lyricContainer = document.getElementById('lyric-container');
    lyricContainer.innerHTML = '';
    lyricContainer.innerText = lyric;
}

const displayErrorMassage = (error) => {
    const getError = document.getElementById('error-massage');
    getError.innerText = error;
}

const loadingSpinner = () => {
    const spinner = document.getElementById('load-spinner');
    spinner.classList.toggle('d-none');
}