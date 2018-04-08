const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.send(
    //     `
    //     <h1>
    //     Here I am, sending you server-side HTML!
    //     <hr>
    //     <form>
    //     <input type="submit" value="Submit">
    //     </form>
    //     </h1>
    // `)
    res.render('index');
});

app.get('/person/:id', (req, res) => {
    res.render('person', {
        ID: req.params.id
    });
});


app.listen(3000);