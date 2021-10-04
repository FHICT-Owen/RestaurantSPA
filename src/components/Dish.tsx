import { IDish } from "../types";
import { convertNumberArrayToImageUrl } from "../utils";
import "./Dish.css";

export default function Dish(props: IDish) {
	return (
    <div className="food-card">
      <div className="menu-card">
          <div className="menu-image" style={{backgroundImage: convertNumberArrayToImageUrl(props.image)}}></div>
          <div className="menu-title">
            <h5>{props.name}</h5>
          </div>
          <div className="description-frame">
            <p className="menu-description">{props.description}</p>
          </div>
          <div className="plus-icon"></div>
      </div>
    </div>
	)
}
