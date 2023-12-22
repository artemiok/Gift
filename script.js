$(document).ready(function () {
    // Load love letter content
    var loveLetterContent = `
        <p>Dear Vruti,</p>
        <p>I wanted to take a moment to express my love for you. You are the apple to my pie and you know how much I love apple pie hehe. 
        I truly think you are the most beautiful creation on this green Earth. I never loved any human this much before; you truly are
        so special to me, honey. This is my little gift to you, it is not much but I made it with love!</p>
        <!-- Add more content as needed -->
    `;
    $('#letter-content').html(loveLetterContent);

    // Submit form and add response with timestamp
    $('#messageForm').submit(function (event) {
        event.preventDefault();
        var message = $('#message').val();
        if (message) {
            var timestamp = new Date().toLocaleString();
            var responseHtml = `
                <div class="user-response">
                    <p>${message}</p>
                    <p class="timestamp">${timestamp}</p>
                </div>
            `;
            $('#user-responses').prepend(responseHtml);
            $('#message').val('');

            // Update Love Meter
            loveCount++;
            $('#love-count').text(loveCount);

            // Update Love Meter with animation
            updateLoveMeter();

            // Update Love Level Label
            updateLoveLevelLabel();

            // Play sound effect
            playSound('https://www.soundjay.com/button/sounds/button-3.mp3');
        }
    });

    function playSound(soundUrl) {
        var audio = new Audio(soundUrl);
        audio.play();
    }

    // Emoji reaction function
    window.react = function (emoji) {
        var timestamp = new Date().toLocaleString();
        var reactionHtml = `
            <div class="user-reaction">
                <p>Reaction: ${emoji}</p>
                <p class="timestamp">${timestamp}</p>
            </div>
        `;
        $('#user-reaction').append(reactionHtml);
    };

    // Update Love Meter when slider is changed
    $('#love-slider').on('input', function () {
        loveCount = $(this).val();
        $('#love-count').text(loveCount);

        // Update Love Meter with animation
        updateLoveMeter();

        // Update Love Level Label
        updateLoveLevelLabel();
    });

    // Click event for love levels
    $('#love-levels p').on('click', function () {
        var loveLevelIndex = $('#love-levels p').index(this);
        var lovePercentage = (loveLevelIndex + 1) * 20; // Each level is 20%

        // Update Love Meter
        loveCount = lovePercentage;
        $('#love-count').text(loveCount);

        // Update Love Meter with animation
        updateLoveMeter();

        // Update Love Level Label
        updateLoveLevelLabel();
    });
});

// Update Love Meter with animation
function updateLoveMeter() {
    var lovePercentage = (loveCount / 100) * 100;
    $('#love-bar').css('width', lovePercentage + '%');
}

// Function to update love level label based on slider value
function updateLoveLevelLabel() {
    var loveLevelLabel = 'No Love';
    if (loveCount >= 20 && loveCount < 40) {
        loveLevelLabel = 'A Little Love';
    } else if (loveCount >= 40 && loveCount < 60) {
        loveLevelLabel = 'Moderate Love';
    } else if (loveCount >= 60 && loveCount < 80) {
        loveLevelLabel = 'Strong Love';
    } else if (loveCount >= 80) {
        loveLevelLabel = 'In Love';
    }
    $('#love-level').text(loveLevelLabel);
}

// Play/pause background music
var backgroundMusic = document.getElementById('background-music');
var musicPlayer = $('#music-player');

musicPlayer.on('click', function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicPlayer.find('i').removeClass('fa-music').addClass('fa-pause');
    } else {
        backgroundMusic.pause();
        musicPlayer.find('i').removeClass('fa-pause').addClass('fa-music');
    }
});

// Function to create animated hearts
function createHeart() {
    var heart = $('<div class="heart"></div>');
    var posX = Math.random() * window.innerWidth;
    var posY = Math.random() * window.innerHeight;
    heart.css({ top: posY, left: posX });
    $('body').append(heart);

    setTimeout(function () {
        heart.remove();
    }, 2000); // Remove after 2 seconds
}

// Trigger heart animation on button click or any event you like
$('#letter-content').on('click', function () {
    createHeart();
});