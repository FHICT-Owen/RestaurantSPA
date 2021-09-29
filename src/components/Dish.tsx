export default function Dish(props: any) {
	return (
		<li>
      <div className="container menu-card">
        <div className="menu-item">
          <div>
            <img className="menu-image" src={ "data:image/jpeg;base64," + btoa(String.fromCharCode(...new Uint8Array(props.image))) } alt="menu-item"/>
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
