// 物件情報を表示するカードコンポーネント（編集・削除ボタン付き）
function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-badge">賃貸</span>
        <span className="property-floor-plan">{property.floor_plan}</span>
      </div>
      <div className="property-card-body">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-area">📍 {property.area}</p>
        <p className="property-rent">
          <span className="rent-amount">¥{property.rent.toLocaleString()}</span>
          <span className="rent-unit"> / 月</span>
        </p>
      </div>
      <div className="property-card-footer">
        <button className="btn-edit" onClick={() => onEdit(property)}>
          編集
        </button>
        <button className="btn-delete" onClick={() => onDelete(property.id)}>
          削除
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
