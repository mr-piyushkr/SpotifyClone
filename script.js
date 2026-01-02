console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let currentTrackName = document.getElementById('currentTrackName');
let currentTrackArtist = document.getElementById('currentTrackArtist');
let currentTrackImage = document.getElementById('currentTrackImage');
let isPlaying = false;
let isShuffled = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let isLiked = false;
let playlistLiked = false;

// Song Database
let songs = [
    {songName: "Mortals", artist: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:50"},
    {songName: "Heroes Tonight", artist: "Janji", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "3:28"},
    {songName: "Force", artist: "Alan Walker", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "4:12"},
    {songName: "Elektronomia", artist: "Sky High", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "3:15"},
    {songName: "Invincible", artist: "DEAF KEV", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "4:02"}
];

// Initialize player with first song
function initializePlayer() {
    audioElement.src = songs[songIndex].filePath;
    updatePlayerDisplay();
}

// Update player display
function updatePlayerDisplay() {
    currentTrackName.textContent = songs[songIndex].songName;
    currentTrackArtist.textContent = songs[songIndex].artist;
    currentTrackImage.src = songs[songIndex].coverPath;
    
    // Update active track in list
    document.querySelectorAll('.track-item').forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('playing');
            item.querySelector('.track-number').innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            item.classList.remove('playing');
            item.querySelector('.track-number').textContent = index + 1;
        }
    });
}

// Play/Pause functionality
masterPlay.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function playMusic() {
    audioElement.play();
    isPlaying = true;
    masterPlay.innerHTML = '<i class="fas fa-pause"></i>';
    document.getElementById('playlistPlayBtn').innerHTML = '<i class="fas fa-pause"></i>';
    updatePlayerDisplay();
}

function pauseMusic() {
    audioElement.pause();
    isPlaying = false;
    masterPlay.innerHTML = '<i class="fas fa-play"></i>';
    document.getElementById('playlistPlayBtn').innerHTML = '<i class="fas fa-play"></i>';
}

// Playlist play button
document.getElementById('playlistPlayBtn').addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (isShuffled) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    audioElement.src = songs[songIndex].filePath;
    if (isPlaying) {
        playMusic();
    } else {
        updatePlayerDisplay();
    }
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (isShuffled) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
    }
    audioElement.src = songs[songIndex].filePath;
    if (isPlaying) {
        playMusic();
    } else {
        updatePlayerDisplay();
    }
});

// Shuffle button
document.getElementById('shuffleBtn').addEventListener('click', () => {
    isShuffled = !isShuffled;
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (isShuffled) {
        shuffleBtn.classList.add('active');
    } else {
        shuffleBtn.classList.remove('active');
    }
});

// Repeat button
document.getElementById('repeatBtn').addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    const repeatBtn = document.getElementById('repeatBtn');
    
    switch(repeatMode) {
        case 0:
            repeatBtn.classList.remove('active');
            repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
            break;
        case 1:
            repeatBtn.classList.add('active');
            repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
            break;
        case 2:
            repeatBtn.classList.add('active');
            repeatBtn.innerHTML = '<i class="fas fa-redo"></i><span style="font-size:8px;">1</span>';
            break;
    }
});

// Like buttons
document.getElementById('playerLikeBtn').addEventListener('click', () => {
    isLiked = !isLiked;
    const likeBtn = document.getElementById('playerLikeBtn');
    if (isLiked) {
        likeBtn.innerHTML = '<i class="fas fa-heart" style="color: #1db954;"></i>';
    } else {
        likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
});

document.getElementById('playlistLikeBtn').addEventListener('click', () => {
    playlistLiked = !playlistLiked;
    const playlistLikeBtn = document.getElementById('playlistLikeBtn');
    if (playlistLiked) {
        playlistLikeBtn.innerHTML = '<i class="fas fa-heart" style="color: #1db954;"></i>';
    } else {
        playlistLikeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
});

// Sidebar navigation
document.getElementById('homeBtn').addEventListener('click', () => {
    setActiveNavItem('homeBtn');
    console.log('Home clicked');
});

document.getElementById('searchBtn').addEventListener('click', () => {
    setActiveNavItem('searchBtn');
    console.log('Search clicked');
});

document.getElementById('libraryBtn').addEventListener('click', () => {
    setActiveNavItem('libraryBtn');
    console.log('Your Library clicked');
});

function setActiveNavItem(activeId) {
    document.querySelectorAll('.navigation li').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(activeId).classList.add('active');
}

// Library actions
document.getElementById('createPlaylistBtn').addEventListener('click', () => {
    alert('Create Playlist feature - Coming Soon!');
});

document.getElementById('likedSongsBtn').addEventListener('click', () => {
    alert('Liked Songs feature - Coming Soon!');
});

// Profile dropdown
document.getElementById('profileDropdown').addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.remove('show');
});

// Dropdown menu items
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`${item.textContent} feature - Coming Soon!`);
        document.getElementById('dropdownMenu').classList.remove('show');
    });
});

// Playlist menu
document.getElementById('playlistMenuBtn').addEventListener('click', () => {
    alert('Playlist options - Coming Soon!');
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
        
        // Update time display
        const currentMinutes = Math.floor(audioElement.currentTime / 60);
        const currentSeconds = Math.floor(audioElement.currentTime % 60);
        document.querySelector('.time-current').textContent = 
            `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        
        const totalMinutes = Math.floor(audioElement.duration / 60);
        const totalSeconds = Math.floor(audioElement.duration % 60);
        document.querySelector('.time-total').textContent = 
            `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    }
});

// Progress bar seek
myProgressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
});

// Track item click to play
document.querySelectorAll('.track-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        playMusic();
    });
    
    // Hover effect for play button
    item.addEventListener('mouseenter', () => {
        if (index !== songIndex || !isPlaying) {
            item.querySelector('.track-number').innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        if (index === songIndex && isPlaying) {
            item.querySelector('.track-number').innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            item.querySelector('.track-number').textContent = index + 1;
        }
    });
});

// Auto play next song when current ends
audioElement.addEventListener('ended', () => {
    if (repeatMode === 2) {
        // Repeat current song
        audioElement.currentTime = 0;
        playMusic();
    } else if (repeatMode === 1 || songIndex < songs.length - 1) {
        // Repeat all or continue to next
        if (isShuffled) {
            songIndex = Math.floor(Math.random() * songs.length);
        } else {
            songIndex = (songIndex + 1) % songs.length;
        }
        audioElement.src = songs[songIndex].filePath;
        playMusic();
    } else {
        // Stop at end
        pauseMusic();
    }
});

// Volume control
const volumeBar = document.querySelector('.volume-bar');
if (volumeBar) {
    volumeBar.addEventListener('input', () => {
        audioElement.volume = volumeBar.value / 100;
    });
}

// Initialize the player
initializePlayer();