---
title: "تماس با ما"
description: "راه‌های ارتباطی با فروشگاه"
permalink: /contact/
---

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:40px;">

  <a href="https://wa.me/{{ site.data.settings.whatsapp }}" target="_blank" rel="noopener" class="contact-channel">
    <span style="width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">WA</span>
    <span style="font-weight:600;">واتساپ</span>
  </a>

  <a href="https://t.me/{{ site.data.settings.telegram }}" target="_blank" rel="noopener" class="contact-channel">
    <span style="width:56px;height:56px;background:#229ED9;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">TG</span>
    <span style="font-weight:600;">تلگرام</span>
  </a>

  <a href="https://instagram.com/{{ site.data.settings.instagram }}" target="_blank" rel="noopener" class="contact-channel">
    <span style="width:56px;height:56px;background:linear-gradient(45deg,#f09433,#dc2743,#bc1888);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">IG</span>
    <span style="font-weight:600;">اینستاگرام</span>
  </a>

</div>

<div style="background:white;border-radius:20px;box-shadow:var(--shadow-sm);padding:32px;margin-bottom:32px;">
  <h2 style="font-size:18px;font-weight:600;margin-bottom:20px;">اطلاعات تماس</h2>
  <p style="margin-bottom:10px;"><strong>تلفن:</strong> {{ site.data.settings.phone }}</p>
  <p style="margin-bottom:10px;"><strong>ایمیل:</strong> {{ site.data.settings.email }}</p>
  <p><strong>آدرس:</strong> {{ site.data.settings.address }}</p>
</div>

{% if site.data.settings.map_embed_url %}
<div style="border-radius:20px;overflow:hidden;box-shadow:var(--shadow-sm);">
  <iframe
    src="{{ site.data.settings.map_embed_url }}"
    width="100%"
    height="350"
    style="border:0;display:block;"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="موقعیت فروشگاه روی نقشه"
  ></iframe>
</div>
{% endif %}
