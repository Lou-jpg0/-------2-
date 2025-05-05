// 初始化 GUN
const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

// 聊天相關的 DOM 元素
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('username');

// 保存使用者名稱到 localStorage
let username = localStorage.getItem('chatUsername') || '';
usernameInput.value = username;
usernameInput.addEventListener('change', (e) => {
    username = e.target.value;
    localStorage.setItem('chatUsername', username);
});

// 建立訊息元素
function createMessageElement(message, isSent) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    const usernameDiv = document.createElement('div');
    usernameDiv.className = 'username';
    usernameDiv.textContent = message.username;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.textContent = message.content;
    
    messageDiv.appendChild(usernameDiv);
    messageDiv.appendChild(contentDiv);
    return messageDiv;
}

// 傳送訊息
function sendMessage() {
    if (!messageInput.value.trim() || !username.trim()) return;
    
    const message = {
        username: username,
        content: messageInput.value.trim(),
        timestamp: Date.now()
    };
    
    gun.get('chat').get(message.timestamp).put(message);
    messageInput.value = '';
}

// 監聽傳送按鈕
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// 接收訊息
gun.get('chat').map().on(function(message, id) {
    if (!message || !message.content || document.getElementById(id)) return;
    
    const isSent = message.username === username;
    const messageElement = createMessageElement(message, isSent);
    messageElement.id = id;
    
    // 按時間順序插入訊息
    let inserted = false;
    Array.from(messagesDiv.children).some(child => {
        if (id < child.id) {
            messagesDiv.insertBefore(messageElement, child);
            inserted = true;
            return true;
        }
        return false;
    });
    
    if (!inserted) {
        messagesDiv.appendChild(messageElement);
    }
    
    // 滾動到最新訊息
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});