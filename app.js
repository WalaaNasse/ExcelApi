const express = require('express')
const xlsx = require('xlsx')



const app = express()
app.use(express.json())

// app.get('/', function (req, res) {
//   res.send('Walaa Nasser enrolled in full stack training')
// })
var cors = require('cors')

 
app.use(cors())
app.get('/students',(req,res)=>{
   
    let wb = xlsx.readFile('data.xlsx');
    let ws= wb.Sheets['students'];
    let data = xlsx.utils.sheet_to_json(ws);
  
    
    res.send(data)
})
app.post('/addStudents', (req,res) => {
    console.log(req.body)
    const id=req.body.id;
    const name=req.body.name;
    const imgUrl=req.body.imgUrl;

   
    let wb = xlsx.readFile('data.xlsx');
    let ws= wb.Sheets['students'];
    xlsx.utils.sheet_add_aoa(ws, [[id,name,imgUrl]], { origin: -1 });

// // Package and Release Data (`writeFile` tries to write and save an XLSB file)
xlsx.writeFile(wb, "data.xlsx");
res.send('Students is added')
    
})
app.listen(3000)
