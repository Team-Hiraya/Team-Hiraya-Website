// Mobile sidebar functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Music Player JavaScript
    document.addEventListener('DOMContentLoaded', function() {
      // Player elements
      const playPauseBtn = document.getElementById('playPauseBtn');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const progressBar = document.getElementById('progressBar');
      const progress = document.getElementById('progress');
      const currentTimeEl = document.getElementById('currentTime');
      const durationEl = document.getElementById('duration');
      const volumeBtn = document.getElementById('volumeBtn');
      const volumeSlider = document.getElementById('volumeSlider');
      const volumeLevel = document.getElementById('volumeLevel');
      
      // Audio element
      const audio = new Audio();
      // Replace this URL with your actual music file
      audio.src = "Engkanto/audio/Rugerra.mp3";
      
      // Player state
      let isPlaying = false;
      let volume = 0.7;
      
      // Format time function
      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
      
      // Update progress bar
      function updateProgress() {
        if (audio.duration) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          progress.style.width = `${progressPercent}%`;
          
          currentTimeEl.textContent = formatTime(audio.currentTime);
          durationEl.textContent = formatTime(audio.duration);
        }
      }
      
      // Toggle play/pause
      function togglePlay() {
        if (isPlaying) {
          audio.pause();
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
          audio.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
      }
      
      // Update volume
      function updateVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        volume = Math.max(0, Math.min(1, percent));
        volumeLevel.style.width = `${volume * 100}%`;
        audio.volume = volume;
        
        // Update volume icon
        if (volume === 0) {
          volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volume < 0.5) {
          volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
          volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
      }
      
      // Event listeners
      playPauseBtn.addEventListener('click', togglePlay);
      
      // Progress bar click to seek
      progressBar.addEventListener('click', function(e) {
        if (audio.duration) {
          const rect = progressBar.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          audio.currentTime = percent * audio.duration;
          progress.style.width = `${percent * 100}%`;
        }
      });
      
      // Volume control
      volumeSlider.addEventListener('click', updateVolume);
      
      // Audio event listeners
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audio.duration);
      });
      
      // Initialize player
      volumeLevel.style.width = `${volume * 100}%`;
      audio.volume = volume;
    });

// Toggle sidebar
sidebarToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', function () {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (event) {
    if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        }
    }
});

// Close sidebar when a link is clicked (on mobile)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }
});

// Add active class to current page link
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')))) {
            link.classList.add('active');
        }
    });
});