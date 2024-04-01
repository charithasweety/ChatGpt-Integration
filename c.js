const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Create WebSocket connection
const socket = new WebSocket('ws://localhost:3000'); // Replace with your WebSocket server address

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('WebSocket connection established');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    appendMessage(event.data, false);
});

// Function to send message to server
function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage(message, true);
        socket.send(message);
        userInput.value = '';
    }
}

// Function to append message to chat box
function appendMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'bot-message';
    messageElement.textContent = isUser ? `You: ${message}` : `Bot: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
