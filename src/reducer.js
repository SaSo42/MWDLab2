import {
    CHANGE_TO_ADD_PERSON_VIEW,
    CHANGE_TO_ADD_TASK_VIEW, CHANGE_TO_LOADING_VIEW,
    CHANGE_TO_STD_UI_VIEW,
    CHANGE_TO_STD_UI_VIEW_UPDATE,
    CREATE_PERSON,
    CREATE_TASK,
    DELETE_PERSON,
    DELETE_TASK,
    INPUT_RECEIVE,
    SAVE_KEY_VALUE_TO_DB
} from "./Actions/ActionTypes";
import {DialogTypes, initialState} from "./state";

function reducer(state = initialState, action){
    console.log("action.type : " + action.type);
    switch (action.type) {
        case SAVE_KEY_VALUE_TO_DB:{
            //console.log("action:" + action);
            //console.log(action);
            //console.log("state:" + state);
            //console.log(state);
            const persons = state.butterflyTable.persons;
            const tasks = state.butterflyTable.tasks;
            const indexPerson = action.payload.indexPerson;
            //console.log("indexPerson:" + indexPerson);
            const indexTask = action.payload.indexTask;
            //console.log("indexTask:" + indexTask);
            const key = persons[indexPerson].name + tasks[indexTask].name;
            const newVal = state.butterflyTable.valueTable.get(key) + 1;

            if(newVal === undefined){
                return state;
            }

            //console.log("state.butterflyTable.valueTable.get(key).toString(): " + state.butterflyTable.valueTable.get(key).toString());
            state.butterflyTable.valueTable.set(key, newVal);
            //console.log("PO: state.butterflyTable.valueTable.get(key).toString(): " + state.butterflyTable.valueTable.get(key).toString());

            return {...state, triggerStdUIUpdate: !state.triggerStdUIUpdate};
        }

        case CHANGE_TO_ADD_PERSON_VIEW:{
            return {...state, dialogType : DialogTypes.ADD_PERSON};
        }

        case CHANGE_TO_ADD_TASK_VIEW:{
            return {...state, dialogType : DialogTypes.ADD_TASK};
        }

        case CHANGE_TO_STD_UI_VIEW:{
            return {...state, dialogType : DialogTypes.STD_UI, inputName: initialState.inputName};
        }

        case CHANGE_TO_STD_UI_VIEW_UPDATE:{
            const newButterflyTable = {
                persons : action.payload.persons,
                tasks : action.payload.tasks,
                valueTable : action.payload.hasMap
            };
            const newSate = {...state, dialogType : DialogTypes.STD_UI, inputName: initialState.inputName, butterflyTable : newButterflyTable};

            //console.log("new State in update UI: ");
            //console.log(newSate);

            return newSate
        }

        case CHANGE_TO_LOADING_VIEW:{
            return {...state, dialogType : DialogTypes.LOADING_PAGE, inputName: initialState.inputName};
        }

        case INPUT_RECEIVE:{
            //console.log(action.payload);
            const newInput = action.payload.toString();

            return {...state, inputName: newInput}
        }

        case CREATE_TASK:{
            const hashMap = state.butterflyTable.valueTable;
            const newTask = {name : state.inputName};
            const persons = state.butterflyTable.persons;
            const length = persons.length;
            let i = 0;

            state.butterflyTable.tasks.push(newTask);

            while(i < length){
                hashMap.set(persons[i].name + newTask.name, 0);
                i++;
            }

            return {...state, dialogType : DialogTypes.STD_UI, inputName: initialState.inputName}
        }

        case CREATE_PERSON:{
            const hashMap = state.butterflyTable.valueTable;
            const newPerson = {name : state.inputName};
            const tasks = state.butterflyTable.tasks;
            const length = tasks.length;
            let i = 0;

            state.butterflyTable.persons.push(newPerson);

            while(i < length){
                hashMap.set(newPerson.name + tasks[i].name, 0);
                i++;
            }

            return {...state, dialogType : DialogTypes.STD_UI, inputName: initialState.inputName}
        }

        case DELETE_TASK:{
            const hashMap = state.butterflyTable.valueTable;
            const index = action.payload;
            const tasks = state.butterflyTable.tasks;
            const oldTask = tasks[index];
            const persons = state.butterflyTable.persons;
            const length = persons.length;
            let i = 0;

            tasks.splice(index, 1);

            while(i < length){
                hashMap.delete(persons[i].name + oldTask.name);
                i++;
            }

            return {...state, triggerStdUIUpdate: !state.triggerStdUIUpdate};
        }

        case DELETE_PERSON:{
            const hashMap = state.butterflyTable.valueTable;
            const index = action.payload;
            const persons = state.butterflyTable.persons;
            const oldPerson = persons[index];
            const tasks = state.butterflyTable.tasks;
            const length = tasks.length;
            let i = 0;

            persons.splice(index, 1);

            while(i < length){
                hashMap.delete(oldPerson.name + tasks[i].name);
                i++;
            }

            return {...state, triggerStdUIUpdate: !state.triggerStdUIUpdate};
        }

        default:
            return state;
    }
}

export default reducer;

/*
* ports.toEntries.subscribe(async (request) => {
    async function listWithoutIds() {
        const addresses = await store.list()
        return addresses.map(({id, ...item}) => [id, item])
    }

    const {fromEntries} = ports
    const [action, {id, entry, entries}] = request
    switch (action) {
        case "LIST": {
            const addresses = await listWithoutIds()
            fromEntries.send(addresses)
            break
        }
        case "ADD": {
            await store.add(entry)
            const addresses = await listWithoutIds()
            fromEntries.send(addresses)
            break
        }
        case "UPDATE": {
            await store.update(id, entry)
            const addresses = await listWithoutIds()
            fromEntries.send(addresses)
            break
        }
        case "REMOVE": {
            await store.remove(id)
            const addresses = await listWithoutIds()
            fromEntries.send(addresses)
            break
        }
    }
})
*/