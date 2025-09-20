// Simple client-side AgriConnect MVP logic (Landing Page Only)
let role = null;

function $(id){return document.getElementById(id)}
function chooseRole(r){
  role = r;
  $('landing').classList.add('hidden');
  $('login').classList.remove('hidden');
  $('roleBadge').innerText = r === 'farmer' ? 'Farmer mode' : 'Buyer mode';
  $('loginTitle').innerText = r === 'farmer' ? 'Farmer Login' : 'Buyer Login';
}
function showToast(txt, t=2400){ const s=$('toast'); s.innerText=txt; s.classList.remove('hidden'); setTimeout(()=>s.classList.add('hidden'), t); }

// init
(function(){
  // nothing yet
})();
  const phone = $('phoneInput').value.trim();
  if(!phone){showToast('Enter phone number');return;}
  // simulated OTP send
  $('otpRow').classList.remove('hidden');
  $('sendOtpBtn').classList.add('hidden');
  $('verifyOtpBtn').classList.remove('hidden');
  showToast('OTP sent (simulated). Use any 4-digit code to login.');

function verifyOtp(){
  const otp = $('otpInput').value.trim();
  if(!otp || otp.length<1){showToast('Enter OTP');return;}
  currentUser = $('phoneInput').value.trim() || 'demo';
  $('login').classList.add('hidden');
  if(role === 'farmer') openFarmer();
  else openBuyer();
}
function openFarmer(){
  $('farmerDash').classList.remove('hidden');
  $('buyerDash').classList.add('hidden');
  $('roleBadge').innerText = 'Farmer';
  renderMyListings();
  // set weather sample
  $('weatherCard').innerText = 'High humidity expected tomorrow — risk of fungal growth. Take preventive measures.';
}
function openBuyer(){
  $('buyerDash').classList.remove('hidden');
  $('farmerDash').classList.add('hidden');
  $('roleBadge').innerText = 'Buyer';
  renderMarketplace();
}
function logout(){
  role = null; currentUser = null;
  $('roleBadge').innerText = '';
  $('landing').classList.remove('hidden');
  $('farmerDash').classList.add('hidden');
  $('buyerDash').classList.add('hidden');
  // reset login
  $('phoneInput').value=''; $('otpInput').value=''; $('otpRow').classList.add('hidden');
  $('sendOtpBtn').classList.remove('hidden'); $('verifyOtpBtn').classList.add('hidden');
}
function openDiagnose(){ $('diagnosePanel').classList.remove('hidden'); }
function closeDiagnose(){ $('diagnosePanel').classList.add('hidden'); $('diagnosisResult').classList.add('hidden'); }
function openListProduce(){ $('listPanel').classList.remove('hidden'); }
function closeListProduce(){ $('listPanel').classList.add('hidden'); $('listMsg').innerText=''; }
function simulateDiagnosis(kind){
  const res = $('diagnosisResult');
  res.classList.remove('hidden');
  if(kind==='tomato_leaf'){
    res.innerHTML = `<div class="result"><strong style="color:#c62828">⚠ Leaf curl virus detected</strong><p>Action: Remove infected plants. Spray neem oil and control aphids. <button onclick="playVoice('leaf curl detected. remove infected plants and spray neem oil.')">🔊 Play Telugu (simulated)</button></p></div>`;
  } else if(kind==='chilli_leaf'){
    res.innerHTML = `<div class="result"><strong style="color:#c62828">⚠ Mosaic pattern (possible virus)</strong><p>Action: Isolate affected plants and monitor. Improve sanitation. <button onclick="playVoice('mosaic virus suspected. isolate and monitor.')">🔊 Play Telugu (simulated)</button></p></div>`;
  } else {
    res.innerHTML = `<div class="result"><strong style="color:#2e7d32">✅ Healthy leaf</strong><p>No immediate action needed. Keep monitoring.</p></div>`;
  }
}
function fileSelected(e){
  const f = e.target.files[0];
  if(!f) return;
  // simple heuristics: filename containing keywords triggers sample diagnoses
  const name = f.name.toLowerCase();
  if(name.includes('tomato')) simulateDiagnosis('tomato_leaf');
  else if(name.includes('chilli') || name.includes('chili')) simulateDiagnosis('chilli_leaf');
  else simulateDiagnosis('healthy_leaf');
}
function playVoice(text){
  // Simulated voice using Web Speech API (browser may ask permission)
  if('speechSynthesis' in window){
    const utter = new SpeechSynthesisUtterance(text);
    // Note: real Telugu voice may not be available in environment; this is a simulated demo.
    speechSynthesis.speak(utter);
  } else {
    showToast('Voice not supported in this browser.');
  }
}
function listProduce(){
  const crop = $('cropName').value.trim(); const qty = Number($('cropQty').value); const price = Number($('cropPrice').value); const loc = $('cropLocation').value.trim() || 'Unknown';
  if(!crop || qty<=0 || price<=0){ $('listMsg').innerText = 'Please enter valid details.'; return;}
  const id = Date.now();
  listings.push({id, farmer: 'You', phone: currentUser || 'demo', crop, qty, price, location:loc, desc:'Listed from AgriConnect app'});
  $('listMsg').innerText = 'Your produce is now listed on Rythu Bazaar!';
  renderMyListings();
}
function renderMyListings(){
  const container = $('myListings'); container.innerHTML = '';
  const mine = listings.filter(l => l.phone === currentUser || l.farmer==='You');
  if(mine.length===0) container.innerHTML = '<div class="muted small">You have no active listings.</div>';
  mine.forEach(l=>{
    const div = document.createElement('div'); div.className='listing-card';
    div.innerHTML = `<div class="listing-info"><strong>${l.crop}</strong> — ${l.qty} kg<br/><span class="muted">${l.location} · ₹${l.price}/kg</span></div>
    <div><button class="primary" onclick="editListing(${l.id})">Edit</button><button class="secondary" onclick="deleteListing(${l.id})">Delete</button></div>`;
    container.appendChild(div);
  });
}
function editListing(id){ showToast('Edit flow not implemented in MVP.'); }
function deleteListing(id){ listings = listings.filter(x=>x.id!==id); renderMyListings(); showToast('Listing removed.'); }
let currentFilter = '';
function renderMarketplace(){
  const container = $('marketplace'); container.innerHTML = '';
  const q = $('searchInput') ? $('searchInput').value.toLowerCase() : '';
  const results = listings.filter(l=>{
    if(currentFilter && l.crop.toLowerCase().indexOf(currentFilter.toLowerCase())===-1) return false;
    if(q && !(`${l.crop} ${l.location} ${l.farmer}`).toLowerCase().includes(q)) return false;
    return true;
  });
  if(results.length===0){ container.innerHTML = '<div class="muted small">No listings found.</div>'; return; }
  results.forEach(l=>{
    const div = document.createElement('div'); div.className='listing-card';
    div.innerHTML = `<div class="listing-info"><strong>${l.crop}</strong> — ${l.qty} kg<br/><span class="muted">${l.farmer} · ${l.location} · ₹${l.price}/kg</span></div>
    <div><button class="primary" onclick="contactFarmers('${l.phone}','${l.farmer}','${l.crop}',${l.price})">💬 Contact</button></div>`;
    container.appendChild(div);
  });
}
function contactFarmers(phone,name,crop,price){
  // open WhatsApp link simulation; on devices w/ WhatsApp this opens chat.
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent('Hello '+name+'! I am interested in your '+crop+' at ₹'+price+'/kg. Can we talk?')}`;
  window.open(wa,'_blank');
}
function filterCategory(cat){ currentFilter = cat; renderMarketplace(); }
function showToast(txt, t=2400){ const s=$('toast'); s.innerText=txt; s.classList.remove('hidden'); setTimeout(()=>s.classList.add('hidden'), t); }

// init
(function(){
  // nothing yet
})();
