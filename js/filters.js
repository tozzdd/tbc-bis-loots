/* ============================================================
   Récupération des filtres actifs (UI)
============================================================ */

function getActiveFilters() {
  return filterState;
}
let filterState = {
  raid: null,
  boss: null,
  slot: null,
  bis: null,
  selectedClass: null,
  selectedRole: null
};

function loadFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const raidParam = params.get("raid");

  const validRaid = RAID_GROUPS.find((g) => g.id.toLowerCase() === raidParam?.toLowerCase());

  filterState.raid = validRaid ? validRaid.id : null;
  filterState.boss = params.get("boss");
  filterState.slot = params.get("slot");
  filterState.bis = params.get("bis");
  filterState.selectedClass = params.get("class");
  filterState.selectedRole = params.get("role");
}

/* ============================================================
   On applique les filtres
============================================================ */

function applyFiltersToUI() {
  const bossSelect = document.getElementById("bossSelect");
  const slotSelect = document.getElementById("slotSelect");
  const bisSelect = document.getElementById("bisFilter");

  if (bossSelect) {
    if (filterState.boss && [...bossSelect.options].some((o) => o.value === filterState.boss)) {
      bossSelect.value = filterState.boss;
    } else {
      filterState.boss = null;
      bossSelect.value = "";
    }
  }

  if (slotSelect) {
    if (filterState.slot && [...slotSelect.options].some((o) => o.value === filterState.slot)) {
      slotSelect.value = filterState.slot;
    } else {
      filterState.slot = null;
      slotSelect.value = "";
    }
  }

  if (bisSelect) {
    bisSelect.value = filterState.bis || "";
  }

  setSelectedClass(filterState.selectedClass);
  setSelectedRole(filterState.selectedRole);
}

/* ============================================================
   Populate Boss Select 
============================================================ */

function populateBossSelect() {
  const select = document.getElementById("bossSelect");
  if (!select) return;

  select.innerHTML = `<option value="">Tous les boss</option>`;

  const bosses = Array.from(new Set(currentData.map((i) => i.boss).filter(Boolean)));

  bosses.forEach((boss) => {
    const opt = document.createElement("option");
    opt.value = boss;
    opt.textContent = boss;
    select.appendChild(opt);
  });
}

/* ============================================================
   Populate Slot / Emplacement Select
============================================================ */

function populateSlotSelect() {
  const select = document.getElementById("slotSelect");
  if (!select) return;

  select.innerHTML = `<option value="">Tous</option>`;

  const slots = Array.from(new Set(currentData.map((i) => i.emplacement).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "fr")
  );

  slots.forEach((slot) => {
    const opt = document.createElement("option");
    opt.value = slot;
    opt.textContent = slot;
    select.appendChild(opt);
  });
}

/* ============================================================
 Ajout des filtres dans l'URL
============================================================ */

function updateURLFromFilters() {
  const params = new URLSearchParams();

  if (filterState.raid) params.set("raid", filterState.raid);
  if (filterState.boss) params.set("boss", filterState.boss);
  if (filterState.slot) params.set("slot", filterState.slot);
  if (filterState.bis) params.set("bis", filterState.bis);
  if (filterState.selectedClass) params.set("class", filterState.selectedClass);
  if (filterState.selectedRole) params.set("role", filterState.selectedRole);

  history.replaceState(null, "", `?${params.toString()}`);
}

function onFilterChange() {
  filterState.boss = document.getElementById("bossSelect")?.value || null;
  filterState.slot = document.getElementById("slotSelect")?.value || null;
  filterState.bis = document.getElementById("bisFilter")?.value || null;

  filterState.selectedClass = document.getElementById("classSelect")?.value || null;
  filterState.selectedRole = document.getElementById("roleSelect")?.value || null;

  updateURLFromFilters();
  renderTable();
}

/* ============================================================
   Mapping Spé → Classe
============================================================ */
function setSelectedClass(value) {
  const select = document.getElementById("classSelect");
  if (!select) return;

  if (value && [...select.options].some((o) => o.value === value)) {
    select.value = value;
  } else {
    select.value = "";
  }
}

function setSelectedRole(value) {
  const select = document.getElementById("roleSelect");
  if (!select) return;

  if (value && [...select.options].some((o) => o.value === value)) {
    select.value = value;
  } else {
    select.value = "";
  }
}

const SPEC_TO_CLASS = {
  HPal: "Paladin",
  PPal: "Paladin",
  Ret: "Paladin",

  PWar: "Guerrier",
  Fury: "Guerrier",
  Arms: "Guerrier",

  RDru: "Druide",
  Boomy: "Druide",
  Cat: "Druide",
  Bear: "Druide",

  RSham: "Chaman",
  Elem: "Chaman",
  Enh: "Chaman",

  HPri: "Prêtre",
  SPri: "Prêtre",

  Rogue: "Voleur",
  Hunter: "Chasseur",
  Hunt: "Chasseur",
  Mage: "Mage",
  Lock: "Démoniste"
};

/* ============================================================
   Mapping Spé → Rôle
============================================================ */

const SPEC_TO_ROLE = {
  PPal: "Tank",
  PWar: "Tank",
  Bear: "Tank",

  HPal: "Heal",
  RDru: "Heal",
  RSham: "Heal",
  HPri: "Heal",

  Ret: "DPS",
  Fury: "DPS",
  Arms: "DPS",
  Boomy: "DPS",
  Cat: "DPS",
  Elem: "DPS",
  Enh: "DPS",
  SPri: "DPS",
  Rogue: "DPS",
  Hunter: "DPS",
  Mage: "DPS",
  Lock: "DPS"
};

/* ============================================================
   Helpers de matching
============================================================ */

function itemMatchesClass(item, selectedClass) {
  if (!selectedClass) return true;

  const specs = [...(item.specialisations_ms || []), ...(item.specialisations_os || []), ...(item.priorité || [])];

  return specs.some((spec) => SPEC_TO_CLASS[spec] === selectedClass);
}

function itemMatchesRole(item, selectedRole) {
  if (!selectedRole) return true;

  const specs = [...(item.specialisations_ms || []), ...(item.specialisations_os || []), ...(item.priorité || [])];

  return specs.some((spec) => SPEC_TO_ROLE[spec] === selectedRole);
}
