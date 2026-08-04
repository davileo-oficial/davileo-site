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
