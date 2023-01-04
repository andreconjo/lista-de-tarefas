import * as C from './App.styles'
import {useEffect, useState} from "react";
import {Item} from "./types/Item";
import {ListItem} from "./components/ListItem";
import {AddArea} from "./components/AddArea";
import {Footer} from "./components/Footer";
import {format} from 'date-fns'

const App = () => {

    const [list, setList] = useState<Item[]>([]);
    const [allowToSave, setAllowToSave] = useState<boolean>(false);

    const handleAddTask = (taskName: string) => {
        let newList = [...list];
        newList.push({
            id: list.length + 1,
            name: taskName,
            done: false
        });

        setList(newList);
    }

    const handleCheckItem = (id: number, done: boolean) => {
        let newList = [...list];
        for (let i in newList) {
            if (newList[i].id === id) {
                newList[i].done = done;
            }
        }
        setList(newList);
    }

    const handleOnDelete = (id: number) => {
        let newList = [...list].filter(item => item.id !== id);
        setList(newList);
        save();
    }

    const getActualDate = () => {
        return format(new Date(), 'dd/MM/yyyy')
    }

    const save = () => {
        let data = {
            date: getActualDate(),
            list: [...list]
        }
        localStorage.setItem('mytodo', JSON.stringify({...data}))
    }

    const load = () => {
        let data = localStorage.getItem('mytodo')
        if (data) {
            let dataJson = JSON.parse(data)
            if (dataJson.date === getActualDate()) {
                setList(dataJson.list);
            }
        }

        setAllowToSave(true);
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (allowToSave)
            save();
    }, [list, allowToSave])


    return (
        <C.Container>
            <C.Area>
                <C.Header>TODO LIST - {format(new Date(), 'dd/MM/yyyy')}</C.Header>
                <AddArea onEnter={handleAddTask}/>
                {list.map((item, index) => (
                    <ListItem key={index} item={item}
                              onDelete={handleOnDelete}
                              onChange={handleCheckItem}/>
                )).reverse()}
            </C.Area>
            <Footer/>
        </C.Container>
    );
}

export default App;
