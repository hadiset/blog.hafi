const menuButton = document.querySelector('#mobile-menu-button button');

menuButton?.addEventListener('click', () => {
  const open = document.getElementById('mobile-menu')?.classList.toggle('hidden') === false;
  menuButton.setAttribute('aria-expanded', String(open));
  document.getElementById('open-menu-button')?.classList.toggle('hidden', open);
  document.getElementById('close-menu-button')?.classList.toggle('hidden', !open);
});
