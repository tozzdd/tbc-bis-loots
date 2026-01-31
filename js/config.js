const DATA_SOURCE = "JSON/json_master.json";

const RAID_GROUPS = [
  {
    id: "ALL",
    label: "Tous les raids",
    filter: () => true
  },
  {
    id: "karazhan",
    label: "[P1] Karazhan",
    filter: (item) => item.raid === "Karazhan"
  },
  {
    id: "gruul",
    label: "[P1] Repaire de Gruul",
    filter: (item) => item.raid === "Repaire de Gruul"
  },
  {
    id: "magtheridon",
    label: "[P1] Magtheridon",
    filter: (item) => item.raid === "Magtheridon"
  },
  {
    id: "worldboss",
    label: "[P1] World Boss",
    filter: (item) => item.raid === "World Boss"
  },
  {
    id: "ssc",
    label: "[P2] Caverne du sanctuaire du Serpent",
    filter: (item) => item.raid === "Caverne du sanctuaire du Serpent"
  },
  {
    id: "tk",
    label: "[P2] L’Œil",
    filter: (item) => item.raid === "L’Œil"
  },
  {
    id: "hyjal",
    label: "[P3] Mont Hyjal",
    filter: (item) => item.raid === "Mont Hyjal"
  },
  {
    id: "bt",
    label: "[P3] Temple noir",
    filter: (item) => item.raid === "Temple noir"
  },
  {
    id: "za",
    label: "[P4] Zul'Aman",
    filter: (item) => item.raid === "Zul'Aman"
  },
  {
    id: "swp",
    label: "[P5] Plateau du Puits de soleil",
    filter: (item) => item.raid === "Plateau du Puits de soleil"
  },

  // Tiers
  {
    id: "t4",
    label: "[P1] Set T4",
    filter: (item) => item.raid === "T4"
  },
  {
    id: "t5",
    label: "[P2] Set T5",
    filter: (item) => item.raid === "T5"
  },
  {
    id: "t6",
    label: "[P3] Set T6",
    filter: (item) => item.raid === "T6"
  }
];
