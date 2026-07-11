---
title: "سوالات متداول"
description: "پاسخ به پرتکرارترین سوالات مشتریان"
permalink: /faq/
schema_type: faq
---

<div style="max-width:800px;">
{% for item in site.data.faq %}
<div class="accordion-item">
  <button class="accordion-header" aria-expanded="false">
    <span>{{ item.question }}</span>
    <svg data-accordion-icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition:transform .2s;flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="accordion-body" style="max-height:0;overflow:hidden;transition:max-height .25s ease, padding .25s ease;">
    <p style="padding-bottom:4px;">{{ item.answer }}</p>
  </div>
</div>
{% endfor %}
</div>
