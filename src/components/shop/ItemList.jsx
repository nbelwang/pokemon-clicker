import ItemCard from "./ItemCard";

export default function ItemList(props){

    return(
        <>
        <div>
            {Object.keys(props.data).map((key) => (
                <ItemCard
                    key={key}
                    itemName={props.data[key].name}
                    itemMult={props.data[key].mult}
                    itemCost={props.data[key].cost}
                    itemSprite={props.data[key].sprite}
                />
            ))}
        </div>
        </>
    )
}