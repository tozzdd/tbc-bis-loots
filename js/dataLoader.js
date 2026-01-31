/* ============================================================
   Data Loader
   - Charge le JSON master une seule fois
   - Filtre les données par groupe (raid / tier)
   ============================================================ */

let ALL_DATA = [];
let currentData = [];

/* Chargement unique du JSON master */
async function loadData() {
  const res = await fetch(DATA_SOURCE);
  ALL_DATA = await res.json();
}

function populateRaidSelect() {
  const raidSelect = document.getElementById("raidSelect");
  if (!raidSelect) {
    console.warn("raidSelect introuvable");
    return;
  }

  raidSelect.innerHTML = "";

  RAID_GROUPS.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g.id; // ID interne (ex: KARA, BT, SSC)
    opt.textContent = g.label; // Label visible (ex: Karazhan)
    raidSelect.appendChild(opt);
  });
}

/* Sélection d’un raid / groupe */
function loadRaid(groupId) {
  const group = RAID_GROUPS.find((g) => g.id === groupId);

  if (!group) {
    console.warn("Raid invalide :", groupId, "→ fallback");
    loadRaid(RAID_GROUPS[0].id);
    return;
  }

  if (groupId === "ALL") {
    // 🔥 Respect de l’ordre du select RAID
    currentData = [];

    RAID_GROUPS.filter((g) => g.id !== "ALL").forEach((g) => {
      currentData.push(...ALL_DATA.filter(g.filter));
    });
  } else {
    currentData = ALL_DATA.filter(group.filter);
  }

  // 0️⃣ Mettre à jour l’état global + URL
  filterState.raid = groupId;
  updateURLFromFilters();

  
  // 2️⃣ Rebuild des selects dépendants du raid

  populateBossSelect();
  populateSlotSelect();

  // 3️⃣ Réappliquer les filtres persistants à l’UI
  applyFiltersToUI();

  // 4️⃣ Rendu final
  renderTable();
}
