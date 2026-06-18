import { useState } from 'react'

// 物件の新規登録・編集を行うモーダルフォームコンポーネント
function PropertyForm({ initialData, onSubmit, onCancel, isSubmitting, error }) {
  // 編集時は既存データを初期値にセット、新規時は空文字
  const [formData, setFormData] = useState({
    name:       initialData?.name       ?? '',
    rent:       initialData?.rent       ?? '',
    area:       initialData?.area       ?? '',
    floor_plan: initialData?.floor_plan ?? '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // rentは数値に変換して渡す
    onSubmit({ ...formData, rent: Number(formData.rent) })
  }

  const isEdit = !!initialData

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* クリックがモーダル内に伝播しないよう止める */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{isEdit ? '物件を編集' : '物件を登録'}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label htmlFor="name">物件名</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="例：渋谷マンション 101号室"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rent">家賃（円）</label>
            <input
              id="rent"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
              placeholder="例：150000"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">エリア名</label>
            <input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="例：東京都渋谷区"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="floor_plan">間取り</label>
            <input
              id="floor_plan"
              name="floor_plan"
              value={formData.floor_plan}
              onChange={handleChange}
              placeholder="例：1LDK"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
