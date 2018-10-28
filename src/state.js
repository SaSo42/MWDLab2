import HashMap from "hashmap";

export const DialogTypes = Object.freeze({
    STD_UI:   Symbol("STD_UI"),
    ADD_PERSON:  Symbol("ADD_PERSON"),
    ADD_TASK: Symbol("ADD_TASK"),
    LOADING_PAGE: Symbol("LOADING_PAGE")
});

const tempPersons = [{name : 'Quill'}, {name : 'Rocket'}, {name : 'Groot'}, {name : 'Gomorra'}, {name : 'Gomorra-Sis'}, {name : 'Jondu'}];
const tempTasks = [{name : 'clean dishes'}, {name : 'fetch fuel'}, {name : 'sort arsenal'}, {name : 'maintain engine'}, {name : 'clean hull'}];

function tempTable() {
    const hashMap = new HashMap();
    const lengthI = tempPersons.length;
    const lengthJ = tempTasks.length;
    let i = 0, j = 0;

    while (j < lengthJ){
        i = 0;
        while (i < lengthI){
            hashMap.set(tempPersons[i].name + tempTasks[j].name, 0);
            i++;
        }
        j++;
    }

    return hashMap;
}

export const initialState = {
    butterflyTable : {
        valueTable : tempTable(),
        persons : tempPersons,
        tasks : tempTasks
    },
    dialogType : DialogTypes.STD_UI,
    inputName : "",
    warning: "",
    triggerStdUIUpdate : true
};