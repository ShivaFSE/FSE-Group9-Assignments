import './Restaurants.css';

function RestaurantTile(props) {
  return (
    <div className="menu__container bd-grid">
        <div className="menu__content">
            <img src={props.logo} alt="" className="menu__img" />
            <h3 className="menu__name">{props.name}</h3>
            <span className="menu__detail">{props.timings}</span>
            <span className="menu__preci">{props.description}</span>
        </div>
      </div>
  );
}

export default RestaurantTile;
