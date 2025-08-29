let likeCount = 0;
const likeCounter = document.getElementById("likeCounter");
const heartButtons = document.querySelectorAll(".fa-heart");
for (const button of heartButtons) {
  button.addEventListener("click", function () {
    likeCount++;
    likeCounter.textContent = likeCount;
  })
}

// coin counter
let coin = 100;
const coinCounter = document.getElementById("coinCounter");
const callButtons = document.querySelectorAll(".callBtn");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

coinCounter.textContent = coin;

for (const button of callButtons) {
  button.addEventListener("click", function(e) {
    e.preventDefault(); 

    const service = this.getAttribute("data-service");
    const number = this.getAttribute("data-number");

    if (coin >= 20) {
      coin -= 20;  
      coinCounter.textContent = coin;

      alert(`${service} ${number}`);

      const now = new Date();
      const time = now.toLocaleTimeString();

      const div = document.createElement("div");
      div.className = "flex justify-between items-center bg-gray-50 p-2 rounded"; 
      
      div.innerHTML = `
        <div>
          <h1 class="font-semibold">${service}</h1>
          <p class="text-sm text-gray-600">${number}</p>
        </div>
        <p class="text-xs text-gray-500">${time}</p>
      `;
      
      historyList.prepend(div); 
    } else {
      alert("You don’t have enough coins!");
    }
  });
}

// clear history button
 
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}


document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;

  
  const card = btn.closest("[data-card]");
  if (!card) return;

  const sourceEl = card.querySelector("[data-copy-source]");
  if (!sourceEl) return;

  const text = sourceEl.textContent.trim();

  try {
    await copyToClipboard(text);

    
    const prev = btn.innerHTML;
    btn.innerHTML = "Copied!";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = prev;
      btn.disabled = false;
    }, 1200);
  } catch (err) {
    console.error(err);
    alert("Copy failed");
  }
});

let coppyCount = 0;
const coppyCounter = document.getElementById("coppyCounter");
const coppyButtons= document.querySelectorAll(".copy-btn");
for (const button of coppyButtons) {
  button.addEventListener("click", function () {
    coppyCount++;
    coppyCounter.textContent = likeCount;
  })
}
