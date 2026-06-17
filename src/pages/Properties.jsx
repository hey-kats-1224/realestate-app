import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PropertyCard from '../components/PropertyCard'

// ダミーの物件データ
const dummyProperties = [
  { id: 1, name: '渋谷マンション 101号室', rent: 150000, area: '東京都渋谷区' },
  { id: 2, name: '新宿アパート 203号室', rent: 95000, area: '東京都新宿区' },
  { id: 3, name: '品川レジデンス 305号室', rent: 180000, area: '東京都品川区' },
  { id: 4, name: '横浜ハイツ 502号室', rent: 120000, area: '神奈川県横浜市西区' },
  { id: 5, name: '大阪タワー 1001号室', rent: 200000, area: '大阪府大阪市北区' },
  { id: 6, name: '京都テラス 201号室', rent: 85000, area: '京都府京都市中京区' },
]

function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    // ログアウト後はログイン画面へ遷移
    navigate('/login')
  }

  return (
    <div className="properties-container">
      {/* ヘッダー */}
      <header className="header">
        <h1 className="header-title">不動産管理アプリ</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleSignOut} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      {/* 物件一覧 */}
      <main className="main-content">
        <h2 className="page-title">物件一覧</h2>
        <p className="property-count">{dummyProperties.length}件の物件</p>

        <div className="property-grid">
          {dummyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Properties
