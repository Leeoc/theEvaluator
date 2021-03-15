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

const calcAverage = (obj) => {
    const values = Object.values(obj.meta).filter(a => typeof a == 'number');
    return parseFloat(values.reduce(function (p, c, i, a) { return p + (c / a.length) }, 0)).toFixed(2);
}


const addEntry = () => {
    // ave = calcAverage()
    let obj = {
        "meta": {
            "name": "Paul O'Connell",
            "integrity": Math.floor(Math.random() * 5) + 1,
            "difference": Math.floor(Math.random() * 5) + 1,
            "care": Math.floor(Math.random() * 5) + 1,
            "teamwork": Math.floor(Math.random() * 5) + 1,
            "reimagine": Math.floor(Math.random() * 5) + 1,
            "avg": null
        }
    }

    obj.meta.avg = calcAverage(obj)
    testData.push(obj)
}

const removeEntry = (id) => {
    testData.splice(id);
}

const saveData = (data) => {

}

for (let i = 0; i < 50; i++) {
    addEntry();
}

$(document).ready(function () {
    console.log(calcAverage(testData[2]));
    console.log('ready');
    $('#example').DataTable({
        "data": testData,
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
});

    // <th>Name</th>
    // <th>Act with integrity</th>
    // <th>Make a difference</th>
    // <th>Care</th>
    // <th>Work together</th>
    // <th>Reimagine the possible</th>
