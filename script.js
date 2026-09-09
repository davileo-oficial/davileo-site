const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');

if(nav&&!nav.querySelector('a[href="ninjatrader.html"]')){
  const ninjaTraderLink=document.createElement('a');
  ninjaTraderLink.href='ninjatrader.html';
  ninjaTraderLink.textContent='NinjaTrader';
  if(document.body.dataset.page==='ninjatrader') ninjaTraderLink.className='active';
  const supportLink=nav.querySelector('a[href="suporte.html"]');
  nav.insertBefore(ninjaTraderLink,supportLink||null);
}

if(button&&nav){
  button.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
  });
}

const carousel=document.querySelector('[data-carousel]');

if(carousel){
  const slides=[...carousel.querySelectorAll('.hero-slide')];
  const dots=[...carousel.querySelectorAll('.carousel-dots button')];
  const previous=carousel.querySelector('.carousel-arrow.previous');
  const next=carousel.querySelector('.carousel-arrow.next');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current=0;
  let timer;
  let touchStart=0;

  const show=index=>{
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===current;
      slide.classList.toggle('active',active);
      slide.setAttribute('aria-hidden',String(!active));
      slide.tabIndex=active?0:-1;
      dots[i]?.classList.toggle('active',active);
      if(dots[i]) dots[i].setAttribute('aria-current',active?'true':'false');
    });
  };

  const stop=()=>clearInterval(timer);
  const start=()=>{
    stop();
    if(!reducedMotion) timer=setInterval(()=>show(current+1),5000);
  };

  previous?.addEventListener('click',()=>{show(current-1);start();});
  next?.addEventListener('click',()=>{show(current+1);start();});
  dots.forEach((dot,index)=>dot.addEventListener('click',()=>{show(index);start();}));
  carousel.addEventListener('mouseenter',stop);
  carousel.addEventListener('mouseleave',start);
  carousel.addEventListener('focusin',stop);
  carousel.addEventListener('focusout',start);
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);start();}
    if(event.key==='ArrowRight'){event.preventDefault();show(current+1);start();}
  });
  carousel.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;stop();},{passive:true});
  carousel.addEventListener('touchend',event=>{
    const distance=event.changedTouches[0].clientX-touchStart;
    if(Math.abs(distance)>45) show(current+(distance<0?1:-1));
    start();
  },{passive:true});
  show(0);
  start();
}

const footer=document.querySelector('.site-footer');
const footerBottom=footer?.querySelector('.footer-bottom');

if(footer&&footerBottom&&!footer.querySelector('.compliance-disclosures')){
  const disclosures=document.createElement('section');
  disclosures.className='container compliance-disclosures';
  disclosures.setAttribute('aria-label','Divulgações de risco e desempenho hipotético');
  disclosures.innerHTML=`
    <div class="compliance-disclosure">
      <h4>RISK DISCLOSURE</h4>
      <p>Futures and forex trading contains substantial risk and is not for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing ones financial security or life style. Only risk capital should be used for trading and only those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of future results.</p>
    </div>
    <div class="compliance-disclosure">
      <h4>HYPOTHETICAL PERFORMANCE DISCLAIMER</h4>
      <p>HYPOTHETICAL PERFORMANCE RESULTS HAVE MANY INHERENT LIMITATIONS, SOME OF WHICH ARE DESCRIBED BELOW. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES SIMILAR TO THOSE SHOWN; IN FACT, THERE ARE FREQUENTLY SHARP DIFFERENCES BETWEEN HYPOTHETICAL PERFORMANCE RESULTS AND THE ACTUAL RESULTS SUBSEQUENTLY ACHIEVED BY ANY PARTICULAR TRADING PROGRAM. ONE OF THE LIMITATIONS OF HYPOTHETICAL PERFORMANCE RESULTS IS THAT THEY ARE GENERALLY PREPARED WITH THE BENEFIT OF HINDSIGHT. IN ADDITION, HYPOTHETICAL TRADING DOES NOT INVOLVE FINANCIAL RISK, AND NO HYPOTHETICAL TRADING RECORD CAN COMPLETELY ACCOUNT FOR THE IMPACT OF FINANCIAL RISK OF ACTUAL TRADING. FOR EXAMPLE, THE ABILITY TO WITHSTAND LOSSES OR TO ADHERE TO A PARTICULAR TRADING PROGRAM IN SPITE OF TRADING LOSSES ARE MATERIAL POINTS WHICH CAN ALSO ADVERSELY AFFECT ACTUAL TRADING RESULTS. THERE ARE NUMEROUS OTHER FACTORS RELATED TO THE MARKETS IN GENERAL OR TO THE IMPLEMENTATION OF ANY SPECIFIC TRADING PROGRAM WHICH CANNOT BE FULLY ACCOUNTED FOR IN THE PREPARATION OF HYPOTHETICAL PERFORMANCE RESULTS AND ALL WHICH CAN ADVERSELY AFFECT TRADING RESULTS.</p>
    </div>`;
  footer.insertBefore(disclosures,footerBottom);
}

// Google Analytics 4: a tag só é carregada após consentimento explícito.
const analyticsMeasurementId='G-PMSHWDNEET';
const analyticsConsentKey='davileo_analytics_consent';
const productByPage={
  'ls-001-session-map.html':{id:'LS-001',name:'Session Map',price:147},
  'ls-002-opening-range-map.html':{id:'LS-002',name:'Opening Range Map',price:147},
  'ls-003-garch-levels.html':{id:'LS-003',name:'GARCH Levels',price:197},
  'ls-004-market-structure-map.html':{id:'LS-004',name:'Market Structure Map',price:297},
  'vp-001-volume-profile-classic.html':{id:'VP-001',name:'Volume Profile Classic',price:197},
  'essentials-pack.html':{id:'PACK',name:'Essentials Pack',price:397}
};
const productByCheckout={
  'd2wrmxp4':productByPage['ls-001-session-map.html'],
  'cl5gqvq3':productByPage['ls-002-opening-range-map.html'],
  'tsoafe4f':productByPage['ls-003-garch-levels.html'],
  '39VKJX57WR':productByPage['ls-004-market-structure-map.html'],
  'R9JXJDJE0X':productByPage['vp-001-volume-profile-classic.html'],
  '1W32VONJ92':productByPage['essentials-pack.html']
};
const currentPage=location.pathname.split('/').filter(Boolean).pop()||'index.html';
const currentProduct=productByPage[currentPage];
const sendAnalyticsEvent=(name,parameters={})=>{
  if(typeof window.gtag==='function') window.gtag('event',name,parameters);
};
const loadAnalytics=()=>{
  if(window.davileoAnalyticsLoaded) return;
  window.davileoAnalyticsLoaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config',analyticsMeasurementId,{anonymize_ip:true});
  const tag=document.createElement('script');
  tag.async=true;
  tag.src=`https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  document.head.appendChild(tag);
  if(currentProduct){
    sendAnalyticsEvent('view_item',{currency:'BRL',value:currentProduct.price,items:[{item_id:currentProduct.id,item_name:currentProduct.name,price:currentProduct.price}]});
  }
};
const saveAnalyticsConsent=value=>{
  localStorage.setItem(analyticsConsentKey,value);
  document.querySelector('.analytics-consent')?.remove();
  if(value==='granted') loadAnalytics();
};
const showAnalyticsConsent=()=>{
  if(document.querySelector('.analytics-consent')) return;
  const banner=document.createElement('aside');
  banner.className='analytics-consent';
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-label','Preferências de métricas');
  banner.innerHTML=`<div><strong>Podemos medir a navegação?</strong><p>Usamos o Google Analytics para entender visitas e cliques nos produtos. A coleta só começa com sua autorização. <a href="privacidade.html">Saiba mais</a>.</p></div><div class="analytics-consent-actions"><button class="btn analytics-decline" type="button">Continuar sem métricas</button><button class="btn btn-primary analytics-accept" type="button">Aceitar métricas</button></div>`;
  document.body.appendChild(banner);
  banner.querySelector('.analytics-accept').addEventListener('click',()=>saveAnalyticsConsent('granted'));
  banner.querySelector('.analytics-decline').addEventListener('click',()=>saveAnalyticsConsent('denied'));
};
const storedAnalyticsConsent=localStorage.getItem(analyticsConsentKey);
if(storedAnalyticsConsent==='granted') loadAnalytics();
else if(storedAnalyticsConsent!=='denied') showAnalyticsConsent();
document.querySelectorAll('[data-analytics-preferences]').forEach(button=>{
  button.addEventListener('click',()=>{
    localStorage.removeItem(analyticsConsentKey);
    showAnalyticsConsent();
  });
});
document.querySelectorAll('a[href*="eduzz.com"]').forEach(link=>{
  link.addEventListener('click',()=>{
    const checkoutCode=link.href.split('/').filter(Boolean).pop();
    const product=currentProduct||productByCheckout[checkoutCode]||{id:'catalog',name:'Catálogo DAVILEO',price:0};
    sendAnalyticsEvent('begin_checkout',{currency:'BRL',value:product.price,checkout_url:link.href,items:[{item_id:product.id,item_name:product.name,price:product.price}]});
  });
});
