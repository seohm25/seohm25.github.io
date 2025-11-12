
  const img = document.getElementById('toggleImage');
  const text = document.getElementById('toggleText');
  
  img.addEventListener('click', () => {
    text.style.display = text.style.display === 'none' ? 'block' : 'none';
  });