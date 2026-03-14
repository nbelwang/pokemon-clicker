export default function ItemCard(props){
    return (
        <div>
            <h2>{props.itemName}</h2>
            <p>{props.itemMult}</p>
            <img src={props.itemSprite} alt={props.itemName}></img>
            <p>{props.itemCost}</p>
        </div>
    )
}