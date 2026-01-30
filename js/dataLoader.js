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

/* Sélection d’un raid / groupe */
function loadRaid(groupId) {
  const group = RAID_GROUPS.find((g) => g.id === groupId);
  if (!group) {
    console.warn("Groupe introuvable :", groupId);
    return;
  }

  // 1️⃣ Données filtrées par raid
  currentData = ALL_DATA.filter(group.filter);

  // 2️⃣ Reset des filtres UI dépendants du raid
  resetFilters();

  // 3️⃣ Rebuild des selects dépendants des données
  populateBossSelect();
  populateSlotSelect();

  // 4️⃣ Rendu final
  renderTable();
}
