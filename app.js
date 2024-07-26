const express = require('express');
const app = express();
const fs = require('fs');

const data = fs.readFileSync('data/data.json', "utf-8");
const jsonData = JSON.parse(data);

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    let editid = req.query.editid
    // console.log(editid)


    let input = {};
    if (editid >= 0) {

        input = jsonData[editid];

    }
    res.render("index", { data: jsonData, input, editid})
})


app.get('/submit', (req, res) => {
    const { name, email, gender, education, course, skills, city } = req.query;

    if (name && email && gender && education && course && skills && city) {

        let inputData = req.query.inputData

        if (inputData) {
            jsonData.splice(inputData, 1, req.query )
            
        }
        else{
            // Add new data
            jsonData.push(req.query);

        }


        fs.writeFileSync('data/data.json', JSON.stringify(jsonData), 'utf-8');
        return res.redirect('/submit');
    }


    let delid = req.query.delid
    // console.log(delid)


    if (delid >= 0) {
        jsonData.splice(delid, 1);
        fs.writeFileSync('data/data.json', JSON.stringify(jsonData), 'utf-8');
        return res.redirect('/submit');
    }



   
    res.render('submit', { data: jsonData });


});


app.listen(4000);
