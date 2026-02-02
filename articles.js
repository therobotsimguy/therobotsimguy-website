// ===== Articles Page Functionality =====

document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const articleCards = document.querySelectorAll('.article-card-full');
    const searchInput = document.getElementById('searchInput');
    
    // ===== Filter Tabs =====
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter articles
            articleCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ===== Search Functionality =====
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title-full').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt-full').textContent.toLowerCase();
                const tag = card.querySelector('.article-tag').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tag.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset filter tabs when searching
            if (searchTerm) {
                filterTabs.forEach(t => t.classList.remove('active'));
                filterTabs[0].classList.add('active'); // Set "All" as active
            }
        });
    }
    
    // ===== Load More Button =====
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more articles from an API
            this.textContent = 'No more articles';
            this.disabled = true;
            this.style.opacity = '0.5';
            this.style.cursor = 'not-allowed';
        });
    }
});
