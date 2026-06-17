// 物件情報を表示するカードコンポーネント
function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-badge">賃貸</span>
      </div>
      <div className="property-card-body">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-area">📍 {property.area}</p>
        <p className="property-rent">
          <span className="rent-amount">¥{property.rent.toLocaleString()}</span>
          <span className="rent-unit"> / 月</span>
        </p>
      </div>
    </div>
  )
}

export default PropertyCard
