(function () {
  'use strict';

  function openCustomBuilder() {
    const root = document.querySelector('[data-meeting-builder]');
    if (!root) return;

    const custom = root.querySelector('.builder-custom');

    if (custom) {
      custom.open = true;
    }

    root.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function openResources() {
    const drawer = document.querySelector('.master-resource-drawer');

    if (!drawer) return;

    drawer.open = true;

    drawer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  document.addEventListener('click', function (event) {
    const custom = event.target.closest('[data-open-custom]');

    if (custom) {
      event.preventDefault();
      openCustomBuilder();
      return;
    }

    const resources = event.target.closest('[data-open-resources]');

    if (resources) {
      event.preventDefault();
      openResources();
    }
  });
})();
