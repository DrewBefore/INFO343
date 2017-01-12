var dropdown = document.querySelector("#report-select");
var table = document.querySelector(".table");

var starWars = MOVIES.filter(function (title) {
    return title.title.toLowerCase().includes("star wars");
});

function compare(a,b){
    if (a.title < b.title)
        return -1
    if (a.title > b.title)
        return 1;
    return 0;
}

function compareDate(a,b) {
    if (a.released < b.released)
        return -1;
    if (a.released > b.released)
        return 1;
    return 0;
}

function compareDateAndYear(a,b) {
    var o1 = a.released;
    var o2 = b.released;
    var p1 = a.year;
    var p2 = b.year;
    if (o1 < o2) return -1;
    if (o1 > o2) return 1;
    if (p1 < p2) return -1;
    if (p1 > p2) return 1;
    return 0;
}

function compareYear(a,b) {
    console.log(a.title + " " + b.title);
    if (a.title.localecompare(b.title)) {
        if (a.year < b.year){
            console.log(a.title + b.title);
            return -1;
        }

        if (a.year > b.year){
            return 1;
        }
    }
    return 0;
}

var twentieth = MOVIES.filter(function (title) {
    return title.released < "2000-01-01";
});

var avgByGenre = [];
var avgSalesByGenre = [];
for (var i = 0; i < MOVIES.length; i++) {
    if (!isAGenre(i)){
        avgByGenre.push({genre: MOVIES[i].genre, sales: 0, count: 0});
    }
    updateGenre(i);
}

function updateGenre(i){
    for (var j = 0; j < avgByGenre.length; j++) {
        if (avgByGenre[j].genre === MOVIES[i].genre) {
            avgByGenre[j].sales = avgByGenre[j].sales + MOVIES[i].sales;
            avgByGenre[j].count = avgByGenre[j].count + 1;
        }
    }
}

function isAGenre(i){
        var exists = false;
        for (var j = 0; j < avgByGenre.length; j++){
            if (avgByGenre[j].genre === MOVIES[i].genre) {
                return true;
            } 
    }
    return false;
}

for (var i = 0; i < avgByGenre.length; i++) {
    avgSalesByGenre.push({Genre: avgByGenre[i].genre, sales: avgByGenre[i].sales / avgByGenre[i].count});
}
avgSalesByGenre[11].Genre = "N/A";

avgSalesByGenre.sort(compareSales);
function compareGenre(a, b) {
    if (a.genre < b.genre)
        return -1;
    if (a.genre > b.genre)
        return 1;
    else
        return 0;
}

function compareNormal(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    else
        return 0;
}


function compareSales(a, b) {
    if (a.sales < b.sales)
        return 1;
    if (a.sales > b.sales)
        return -1;
    else
        return 0;
}

function compareTickets(a, b) {
    if (a.tickets < b.tickets)
        return 1;
    if (a.tickets > b.tickets)
        return -1;
    else
        return 0;
}

var top10 = [];
var top10Combined = [];
for (var i = 0; i < MOVIES.length; i++) {
    if (!isAMovie(i)){
        var releaseYear= moment(MOVIES[i].released).year();
        top10.push({Title: MOVIES[i].title, tickets: 0, Released: releaseYear});
    }
    updateTop100(i);
}

function updateTop100(i){
    for (var j = 0; j < top10.length; j++) {
        //var movie = top100.title + " (" + top100.released + ")";
        if (top10[j].Title === MOVIES[i].title) {
            top10[j].tickets = top10[j].tickets + MOVIES[i].tickets;
        }
    }
}

function isAMovie(i){
        var exists = false;
        for (var j = 0; j < top10.length; j++){
            if (top10[j].Title + " (" + (top10[j].Released + ")") === MOVIES[i].title + " (" + (top10[j].Released + ")")) {
                return true;
            } 
    }
    return false;
}

top10.sort(compareTickets);

for (var i = 0; i < 100; i++) {
     top10Combined.push({Title: top10[i].Title + " (" + top10[i].Released + ")", tickets: top10[i].tickets});
}

dropdown.addEventListener("change", function (e) {
    table.innerHTML = "";
    var value = e.target.value;
    if (value === "star-wars") {
        starWars.sort(compare);
        buildRows(starWars);
    } else if (value === "20th"){
        twentieth.sort(compareDateAndYear);
        buildRows(twentieth);
    } else if (value === "avg-by-genre") {
        avgByGenre.sort(compareGenre);
        buildRows(avgSalesByGenre);
    } else if (value === "top-by-tickets") {
        buildRows(top10Combined);
    }
});

function buildTableDynamic(value) {
    var columns = Object.keys(value[0]);
    console.log(columns);
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var threadRow = document.createElement("tr");

    columns.forEach(function(column) {
        var title = document.createElement("th");
        if (column === "sales" || column === "tickets") {
            title.className = "text-right";
        }
        title.textContent = column;
        threadRow.appendChild(title);
    });

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

function buildRows(rows) {
    buildTableDynamic(rows);
    console.log(Object.keys(rows[0]));

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");

    // Iterate over each movie,
    // create the tr (row element) and td elements (column elements)
    // and append to the table body.
    rows.forEach(function (title) {
        var titleTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var titleKeys = Object.keys(title);

        titleKeys.forEach(function (key) {
            var value = title[key];
            var td = document.createElement("td");

            if (key.toLowerCase() === "sales"){
                value = numeral(value).format('$,0,0');
                td.className = "text-right";
            }
            if (key.toLowerCase() === "tickets"){
                value = numeral(value).format('0,0');
                td.className = "text-right";
            }
            if (key.toLowerCase() === "released"){
                value = moment(value).format("MM/DD/YYYY");
            }
            td.textContent = value;

            titleTr.appendChild(td);
        });

        tbody.appendChild(titleTr);
    });
}
