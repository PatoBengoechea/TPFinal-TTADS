const server = require("./server");
const colors = require("colors");
require("./database");

const port = 3000;

function init() {
  server.listen(port, err => {
        if (err)
            console.log(colors.red("Error conecting to server: ", err));
        else
            console.log(colors.green("Server on port", port));
    });
}
/* 
async function init2(){
    await server.listen(port);
    console.log(colors.green("Server on port", port));
}
 */
init();
