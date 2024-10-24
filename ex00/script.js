
document.getElementById('burger-button').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('visible');
});

document.getElementById('title').addEventListener('click', function() {
    var text = document.getElementById('title').innerHTML;
    var num = text.match(/B/g).length;
    var first = 'GLO'
    var middle = 'B'
    var second = 'IFY'
    while (num > 0)
    {
        middle += 'B';
        num--;
    }
    text = first + middle + second;
    if (middle.length < 4)
        document.getElementById('title').innerHTML = text;
});


// Menu moves through different views
function showSection(sectionId) {
    var sections = ['home', 'favorites', 'playlists', 'profile', 'search-result'];
    sections.forEach(function(id) {
        var section = document.getElementById(id);
        if (id === sectionId) {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        }
    });
    document.getElementById('menu').classList.remove('visible');
}

// Set onclick event for logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const audio = new Audio('piksha.mp3');

    // Remove any existing event listeners to prevent stacking
    logo.removeEventListener('click', playAudio);

    // Define the function to play audio
    function playAudio() {
        audio.play();
    }

    // Add the event listener to the logo
    logo.addEventListener('click', playAudio);
});