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
        style="position:absolute;top:20px;left:20px;background:rgba(255,255,255,.2);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;color:white;font-size:24px;display:flex;align-items:center;justify-content:center;"
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
        <h2 id="modal-title" style="font-size:18px;font-weight:700;margin-bottom:8px;">روش ارتباط را انتخاب کنید</h2>
        <p style="font-size:13px;color:var(--color-muted-gray);margin-bottom:24px;">برای خرید «${productName}» با ما در ارتباط باشید</p>

        <div style="display:flex;flex-direction:column;gap:12px;">
          ${whatsapp ? `
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:16px;border:1px solid var(--color-faint-border);text-decoration:none;color:var(--color-ink-black);">
            <span style="width:44px;height:44px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">WA</span>
            <div>
              <div style="font-size:15px;font-weight:600;">واتساپ</div>
              <div style="font-size:12px;color:var(--color-muted-gray);">پیام مستقیم با پیش‌نویس آماده</div>
            </div>
          </a>` : ''}

          ${telegram ? `
          <a href="${tgUrl}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:16px;border:1px solid var(--color-faint-border);text-decoration:none;color:var(--color-ink-black);">
            <span style="width:44px;height:44px;background:#229ED9;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">TG</span>
            <div>
              <div style="font-size:15px;font-weight:600;">تلگرام</div>
              <div style="font-size:12px;color:var(--color-muted-gray);">@${telegram}</div>
            </div>
          </a>` : ''}

          ${instagram ? `
          <a href="${igUrl}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:16px;border:1px solid var(--color-faint-border);text-decoration:none;color:var(--color-ink-black);">
            <span style="width:44px;height:44px;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">IG</span>
            <div>
              <div style="font-size:15px;font-weight:600;">اینستاگرام</div>
              <div style="font-size:12px;color:var(--color-muted-gray);">@${instagram}</div>
            </div>
          </a>` : ''}
        </div>

        <button onclick="ContactModal.close()" style="margin-top:20px;width:100%;padding:12px;border:1px solid var(--color-faint-border);background:none;border-radius:9999px;font-family:var(--font-primary);font-size:14px;cursor:pointer;color:var(--color-muted-gray);">
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
