// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/ProtectedRoute';
// import Register from './pages/auth/register';
// import Wallet from './pages/dashboard/Wallet';
// import Login from './pages/auth/login';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard/wallet" element={<Wallet />}/>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/auth/register';
import Wallet from './pages/dashboard/Wallet';
import FundWallet from './pages/dashboard/FundWallet';
import Transfer from './pages/dashboard/Transfer';
import Login from './pages/auth/login';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fund-wallet"
            element={
              <ProtectedRoute>
                <FundWallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;