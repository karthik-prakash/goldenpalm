/* ===================================
   GALLERY SYSTEM WITH LOCAL STORAGE
   =================================== */

const GalleryManager = {
    STORAGE_KEY: 'goldenpalm_gallery',
    currentFilter: 'all',
    currentLightboxIndex: 0,
    galleryImages: [],

    // Initialize gallery
    init() {
        this.loadGallery();
        this.setupFilters();
        this.setupLightbox();
    },

    // Load gallery from local storage
    loadGallery() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.galleryImages = JSON.parse(stored);
        } else {
            // Default sample gallery items (placeholders)
            this.galleryImages = this.getDefaultGallery();
            this.saveGallery();
        }
        this.renderGallery();
    },

    // Default gallery with placeholder images
    getDefaultGallery() {
        return [
            {
                id: 1,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%23800020" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Bridal Design</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">✋</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Royal Bridal Mehendi',
                category: 'bridal',
                date: '2026-01-15'
            },
            {
                id: 2,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%23556B2F" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Arabic Design</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">🌙</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Elegant Arabic Trails',
                category: 'arabic',
                date: '2026-01-20'
            },
            {
                id: 3,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%235D4037" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Baby Shower</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">👶</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Sweet Baby Shower Design',
                category: 'babyshower',
                date: '2026-02-01'
            },
            {
                id: 4,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%23800020" width="400" height="533"/><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23800020"/><stop offset="100%" stop-color="%23a0324f"/></linearGradient></defs><rect fill="url(%23g1)" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Festival Special</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">🪔</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Diwali Festival Design',
                category: 'festival',
                date: '2025-11-01'
            },
            {
                id: 5,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%233E2723" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Indo-Western</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">💎</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Modern Indo-Western Fusion',
                category: 'indowestern',
                date: '2026-02-14'
            },
            {
                id: 6,
                src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533"><rect fill="%23556B2F" width="400" height="533"/><text x="200" y="240" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="24">Kids Mehendi</text><text x="200" y="280" text-anchor="middle" fill="%23D4A843" font-family="serif" font-size="60">🦋</text><text x="200" y="340" text-anchor="middle" fill="%23e8c76a" font-family="sans-serif" font-size="14">Upload your real photo</text></svg>'),
                title: 'Fun Kids Butterfly Design',
                category: 'kids',
                date: '2026-03-01'
            }
        ];
    },

    // Save gallery to local storage
    saveGallery() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.galleryImages));
    },

    // Render gallery
    renderGallery() {
        const grid = document.getElementById('galleryGrid');
        const emptyState = document.getElementById('galleryEmpty');
        if (!grid) return;

        // Filter images
        const filtered = this.currentFilter === 'all'
            ? this.galleryImages
            : this.galleryImages.filter(img => img.category === this.currentFilter);

        // Clear grid (except empty state)
        const items = grid.querySelectorAll('.gallery-item');
        items.forEach(item => item.remove());

        if (filtered.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        filtered.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-category', img.category);
            item.setAttribute('data-index', index);

            item.innerHTML = `
                <img src="${img.src}" alt="${img.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <h4>${img.title}</h4>
                    <span>${this.getCategoryLabel(img.category)}</span>
                </div>
            `;

            item.addEventListener('click', () => this.openLightbox(index, filtered));
            grid.appendChild(item);
        });
    },

    // Get category display label
    getCategoryLabel(cat) {
        const labels = {
            bridal: '💍 Bridal',
            babyshower: '👶 Baby Shower',
            festival: '🪔 Festival',
            arabic: '🌙 Arabic',
            indowestern: '💎 Indo-Western',
            kids: '🦋 Kids'
        };
        return labels[cat] || cat;
    },

    // Setup filter buttons
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.renderGallery();
            });
        });
    },

    // ========== LIGHTBOX ==========
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        if (!lightbox) return;

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.prevImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
    },

    openLightbox(index, images) {
        this.lightboxImages = images;
        this.currentLightboxIndex = index;
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImg');
        const caption = document.getElementById('lightboxCaption');

        img.src = images[index].src;
        caption.textContent = images[index].title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    },

    prevImage() {
        this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
        const img = document.getElementById('lightboxImg');
        const caption = document.getElementById('lightboxCaption');
        img.src = this.lightboxImages[this.currentLightboxIndex].src;
        caption.textContent = this.lightboxImages[this.currentLightboxIndex].title;
    },

    nextImage() {
        this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.lightboxImages.length;
        const img = document.getElementById('lightboxImg');
        const caption = document.getElementById('lightboxCaption');
        img.src = this.lightboxImages[this.currentLightboxIndex].src;
        caption.textContent = this.lightboxImages[this.currentLightboxIndex].title;
    },

    // ========== ADMIN FUNCTIONS ==========
    addImage(file, title, category) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = {
                    id: Date.now(),
                    src: e.target.result,
                    title: title,
                    category: category,
                    date: new Date().toISOString().split('T')[0]
                };
                this.galleryImages.push(newImage);
                this.saveGallery();
                this.renderGallery();
                resolve(newImage);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    deleteImage(id) {
        this.galleryImages = this.galleryImages.filter(img => img.id !== id);
        this.saveGallery();
        this.renderGallery();
    },

    resetGallery() {
        this.galleryImages = this.getDefaultGallery();
        this.saveGallery();
        this.renderGallery();
    }
};

// Initialize gallery on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    GalleryManager.init();
});

// Export for admin panel
window.GalleryManager = GalleryManager;
