import {
    CHANGE_TO_ADD_PERSON_VIEW,
    CHANGE_TO_ADD_TASK_VIEW, CHANGE_TO_LOADING_VIEW,
    CHANGE_TO_STD_UI_VIEW, CHANGE_TO_STD_UI_VIEW_UPDATE,
    CREATE_PERSON,
    CREATE_TASK,
    DELETE_PERSON,
    DELETE_TASK,
    INPUT_RECEIVE,
    SAVE_KEY_VALUE_TO_DB,
    SAVE_KEY_VALUE_TO_DB_FETCH_DATA_SUCCESS,
    SAVE_KEY_VALUE_TO_DB_HAS_ERROR,
    SAVE_KEY_VALUE_TO_DB_IS_LOADING
} from "./ActionTypes";

export function saveKeyValueToDB(indexPerson, indexTask) {
    return {
        type: SAVE_KEY_VALUE_TO_DB,
        payload: {
            indexPerson: indexPerson,
            indexTask: indexTask
        }
    };
}

export function saveKeyValueToDBHasError(){
    return {
        type: SAVE_KEY_VALUE_TO_DB_HAS_ERROR
    };
}

export function saveKeyValueToDBFetchDataSuccess(){
    return {
        type: SAVE_KEY_VALUE_TO_DB_FETCH_DATA_SUCCESS
    };
}

export function saveKeyValueToDBIsLoading(indexPerson, indexTask){
    return {
        type: SAVE_KEY_VALUE_TO_DB_IS_LOADING,
        payload: {indexPerson : indexPerson, indexTask : indexTask}
    };
}

export function changeToAddPersonView() {
    return {
        type: CHANGE_TO_ADD_PERSON_VIEW
    };
}

export function changeToAddTaskView() {
    return {
        type: CHANGE_TO_ADD_TASK_VIEW
    };
}

export function changeToStdUIView() {
    return {
        type: CHANGE_TO_STD_UI_VIEW
    };
}

export function changeToStdUIViewUpdate(hasMap, persons, tasks) {
    return {
        type: CHANGE_TO_STD_UI_VIEW_UPDATE,
        payload: {
            hasMap : hasMap,
            persons : persons,
            tasks :tasks
        }
    };
}

export function changeToLoadingView() {
    return {
        type: CHANGE_TO_LOADING_VIEW
    };
}

export function inputReceive(value) {
    return {
        type: INPUT_RECEIVE,
        payload: value
    };
}

export function createPerson() {
    return {
        type: CREATE_PERSON
    };
}

export function createTask() {
    return {
        type: CREATE_TASK
    };
}

export function removePerson(index) {
    return {
        type: DELETE_PERSON,
        payload: index
    };
}

export function removeTask(index) {
    return {
        type: DELETE_TASK,
        payload: index
    };
}