// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
// //       <h1 className="text-5xl font-bold text-white">🚀 Tailwind is Working!</h1>
// //     </div>
// //   )
// // }

// // export default App

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

import React from 'react';
import LandingPage from './pages/LandingPage';
import GlobalStyles from './components/ui/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <LandingPage />
    </>
  );
}

export default App;

