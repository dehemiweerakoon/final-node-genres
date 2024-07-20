const bcrypt = require('bcrypt');
async function run(){
    const salt= await bcrypt.genSalt(10);
    const decyptPassword = await bcrypt.hash('1234',salt);
    console.log(decyptPassword);
}
run();