document.addEventListener('DOMContentLoaded', () => {
  // Форма для отправки сообщения
  const form = document.getElementById('message-form');
  const usernameInput = document.getElementById('username');
  const messageInput = document.getElementById('message');
  const feed = document.getElementById('feed');

  // Загрузка сообщений из базы данных при загрузке страницы
  async function loadMessages() {
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messages = await response.json();

      // Добавляем каждое сообщение в ленту
      messages.forEach(message => addMessageToFeed(message));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  // Функция для добавления сообщения в ленту
  function addMessageToFeed(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
      <p><strong>${message.username}</strong>: ${message.text}</p>
      <small>${new Date(message.date).toLocaleString()}</small>
    `;
    feed.appendChild(messageElement);
  }

  // Обработчик отправки сообщения
  form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Останавливаем перезагрузку страницы при отправке формы

    const username = usernameInput.value.trim();
    const messageText = messageInput.value.trim();

    if (messageText) {
      try {
        // Если имя не введено, генерируем случайное имя
        const usernameToSend = username || `User${Math.floor(Math.random() * 1000)}`;

        // Отправка сообщения на сервер
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: usernameToSend, text: messageText }),
        });

        if (!response.ok) {
          throw new Error('Failed to post message');
        }

        const newMessage = await response.json();
        addMessageToFeed(newMessage);

        // Очистить поле ввода
        messageInput.value = '';
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  });

  // Загружаем сообщения при загрузке страницы
  loadMessages();
});
