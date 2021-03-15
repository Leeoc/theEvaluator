testData = [
    {
        "meta": {
            "name": "Lee O'Connell",
            "integrity": 5,
            "difference": 4,
            "care": 3,
            "teamwork": 2,
            "reimagine": 1,
            "avg": 3
        }
    },
    {
        "meta": {
            "name": "Trevor Andres",
            "integrity": 2,
            "difference": 3,
            "care": 5,
            "teamwork": 1,
            "reimagine": 5,
            "avg": 3.16
        }
    },
    {
        "meta": {
            "name": "Paul O'Connell",
            "integrity": 5,
            "difference": 5,
            "care": 4,
            "teamwork": 5,
            "reimagine": 4,
            "avg": 4.33
        }
    },
]
// Global var data
var Globaldata = [];

const calcAverage = (obj) => {
    const values = Object.values(obj.meta).filter(a => typeof a == 'number');
    return parseFloat(values.reduce(function (p, c, i, a) { return p + (c / a.length) }, 0)).toFixed(2);
}


const addEntry = (name, integrity, difference, care, teamwork, reimagine) => {
    // ave = calcAverage()
    let obj = {
        "meta": {
            "name": name,
            "integrity": integrity,
            "difference": difference,
            "care": care,
            "teamwork": teamwork,
            "reimagine": reimagine,
            "avg": null
        }
    }

    obj.meta.avg = calcAverage(obj)
    Globaldata.push(obj)
}

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
        
const saveFile = (text, filename) =>{
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(text)));
    a.setAttribute('download', filename);
    a.click();
    console.log('Downloaded Successfully!');
}

const loadTable = (data) => {
    $('#example').DataTable({
        "data": data,
        "columns": [
            { "data": "meta.name" },
            { "data": "meta.integrity" },
            { "data": "meta.difference" },
            { "data": "meta.care" },
            { "data": "meta.teamwork" },
            { "data": "meta.reimagine" },
            { "data": "meta.avg" },
        ]
    });
}

 
$(document).ready(function () {
    
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
        const inputs = $('#addNew :input');
        let values = []; 
        inputs.each(function () {
            values.push($(this).val());
        });
        console.log(values);
        addEntry(
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5],
        )
        console.log(Globaldata);
        if ($.fn.DataTable.isDataTable( '#example' )) {
            let dataTable = $('#example').DataTable();
            console.log('inside');
            dataTable.clear().draw();
            dataTable.rows.add(Globaldata); // Add new data
            dataTable.columns.adjust().draw(); // Redraw the DataTable
        } else {
            loadTable(Globaldata);
        }
        // $('#example').DataTable().clear().draw();
        
        // $('#example').DataTable().destroy();
        // $('#example').DataTable().draw();


        
    });
});

    // <th>Name</th>
    // <th>Act with integrity</th>
    // <th>Make a difference</th>
    // <th>Care</th>
    // <th>Work together</th>
    // <th>Reimagine the possible</th>
