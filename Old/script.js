document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.detailed-desc').style.display = 'block';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.detailed-desc').style.display = 'none';
        });
    });
});