// Global var data
var Globaldata = [];
var StarMode = false;
var paging = true;
var sorting = true;

/** 
* Function to calculate the average of an array of numbers.
* @param {array} arr - Array of int values to calculate average on.
* @return {float} The average returned as a float.
*/
const calcAverage = (arr) => {
    return parseFloat(arr.reduce(function (p, c, i, a) { return p + (c / a.length) }, 0)).toFixed(2);
}

/** 
* Function to add an entry to the global data.
* @param {string} name - The name of the person to add
* @param {number} integrity, difference, care, teamwork, reimagine - PwC values of the person
* @return {none}
*/
const addEntry = (name, integrity, difference, care, teamwork, reimagine) => {
    const avg = calcAverage([
        integrity,
        difference,
        care,
        teamwork,
        reimagine]
    );
    let obj = {
        "meta": {
            "name": name,
            "integrity": integrity,
            "difference": difference,
            "care": care,
            "teamwork": teamwork,
            "reimagine": reimagine,
            "avg": avg
        }
    }
    Globaldata.push(obj)
}

/** 
* Function to remove an entry to the global data.
* @param {number} index - The index of the row to remove
* @return {none}
*/
const removeEntry = (index) => {
    Globaldata.splice(index, 1);

/** 
* Function to edit an existing entry and update the global data
* @param {number} index, integrity, difference, care, teamwork, reimagine - Index of the row and new number data to update
* @return {none} 
*/}
const editEntry = (index, integrity, difference, care, teamwork, reimagine) =>{
    const name = Globaldata[index].meta.name;
    const avg = calcAverage(
        [integrity,
        difference,
        care,
        teamwork,
        reimagine]
    );

    Globaldata[index] = {
        "meta": {
            "name": name,
            "integrity": integrity,
            "difference": difference,
            "care": care,
            "teamwork": teamwork,
            "reimagine": reimagine,
            "avg": avg
        }
    }
}
/** 
* Function to read in a new file in json format, sets global data to file data.
* @param {file} parameterNameHere - The file to be read
* @return {none}
*/
const readFile = (file) => {
    var reader = new FileReader();
    reader.onload = readSuccess;                                            
    function readSuccess(evt) { 
        const data = JSON.parse(evt.target.result);
        Globaldata = data;
        loadTable(data);                         
    };
    reader.readAsText(file);   
}

/** 
* Function to save the file and download it in the browser
* @param {object} data - Data object
* @param {string} filename - Filename to be saved
* @return {none}
*/
const saveFile = (data, filename) =>{
    const today = new Date().toLocaleDateString()
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(data)));
    a.setAttribute('download', filename + '_' + today);
    a.click();
}

const createStar = (val) => {
    if (StarMode) {
        return `<div class="rateYo" data-rateyo-rating="${val}" data-rateyo-read-only="true"></div`
    }
    return val;
    
}
/** 
* Function to initilise the table. 
* @param {object} data - The data object to be loaded into the table
* @return {none}
*/
const loadTable = (data) => {
    $('#example').DataTable({
        "data": data,
        "columns": [
            { "data": "meta.name"},
            { "data": "meta.integrity",
                render: function (data) {
                    return createStar(data);
                },
            },
            { "data": "meta.difference",
                render: function (data) {
                    return createStar(data);
                },
            },
            { "data": "meta.care",
                render: function (data) {
                    return createStar(data);
                },
            },
            { "data": "meta.teamwork",
                render: function (data) {
                    return createStar(data);
                },
            },
            { "data": "meta.reimagine",
                render: function (data) {
                    return createStar(data);
                },
            },
            { "data": "meta.avg",
                render: function (data) {
                    return createStar(data);
                },
            },
        ],
        // "createdRow": function (data){
        //     return `<div class="rateYo" data-rateyo-rating="${data}" data-rateyo-read-only="true"></div`;
        // },
        paging: paging,
        bSort: sorting,
        
    });
    $(".rateYo").rateYo({
        starWidth: "30px"
    });
}

/** 
* Function to refresh the table. Should only be called after the loadTable has created the table! 
* @param {DataTable} dataTable - The datatable to refresh
* @return {none}
*/
const refreshTable = (dataTable) => {
    dataTable.destroy();
    loadTable(Globaldata);
}

const convertStarsToNum = (edit) => {
    if (edit == true){
        return [
            $("#editIntegrity").rateYo("rating"),
            $("#editDifference").rateYo("rating"),
            $("#editCare").rateYo("rating"),
            $("#editTeamwork").rateYo("rating"),
            $("#editReimagine").rateYo("rating")
        ];
    } else {
        return [
            $('#name').val(),
            $("#integrity").rateYo("rating"),
            $("#difference").rateYo("rating"),
            $("#care").rateYo("rating"),
            $("#teamwork").rateYo("rating"),
            $("#reimagine").rateYo("rating")
        ];
    }
}

 
$(document).ready(function () {
    let dataTable;
    $(".rateyo").rateYo({
        rating: 3,
        numStars: 5,
        halfStar: true,
        minValue: 1,
        maxValue: 5 
    });

    // get data
    $('#exampleModal').modal('show');
    
    // Upload / New project events
    $("#uploadBtn").click(function () {
        readFile(document.getElementById("uploadedFile").files[0]);
        $('#exampleModal').modal('hide');
    });

    $("#newProjectBtn").click(function () {
        $('#exampleModal').modal('hide');
        loadTable();
        $('#addNewEntry').modal('show');
    });

    // New entry logic
    $("#add").click(function () {
        $('#addNewEntry').modal('show');
    });

    $("#addNewSubmit").click(function () {
        $('#addNewEntry').modal('hide');
    });

    $( "#addNew" ).submit(function( event ) {
        event.preventDefault();

        let values = convertStarsToNum();
        addEntry(
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5],
        );
        console.log(Globaldata);
        if ($.fn.DataTable.isDataTable( '#example' )) {
            dataTable = $('#example').DataTable();
            refreshTable(dataTable);
        } else {
            loadTable(Globaldata);
        }      
    });

    // Select table row logic
    $('#example').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
    
    // Delete selected row logic
    $('#delete').click( function () {
        dataTable = $('#example').DataTable();
        removeEntry(dataTable.row('.selected').index());
        dataTable.row('.selected').remove().draw( false );
        refreshTable(dataTable);
    } );

    // Edit selected row logic
    $('#edit').click( function () {
        $('#editEntry').modal('show');
        dataTable = $('#example').DataTable();
        $( "#editRow" ).submit(function( event ) {
            event.preventDefault();
            let values = convertStarsToNum(true);
            console.log(values);
            editEntry(
                dataTable.row('.selected').index(),
                values[0],
                values[1],
                values[2],
                values[3],
                values[4],
            );
            refreshTable(dataTable);
            $('#editEntry').modal('hide');
        });
    } );

    // Save current data logic
    $('#save').click( function () {
        saveFile(Globaldata, 'test');
    } );

    // New project logic
    $('#new').click( function () {
        location.reload();
    });
    
    $('#stars').change(function () {
        dataTable = $('#example').DataTable();
        if ($(this).is(':checked')) {
            console.log('checked');
            StarMode = true;
            paging = false;
            sorting = false;
            refreshTable(dataTable);
        } else {
            StarMode = false;
            paging = true;
            sorting = true;
            refreshTable(dataTable);
        }
    })
});