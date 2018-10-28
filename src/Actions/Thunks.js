import {SAVE_KEY_VALUE_TO_DB} from "./ActionTypes";
import {
    changeToLoadingView,
    changeToStdUIView, changeToStdUIViewUpdate, createPerson, createTask, removePerson, removeTask,
    saveKeyValueToDB,
    saveKeyValueToDBFetchDataSuccess,
    saveKeyValueToDBHasError,
    saveKeyValueToDBIsLoading
} from "./Actions";
import AddressStore from "../storage";
import HashMap from "hashmap";

const addressStore = new AddressStore();

export function saveKeyValueToDBThunk(indexPerson, indexTask) {
    return (dispatch, getState) => {
        console.log(getState);
        const butterflyTable = getState().butterflyTable;
        const hashMap = butterflyTable.valueTable;
        const person = butterflyTable.persons[indexPerson];
        const task = butterflyTable.tasks[indexTask];
        const key = person.name + task.name;

        dispatch(saveKeyValueToDB(indexPerson, indexTask));     //only called "to DB" but does only alter the state

        addressStore.add(key, [hashMap.get(key)])
            .catch(() => addressStore.update(key, [hashMap.get(key)]))
    };
}

export function updateFromDB() {
    return (dispatch) => {
        let persons = [];
        let tasks = [];
        const hashMap = new HashMap();

        dispatch(changeToLoadingView());

        const persons2 = addressStore.get('persons')
            .then(response => {
                //persons = response;
                //console.log(response);

                if(response !== undefined) {
                    for (let i in response) {
                        if(i != 'id'){
                            persons.push(response[i]);
                        }
                    }
                }

                //console.log(persons);

                return addressStore.get('tasks');
            })
            .then(response => {
                //console.log("Laber");
                //console.log(response);
                if(response !== undefined) {
                    for (let i in response) {
                        if (i != 'id') {
                            tasks.push(response[i]);
                        }
                        //console.log("BLUBB");
                        //console.log(i)
                    }
                }

                //console.log(tasks);
                //console.log(persons);

                for (let person of persons){
                    for (let task of tasks){
                        const key = person.name + task.name;
                        let temp = addressStore.get(key).then(result => {
                            const val = (result === null || result === undefined || result[0] === undefined) ? 0 : result[0];
                            hashMap.set(key, val);
                            //console.log("key: ");
                            //console.log(key);
                            //console.log("val: ");
                            //console.log(val);
                            //console.log("result map: ");
                            //console.log(result);
                            //console.log("persons "+ person.name+ ' tasks ' + task.name);

                            dispatch(changeToStdUIViewUpdate(hashMap, persons, tasks));
                        });
                    }
                }
            })
            .then(() => dispatch(changeToStdUIViewUpdate(hashMap, persons, tasks)))
    };
}

export function updateFromDB2() {
    return (dispatch) => {
        let persons = [];
        let tasks = [];
        const hashMap = new HashMap();

        dispatch(changeToLoadingView());

        addressStore.get('persons')
            .then(response => {
                persons = response.result.name;
                //console.log('response.length: '+persons.length);
                return addressStore.get('tasks');
            })

            .then(response => {
                let i = 0;
                let j = 0;
                const lengthP = persons.length;
                const lengthT = response.result.name.length;

                tasks = response;

                while(i < lengthP){
                    j = 0;
                    while (j < lengthT){
                        const key = persons[i] + tasks[j];
                        addressStore.get(key).then(result => {
                            hashMap.set(key, result);
                        });
                        j++;
                    }
                    i++;
                }
            })
            .then(dispatch(changeToStdUIViewUpdate(hashMap, persons, tasks)))

        /*console.log('persons');
        console.log(persons);
        console.log('tasks');
        console.log(tasks);*/
    };
}


export function createPersonThunk() {
    return (dispatch, getState) => {
        //console.log(getState);
        const butterflyTable = getState().butterflyTable;
        const persons = butterflyTable.persons;
        const tasks = butterflyTable.tasks;

        dispatch(createPerson());

        addressStore.update('persons', persons)
            .then(() => {
                const length = persons.length;
                let i = 0;

                while (i<length){
                    const newPerson = persons[persons.length - 1];
                    const key = newPerson.name + tasks[i].name;

                    addressStore.update(key, [0])
                        .catch(() => addressStore.add(key, [0]));

                    i++;
                }
            })
            .catch(() => {
                addressStore.add('persons', persons)
                    .then(() => {
                        const length = persons.length;
                        let i = 0;

                        while (i<length){
                            const newPerson = persons[persons.length - 1];
                            const key = newPerson.name + tasks[i].name;

                            addressStore.update(key, [0])
                                .catch(() => addressStore.add(key, [0]));

                            i++;
                        }
                    })
            })
    };
}

export function createTaskThunk() {
    return (dispatch, getState) => {
        //console.log(getState);
        const butterflyTable = getState().butterflyTable;
        const tasks = butterflyTable.tasks;
        const persons = butterflyTable.persons;

        //console.log("vor action: " + tasks.length);
        dispatch(createTask());
        //console.log("nach action: " + tasks.length);

        addressStore.update('tasks', tasks)
            .then(() => {
                const length = persons.length;
                let i = 0;

                while (i<length){
                    const newTask = tasks[tasks.length - 1];
                    const key = persons[i].name + newTask.name;

                    addressStore.update(key, [0])
                        .catch(() => addressStore.add(key, [0]));

                    i++;
                }
            })
            .catch(() => {
                //console.log("Failed");
                addressStore.add('tasks', tasks)
                    .then(() => {
                        const length = persons.length;
                        let i = 0;

                        while (i<length){
                            const newTask = tasks[tasks.length - 1];
                            const key = persons[i].name + newTask.name;

                            addressStore.update(key, [0])
                                .catch(() => addressStore.add(key, [0]));

                            i++;
                        }
                    })
            })
    };
}

export function removePersonThunk(index) {
    return (dispatch, getState) => {
        console.log(getState);
        const butterflyTable = getState().butterflyTable;
        const persons = butterflyTable.persons;
        const tasks = butterflyTable.tasks;

        dispatch(removePerson(index));

        addressStore.update('persons', persons)
            .then(() => {
                const length = persons.length;
                let i = 0;

                while (i<length){
                    const newPerson = persons[index];
                    const key = newPerson.name + tasks[i].name;

                    addressStore.remove(key);

                    i++;
                }
            })
            .catch(() => {
                addressStore.add('persons', persons)
                    .then(() => {
                        const length = persons.length;
                        let i = 0;

                        while (i<length){
                            const newPerson = persons[index];
                            const key = newPerson.name + tasks[i].name;

                            addressStore.remove(key);

                            i++;
                        }
                    })
            })
    };
}

export function removeTaskThunk(index) {
    return (dispatch, getState) => {
        console.log(getState);
        const butterflyTable = getState().butterflyTable;
        const tasks = butterflyTable.tasks;
        const persons = butterflyTable.persons;

        dispatch(removeTask(index));

        addressStore.update('tasks', tasks)
            .then(() => {
                const length = persons.length;
                let i = 0;

                while (i<length){
                    const newTask = tasks[index];
                    const key = persons[i].name + newTask.name;

                    addressStore.remove(key);

                    i++;
                }
            })
            .catch(() => {
                addressStore.add('tasks', tasks)
                    .then(() => {
                        const length = persons.length;
                        let i = 0;

                        while (i<length){
                            const newTask = tasks[index];
                            const key = persons[i].name + newTask.name;

                            addressStore.remove(key);

                            i++;
                        }
                    })
            })
    };
}