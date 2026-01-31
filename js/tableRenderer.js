function getPriority(item) {
  if (!Array.isArray(item.priorité)) return "";
  return item.priorité.join(", ");
}

function wowhead(id, label) {
  if (!id) return label || "";
  return `<a href="https://www.wowhead.com/tbc/fr/item=${id}" data-wowhead="item=${id}">${label}</a>`;
}

/* Helpers visuels */
const SPEC_CLASS_MAP = {
  // Paladin
  HPal: "wow-paladin",
  PPal: "wow-paladin",
  Ret: "wow-paladin",

  // Warrior
  PWar: "wow-warrior",
  Fury: "wow-warrior",
  Arms: "wow-warrior",

  // Druid
  RDru: "wow-druid",
  Boomy: "wow-druid",
  Cat: "wow-druid",
  Bear: "wow-druid",

  // Shaman
  RSha: "wow-shaman",
  Ele: "wow-shaman",
  Enh: "wow-shaman",
  RSham: "wow-shaman",

  // Priest
  HPri: "wow-priest",
  SPri: "wow-priest",

  // Rogue / Hunter / Mage / Lock
  Rogue: "wow-rogue",
  Hunt: "wow-hunter",
  Hunter: "wow-hunter",
  Mage: "wow-mage",
  Lock: "wow-warlock"
};
function renderPriorityCell(priorities) {
  if (!Array.isArray(priorities) || priorities.length === 0) {
    return "";
  }

  return priorities
    .map((term) => {
      const cssClass = SPEC_CLASS_MAP[term];
      if (cssClass) {
        return `<span class="${cssClass}">${term}</span>`;
      }
      // Terme global (DPS, Heal, DPS Caster, etc.) → pas de couleur
      return `<span>${term}</span>`;
    })
    .join(" > ");
}

function getBisClass(bis) {
  if (!bis) return "";

  const value = bis.toUpperCase().trim();

  switch (value) {
    case "BP1":
      return "rarity-bp rarity-common";
    case "BP2":
      return "rarity-bp rarity-uncommon";
    case "BP3":
      return "rarity-bp rarity-rare";
    case "BP4":
      return "rarity-bp rarity-epic";
    case "BP5":
      return "rarity-bp rarity-legendary";
    default:
      return "rarity-bp";
  }
}

function renderTable() {
  const tbody = document.getElementById("lootBody");
  const { boss, bis, slot, selectedClass, selectedRole } = filterState;

  let html = "";
  let lastBoss = null;

  currentData
    .filter((item) => {
      if (boss && item.boss !== boss) return false;
      if (bis && item.bis !== bis) return false;
      if (slot && item.emplacement !== slot) return false;
      if (!itemMatchesClass(item, selectedClass)) return false;
      if (!itemMatchesRole(item, selectedRole)) return false;
      return true;
    })
    .forEach((i) => {
      const specsMS = i.specialisations_ms || [];
      const specsOS = i.specialisations_os || [];

      if (i.boss && i.boss !== lastBoss) {
        html += `
          <tr class="boss-title">
            <td colspan="9">${i.boss}</td>
          </tr>`;
        lastBoss = i.boss;
      }

      html += `
        <tr>
          <td>${wowhead(i.id, i.nom)}</td>
          <td>${i.emplacement || ""}</td>
          <td>${i.matière || ""}</td>
          <td class="spec-ms">${specsMS.length ? specsMS.join(", ") : "-"}</td>
          <td class="spec-os">${specsOS.length ? specsOS.join(", ") : "-"}</td>
          <td>${renderPriorityCell(i.priorité)}</td>
          <td class="${getBisClass(i.bis)}">${i.bis || ""}</td>
          <td>${i.tokenId ? wowhead(i.tokenId, i.token) : ""}</td>
          <td>${i.notes || ""}</td>
        </tr>`;
    });

  // 🔥 DOM touché UNE SEULE FOIS
  tbody.innerHTML = html;

  // 🔥 Wowhead UNE SEULE FOIS sur DOM stable
  refreshTooltips();
}
