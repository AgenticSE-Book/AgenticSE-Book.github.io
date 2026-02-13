document.addEventListener('DOMContentLoaded', () => {
    const listenBookBtn = document.getElementById('listen-book-btn');
    const playerContainer = document.getElementById('audio-player-container');

    // Listen Book Button Logic
    if (listenBookBtn) {
        listenBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to player
            if (playerContainer) {
                playerContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});
