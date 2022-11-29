const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Routers
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const errorController = require('./controllers/errorController')

app.set('views', 'views');
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    expressHbs.engine({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);
app.use(errorController.error404);

mongoose.connect(
    'mongodb+srv://test_user:m4TH15doDIRWPwBF@clusterbase.z3wdjin.mongodb.net/shop?retryWrites=true&w=majority', 
    () => {
        console.log('--> Mongoose conectado!')
        app.listen(3000, () => {
            console.log('--> Servidor activo en puerto 3000')
        })
    }
)