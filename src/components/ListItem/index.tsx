import * as C from './styles'
import {Item} from "../../types/Item";

type Props = {
    item: Item,
    onChange: (id: number, done: boolean) => void,
    onDelete: (id: number) => void
}

export const ListItem = ({item, onChange, onDelete}: Props) => {
    return (
        <C.Container done={item.done}>
            <div className="wrapper">
                <input type={"checkbox"} checked={item.done}
                       onChange={e => onChange(item.id, e.target.checked)}/>
                <label>{item.name}</label>
            </div>
            <span onClick={() => onDelete(item.id)}>❌</span>
        </C.Container>
    )
}
