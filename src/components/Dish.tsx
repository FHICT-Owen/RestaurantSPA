import { IDish } from "../types";
import "./Dish.css";

export default function Dish(props: IDish) {
  var imageStyle = {
    background: `url("data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(props.image)))}")`,
  }

	return (
		<li key={props.id} onClick={() => console.log()/*open dialog*/}>
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
