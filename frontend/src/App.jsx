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



// import React from 'react';
// import LandingPage from './pages/LandingPage';
// import GlobalStyles from './components/ui/GlobalStyles';

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <LandingPage />
//     </>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import GlobalStyles from './components/ui/GlobalStyles.jsx';
// import { LandingPage } from './pages/LandingPage.jsx';
// import { AuthPage } from './pages/Auth/AuthPage.jsx';

// // Main App Component with state-based routing
// export default function App() {
//     const [page, setPage] = useState('landing'); // 'landing', 'login', 'signup'

//     const renderPage = () => {
//         switch (page) {
//             case 'login':
//                 return <AuthPage setPage={setPage} initialState='login' />;
//             case 'signup':
//                 return <AuthPage setPage={setPage} initialState='signup' />;
//             default:
//                 return <LandingPage setPage={setPage} />;
//         }
//     };

//     return (
//         <>
//             <GlobalStyles />
//             {renderPage()}
//         </>
//     );
// }


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/ui/GlobalStyles.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/Auth/AuthPage.jsx';

export default function App() {
    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
            </Routes>
        </>
    );
}


