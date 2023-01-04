import * as C from './App.styles'
import {useEffect, useState} from "react";
import {Item} from "./types/Item";
import {ListItem} from "./components/ListItem";
import {AddArea} from "./components/AddArea";
import {Footer} from "./components/Footer";
import {format} from 'date-fns'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti'

const App = () => {

    const [list, setList] = useState<Item[]>([]);
    const [allowToSave, setAllowToSave] = useState<boolean>(false);
    const [showConffeti, setShowConffeti] = useState<boolean>(false);

    const handleAddTask = (taskName: string) => {
        let newList = [...list];
        newList.push({
            id: list.length + 1,
            name: taskName,
            done: false
        });
        toast.success("Task added with success!", {
            icon: "🚀",
        })
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
        checkIfAllChecked()
    }

    const checkIfAllChecked = () => {
        let allChecked = list.filter(item => !item.done).length === 0 && list.length > 0;
        setShowConffeti(allChecked)
        if(allChecked && allowToSave) {
            toast.success("🚀 Congratulations, you win! 🚀", {
                // position: 'top-center',
                autoClose: 999999999999999999,
                icon: ''
            })
        }

    }

    const handleOnDelete = (id: number) => {
        let newList = [...list].filter(item => item.id !== id);
        setList(newList);
        save();
        toast.success("Task removed with success!", {
            icon: "😬",
        })
    }

    const getActualDate = () => {
        return format(new Date(), 'dd/MM/yyyy')
    }

    const save = () => {
        console.log('saved')
        let data = {
            date: getActualDate(),
            list: [...list]
        }
        localStorage.setItem('mytodo', JSON.stringify({...data}))
    }

    const load = () => {
        console.log('loading')
        let data = localStorage.getItem('mytodo')
        if (data) {
            let dataJson = JSON.parse(data)
            if (dataJson.date === getActualDate()) {
                setList(dataJson.list);
            }
        }

        setAllowToSave(true);
        checkIfAllChecked()
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (allowToSave)
            save();
    }, [list, allowToSave])


    return (
        <>
            {showConffeti ? <Confetti /> : ''}
            <ToastContainer
            autoClose={1500}
            theme={'dark'}
            />
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
        </>
    );
}

export default App;
