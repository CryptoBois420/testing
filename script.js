const openai = require('@openai/api');
const chatbot = new openai.Completion({
  apiKey: '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',
});

const messageList = document.getElementById('message-list');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

async function sendMessage() {
  const userMessage = userInput.value;
  addMessage('user', userMessage);
  userInput.value = '';
  
  const botMessage = await getBotMessage(userMessage);
  addMessage('bot', botMessage);
}

async function getBotMessage(userMessage) {
  const response = await chatbot.complete({
    engine: 'davinci',
    prompt: `Nova Varos chatbot: ${userMessage}`,
    maxTokens: 150,
    n: 1,
    stop: '\n',
  });
  return response.choices[0].text.trim();
}

function addMessage(sender, message) {
  const li = document.createElement('li');
  li.classList.add(`${sender}-message`);
  li.textContent = message;
  
  const clear = document.createElement('div');
  clear.classList.add('clear');
  
  messageList.appendChild(li);
  messageList.appendChild(clear);
  
  messageList.scrollTop = messageList.scrollHeight;
}