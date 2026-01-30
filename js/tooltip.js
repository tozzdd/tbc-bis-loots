window.whTooltips = {
  colorLinks: true,
  iconizeLinks: true,
  renameLinks: false,
  locale: "fr_FR"
};

function refreshTooltips() {
  if (window.$WowheadPower) {
    $WowheadPower.refreshLinks();
  }
}
