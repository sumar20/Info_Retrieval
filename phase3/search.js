function browse() {
    var element = document.getElementById("enter").value;
    var str = "http://localhost:3000/search/" + element;
    console.log(str);
    fetch(str).then(data => data.json())
    .then(data => {
        let sec = document.getElementById("check");
        var col = [];
        for (var i = 0; i < data.length ; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Organize
        var table = document.createElement("table");
        var tr = table.insertRow(-1); 
        for (var i = 0; i < data.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);

                if (col[j] == "_source") {
                    tabCell.innerHTML = data[i][col[j]].url;
                } else {
                    tabCell.innerHTML = data[i][col[j]];
                }
            }
        }
        sec.innerHTML = "";
        sec.appendChild(table);
    }).catch();

}