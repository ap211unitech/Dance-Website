// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Kitten', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("We are connected")
});

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    const greeting = "My name is " + this.name;
    console.log(greeting);
}



//Here schema converted to model
const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Arjun Porwal' });
console.log(silence.name); // 'Silence'
silence.speak();

// silence.save(function (err, silence) {
//     if (err) return console.error(err);
//     silence.speak();
//   });

Kitten.find({"name":"Arjun Porwal"},function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})