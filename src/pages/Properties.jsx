import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { properties, loading, error, addProperty, updateProperty, deleteProperty } = useProperties()

  // フォームの表示状態とフォームエラー
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  // 新規登録フォームを開く
  const handleAddNew = () => {
    setEditingProperty(null)
    setFormError('')
    setIsFormOpen(true)
  }

  // 編集フォームを開く（対象物件のデータをセット）
  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormError('')
    setIsFormOpen(true)
  }

  // 削除ボタンの処理（確認ダイアログあり）
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除してもよいですか？')) return
    try {
      await deleteProperty(id)
    } catch (err) {
      alert('削除に失敗しました: ' + err.message)
    }
  }

  // フォームの送信処理（新規・更新を判定）
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setFormError('')
    try {
      if (editingProperty) {
        // 既存物件の更新
        await updateProperty(editingProperty.id, formData)
      } else {
        // 新規物件の登録（RLSポリシー用にuser_idを付与）
        await addProperty({ ...formData, user_id: user.id })
      }
      setIsFormOpen(false)
    } catch (err) {
      setFormError('保存に失敗しました: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
    setEditingProperty(null)
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

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="page-header">
          <div>
            <h2 className="page-title">物件一覧</h2>
            {!loading && (
              <p className="property-count">{properties.length}件の物件</p>
            )}
          </div>
          <button onClick={handleAddNew} className="btn-primary">
            ＋ 物件を登録
          </button>
        </div>

        {/* データ取得エラー */}
        {error && (
          <p className="error-message">データの取得に失敗しました: {error}</p>
        )}

        {/* ローディング */}
        {loading ? (
          <div className="loading-inline">読み込み中...</div>
        ) : properties.length === 0 ? (
          // 物件が0件の場合
          <div className="empty-state">
            <p>登録された物件がありません</p>
            <button onClick={handleAddNew} className="btn-primary">
              最初の物件を登録する
            </button>
          </div>
        ) : (
          // 物件カードの一覧
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* 登録・編集モーダル */}
      {isFormOpen && (
        <PropertyForm
          initialData={editingProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
          error={formError}
        />
      )}
    </div>
  )
}

export default Properties
