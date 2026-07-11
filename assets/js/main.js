// ===== Product Search & Filter Engine =====
const ShopApp = (() => {
  let allProducts = [];

  const loadProducts = async () => {
    try {
      const baseUrl = document.documentElement.dataset.baseurl || '';
      const res = await fetch(`${baseUrl}/search.json`);
      allProducts = await res.json();
    } catch (e) {
      console.error('Failed to load products index', e);
    }
  };

  const filterProducts = ({ query = '', category = '', tags = [] }) => {
    const q = query.trim().toLowerCase();
    return allProducts.filter(p => {
      const matchQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q);

      const matchCategory = !category || p.category === category;

      const matchTags = tags.length === 0 ||
        tags.every(t => p.tags?.includes(t));

      return matchQuery && matchCategory && matchTags;
    });
  };

  return { loadProducts, filterProducts, getAll: () => allProducts };
})();

// ===== Gallery Component (Vanilla JS) =====
const Gallery = (() => {
  const init = (containerEl) => {
    if (!containerEl) return;

    const mainImg = containerEl.querySelector('[data-gallery-main]');
    const thumbs = containerEl.querySelectorAll('[data-gallery-thumb]');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        const alt = thumb.dataset.alt;

        mainImg.src = src;
        mainImg.alt = alt;

        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    mainImg?.addEventListener('click', () => {
      openLightbox(mainImg.src, mainImg.alt);
    });
  };

  const openLightbox = (src, alt) => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', alt || 'تصویر محصول');
    overlay.innerHTML = `
      <img class="lightbox-img" src="${src}" alt="${alt || ''}">
      <button
        aria-label="بستن"
        class="lightbox-close"
      >×</button>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.tagName === 'BUTTON') {
        overlay.remove();
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
      }
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  };

  return { init };
})();

// ===== Dark Mode Toggle =====
const ThemeToggle = (() => {
  const STORAGE_KEY = 'shop-theme';

  const init = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  };

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  };

  return { init, toggle };
})();

// ===== Contact Modal (WhatsApp / Telegram / Instagram) =====
const ContactModal = (() => {
  let modal = null;

  const build = ({ productName, productUrl, whatsapp, telegram, instagram }) => {
    const waMessage = encodeURIComponent(`سلام، درباره محصول "${productName}" می‌خواستم بیشتر بدانم.\n${productUrl}`);
    const waUrl = `https://wa.me/${whatsapp}?text=${waMessage}`;
    const tgUrl = `https://t.me/${telegram}`;
    const igUrl = `https://instagram.com/${instagram}`;

    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');

    modal.innerHTML = `
      <div class="modal-box">
        <h2 id="modal-title" class="modal-title">روش ارتباط را انتخاب کنید</h2>
        <p class="modal-desc">برای خرید «${productName}» با ما در ارتباط باشید</p>

        <div class="modal-channels">
          ${whatsapp ? `
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
            class="modal-channel">
            <span class="modal-channel-icon modal-channel-icon--wa">WA</span>
            <div>
              <div class="modal-channel-name">واتساپ</div>
              <div class="modal-channel-desc">پیام مستقیم با پیش‌نویس آماده</div>
            </div>
          </a>` : ''}

          ${telegram ? `
          <a href="${tgUrl}" target="_blank" rel="noopener noreferrer"
            class="modal-channel">
            <span class="modal-channel-icon modal-channel-icon--tg">TG</span>
            <div>
              <div class="modal-channel-name">تلگرام</div>
              <div class="modal-channel-desc">@${telegram}</div>
            </div>
          </a>` : ''}

          ${instagram ? `
          <a href="${igUrl}" target="_blank" rel="noopener noreferrer"
            class="modal-channel">
            <span class="modal-channel-icon modal-channel-icon--ig">IG</span>
            <div>
              <div class="modal-channel-name">اینستاگرام</div>
              <div class="modal-channel-desc">@${instagram}</div>
            </div>
          </a>` : ''}
        </div>

        <button onclick="ContactModal.close()" class="modal-close">
          بستن
        </button>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal?.remove();
    modal = null;
    document.body.style.overflow = '';
  };

  return { open: build, close };
})();

// ===== Accordion =====
const Accordion = (() => {
  const init = () => {
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const body = item.querySelector('.accordion-body');
        const icon = btn.querySelector('[data-accordion-icon]');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.accordion-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-body').style.maxHeight = null;
          openItem.querySelector('.accordion-body').style.padding = '0 20px';
          const ic = openItem.querySelector('[data-accordion-icon]');
          if (ic) ic.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
          body.style.padding = '0 20px 16px';
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  };

  return { init };
})();

// ===== Hero Slider (Simple, No-lib) =====
const HeroSlider = (() => {
  let current = 0;
  let slides = [];
  let timer = null;

  const init = (container) => {
    if (!container) return;
    slides = Array.from(container.querySelectorAll('[data-slide]'));
    if (slides.length <= 1) return;

    const prev = container.querySelector('[data-slide-prev]');
    const next = container.querySelector('[data-slide-next]');

    prev?.addEventListener('click', () => go(current - 1));
    next?.addEventListener('click', () => go(current + 1));

    show(0);
    timer = setInterval(() => go(current + 1), 5000);

    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', () => {
      timer = setInterval(() => go(current + 1), 5000);
    });
  };

  const show = (idx) => {
    slides.forEach((s, i) => {
      s.style.display = i === idx ? 'block' : 'none';
    });
    current = idx;
  };

  const go = (idx) => {
    const next = ((idx % slides.length) + slides.length) % slides.length;
    show(next);
  };

  return { init };
})();

// ===== DOM Ready Bootstrap =====
document.addEventListener('DOMContentLoaded', () => {
  ThemeToggle.init();
  Accordion.init();

  const galleryEl = document.querySelector('[data-gallery]');
  if (galleryEl) Gallery.init(galleryEl);

  const sliderEl = document.querySelector('[data-hero-slider]');
  if (sliderEl) HeroSlider.init(sliderEl);

  if (document.querySelector('[data-products-filter]')) {
    ShopApp.loadProducts();
  }
});
