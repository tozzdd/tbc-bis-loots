/* ============================================================
   Récupération des filtres actifs (UI)
============================================================ */

function getActiveFilters() {
  const bossEl = document.getElementById("bossSelect");
  const bisEl = document.getElementById("bisFilter");
  const slotEl = document.getElementById("slotSelect");
  const classEl = document.getElementById("classSelect");
  const roleEl = document.getElementById("roleSelect");

  return {
    boss: bossEl && bossEl.value ? bossEl.value.trim() : "",
    bis: bisEl && bisEl.value ? bisEl.value.trim() : "",
    slot: slotEl && slotEl.value ? slotEl.value.trim() : "",
    selectedClass: classEl && classEl.value ? classEl.value.trim() : "",
    selectedRole: roleEl && roleEl.value ? roleEl.value.trim() : ""
  };
}

/* ============================================================
   Reset des filtres (appelé au changement de raid)
============================================================ */

function resetFilters() {
  const bossSelect = document.getElementById("bossSelect");
  const bisFilter = document.getElementById("bisFilter");
  const slotSelect = document.getElementById("slotSelect");
  const classSelect = document.getElementById("classSelect");
  const roleSelect = document.getElementById("roleSelect");

  if (bossSelect) bossSelect.value = "";
  if (bisFilter) bisFilter.value = "";
  if (slotSelect) slotSelect.value = "";
  if (classSelect) classSelect.value = "";
  if (roleSelect) roleSelect.value = "";
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
   Mapping Spé → Classe
============================================================ */

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

  const specs = [...(item.spécialisations || []), ...(item.priorité || [])];

  return specs.some((spec) => SPEC_TO_CLASS[spec] === selectedClass);
}

function itemMatchesRole(item, selectedRole) {
  if (!selectedRole) return true;

  const specs = [...(item.spécialisations || []), ...(item.priorité || [])];

  return specs.some((spec) => SPEC_TO_ROLE[spec] === selectedRole);
}
