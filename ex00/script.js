
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
document.getElementById('home-li').addEventListener('click', function() {
    var section = document.getElementById('home');
    if (section.classList.contains('hide'))
    {
        section.classList.remove('hide');
        document.getElementById('favorites').classList.add('hide');
        document.getElementById('playlists').classList.add('hide');
    }   
});

document.getElementById('favs-li').addEventListener('click', function() {
    var section = document.getElementById('favorites');
    if (section.classList.contains('hide'))
    {
        section.classList.remove('hide');
        document.getElementById('home').classList.add('hide');
        document.getElementById('playlists').classList.add('hide');
    }
});


document.getElementById('play-li').addEventListener('click', function() {
    var section = document.getElementById('playlists');
    if (section.classList.contains('hide'))
    {
        section.classList.remove('hide');
        document.getElementById('home').classList.add('hide');
        document.getElementById('favorites').classList.add('hide');
    }
});