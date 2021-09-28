export default function Dish(props: any) {
	return (
		<li>
      <div className="container menu-card">
        <div className="menu-item">
          <div>
            <img className="menu-image" src={"data:image/png;base64," + props.image} alt="menu-item-1"/>
          </div>
          <div className="menu-text">
            <h5>{props.name}</h5>
            <p className="menu-description">{props.description}</p>
          </div>
        </div>
      </div>
    </li>
	)
}
