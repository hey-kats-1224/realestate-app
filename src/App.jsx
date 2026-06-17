import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ログイン画面 */}
          <Route path="/login" element={<Login />} />
          {/* 会員登録画面 */}
          <Route path="/register" element={<Register />} />
          {/* 物件一覧（認証済みユーザーのみアクセス可能） */}
          <Route
            path="/properties"
            element={
              <PrivateRoute>
                <Properties />
              </PrivateRoute>
            }
          />
          {/* その他のパスはログイン画面へリダイレクト */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
