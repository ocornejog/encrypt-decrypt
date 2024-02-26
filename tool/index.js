const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

app.listen(app.get('default_port'), function() {
    console.log(`Listening on port ${app.get('default_port')}`)
});