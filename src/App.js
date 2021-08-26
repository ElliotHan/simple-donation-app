import React, { useState } from 'react';
import './App.scss';
import DonatePage from './pages/DonatePage';
import SendMessagePage from './pages/SendMessagePage';

function App() {
  const [showSendMessagePage, setShowSendMessagePage] = useState(false)

  return (
    <div className="App">
      <header onClick={() => setShowSendMessagePage(!showSendMessagePage)}>
        {showSendMessagePage ? '후원 KLAY 보내기' : '후원 메시지 보내기'}
      </header>
      <main>
        {showSendMessagePage ?
          <SendMessagePage /> :
          <DonatePage />
        }
      </main>
    </div>
  );
}

export default App;
