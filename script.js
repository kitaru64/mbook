const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const lenta = document.getElementById('lenta');

function generateRandomName() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Четырёхзначное число
  return `User${randomNumber}`;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const messageText = messageInput.value.trim();
  const userName = nameInput.value.trim() || generateRandomName(); // Используем имя или генерируем ник

  if (messageText) {
    const messageBlock = document.createElement('div');
    messageBlock.className = 'lenta__block';
    messageBlock.innerHTML = `
      <div class="block__top_info">
        <h2 class="block__name">${userName}</h2>
        <h3 class="block__data">${new Date().toLocaleDateString()}</h3>
      </div>
      <p class="block__text">${messageText}</p>
    `;

    lenta.appendChild(messageBlock);

    lenta.scrollTop = lenta.scrollHeight;

    nameInput.value = '';
    messageInput.value = '';
  }
});
