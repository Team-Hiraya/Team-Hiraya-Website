// Mobile sidebar functionality
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
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
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
          sidebarOverlay.classList.remove('active');
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
      }
    });

    // Add active class to current page link
    document.addEventListener('DOMContentLoaded', function() {
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