import "./Dish.css";



// const Footer = () => <div style={footerStyle}>Discover unlimited possibilities</div>;

export default function Dish(props: any) {
  var imageStyle = {
  background: `url("data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(props.image)))}")`,
  };

	return (
		<li>
      <div className="food-card">
        <div className="menu-card">
            <div className="menu-image" style={imageStyle}></div>
            
              <div className="menu-title">
                <h5>{props.name}</h5>
              </div>
              <div className="description-frame">
                <p className="menu-description">{props.description}</p>
              </div>
              <div className="plus-icon"></div>
            </div>
        </div>
    </li>
	)
}
// {"data:image/png;base64," + props.image}
