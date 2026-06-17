import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログインの場合はログイン画面にリダイレクトするガードコンポーネント
function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  // 認証状態の確認中はローディング表示
  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
