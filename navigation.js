/*
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('#navMenu a');

    // Loop through each link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent the default action
            event.preventDefault();

            // Get the section to navigate to
            var target = this.getAttribute('href');
            var section = document.querySelector(target);

            // Scroll to the section
            section.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
    });
});
*/