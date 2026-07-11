---
title: "تماس با ما"
description: "راه‌های ارتباطی با فروشگاه"
permalink: /contact/
---

<div class="contact-channels">

  <a href="https://wa.me/{{ site.data.settings.whatsapp }}" target="_blank" rel="noopener" class="contact-channel">
    <span class="contact-icon contact-icon--wa">WA</span>
    <span class="contact-name">واتساپ</span>
  </a>

  <a href="https://t.me/{{ site.data.settings.telegram }}" target="_blank" rel="noopener" class="contact-channel">
    <span class="contact-icon contact-icon--tg">TG</span>
    <span class="contact-name">تلگرام</span>
  </a>

  <a href="https://instagram.com/{{ site.data.settings.instagram }}" target="_blank" rel="noopener" class="contact-channel">
    <span class="contact-icon contact-icon--ig">IG</span>
    <span class="contact-name">اینستاگرام</span>
  </a>

</div>

<div class="contact-info">
  <h2 class="contact-info__title">اطلاعات تماس</h2>
  <p class="contact-info__item"><strong>تلفن:</strong> {{ site.data.settings.phone }}</p>
  <p class="contact-info__item"><strong>ایمیل:</strong> {{ site.data.settings.email }}</p>
  <p><strong>آدرس:</strong> {{ site.data.settings.address }}</p>
</div>

{% if site.data.settings.map_embed_url %}
<div class="contact-map">
  <iframe
    src="{{ site.data.settings.map_embed_url }}"
    width="100%"
    height="350"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="موقعیت فروشگاه روی نقشه"
  ></iframe>
</div>
{% endif %}
