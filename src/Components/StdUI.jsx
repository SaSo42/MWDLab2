import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from "../store";
import {changeToAddPersonView, changeToAddTaskView} from "../Actions/Actions";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {removePersonThunk, removeTaskThunk, saveKeyValueToDBThunk, updateFromDB} from "../Actions/Thunks";

library.add(faTrashAlt);

@connect(({butterflyTable, triggerStdUIUpdate}) => ({butterflyTable : butterflyTable, triggerStdUIUpdate: triggerStdUIUpdate}))
export default class StdUI extends Component {
    constructor (props){
        super(props);
    }

    static abc(columns){
        return columns.map((person, index) =>
            <th key={index}>
                {person.name}
                <button onClick={() => store.dispatch(removePersonThunk(index))}><FontAwesomeIcon icon="trash-alt"/>
                </button>
            </th>);
    }

    static generateRows(butterflyTable){
        let tasks = (butterflyTable.tasks === undefined || butterflyTable.tasks === null) ? [] : butterflyTable.tasks;
        if(tasks === undefined){
            tasks = [];

        }
        console.log("Within UI: ");
        console.log(tasks);
        return tasks.map((task, index) =>
            <tr key={index}>
                <td><p>{task.name}</p>
                    <button onClick={() => store.dispatch(removeTaskThunk(index))}><FontAwesomeIcon icon="trash-alt"/>
                    </button>
                </td>
                {StdUI.generateRowData(butterflyTable, index)}
            </tr>);
    }

    static generateRowData(butterflyTable, indexTask){
        const valueTable = butterflyTable.valueTable;
        const persons = butterflyTable.persons;
        const tasks = butterflyTable.tasks;

        return persons.map((task, index) => {
            const tempVal = valueTable.get(persons[index].name + tasks[indexTask].name);
            //console.log("tempVal" + tempVal);

            return <td key={index}>
                <button className="btn btn-primary"
                        onClick={() => store.dispatch(saveKeyValueToDBThunk(index, indexTask))}>
                    {tempVal}
                </button>
            </td>
        });
    }

    render(){
        const {butterflyTable} = this.props;
        //console.log(StdUI.abc(butterflyTable.persons));

        return <div>
            <div>
                <button className="btn btn-primary" onClick={() => store.dispatch(updateFromDB())}>
                    Update from DB
                </button>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => store.dispatch(changeToAddPersonView())}>
                    Add Person
                </button>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => store.dispatch(changeToAddTaskView())}>
                    Add Task
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Task</th>
                            {StdUI.abc((butterflyTable.persons === undefined || butterflyTable.persons === null) ? [] : butterflyTable.persons)}
                        </tr>
                    </thead>
                    <tbody>
                        {StdUI.generateRows(butterflyTable)}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

/*
<tr>
    <td><i className="fa fa-fw fa-edit"/></td>
    <td >th:text="buchung.id}"</td>
    <td >th:text="buchung.sollKonto.id.kontoNr}"</td>
    <td >th:text="buchung.habenKonto.id.kontoNr}"</td>
    <td >th:text="buchung.belegNr}"</td>
    <td><p>th:text="buchung.kostenstelle.id.stellenName}"</p></td>
    <td >th:text="buchung.id}"</td>
</tr>
*/
/*
*           <table class="table table-striped">
		        <thead>
				    <tr>
				   		<th>Edit</th>
					    <th>ID</th>
					    <th>Sollkonto</th>
					    <th>Habenkonto</th>
					    <th>Belegnummer</th>
					    <th>Buchungsdatum</th>
					    <th class="text-right">Betrag</th>
					    <th class="text-right">Steuer-%</th>
					    <th>Kostenstelle</th>
				    </tr>
		        </thead>
		        <tbody>
			        <tr th:each="buchung : ${alleBuchungen}">
			        	<td> <a th:href="@{/Buchung/edit?buchungId=__${buchung.id}__}"><i class="fa fa-fw fa-edit"></i></a> </td>
						<td th:text="${buchung.id}"></td>
						<td th:text="${buchung.sollKonto.id.kontoNr}"></td>
						<td th:text="${buchung.habenKonto.id.kontoNr}"></td>
						<td th:text="${buchung.belegNr}"></td>
						<td th:text="${#dates.format(buchung.buchungsDatum, 'dd.MM.yyyy')}"></td>
						<td th:text="${#numbers.formatDecimal(buchung.buchungsbetrag,1,2,'COMMA')} + ' €'" class="text-right"></td>
						<td th:text="${#numbers.formatDecimal(buchung.steuerProzent,1,2,'COMMA')}" class="text-right"></td>
						<td><p th:text="${buchung.kostenstelle.id.stellenName}" th:unless="${buchung.kostenstelle == null}"></p></td>
			        </tr>
		        </tbody>
			</table>
* */
