const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
var app = express();
var email 	= require("emailjs/email");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var generator = require('generate-password');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var connection = mysql.createConnection({
  host: "localhost", // 127.0.0.1
  user: "root",
  password: "surya",
  database: "vcore"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connection accepted");
});

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

  
const server = app.listen(3000, "localhost", () => {
  console.log("server listening || host =", connection.config.host, "|| database = ", connection.config.database);
});

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('./template', { root: __dirname })
})


  app.post('/register/checkemail', (req, res) => {
    var emailid=req.body.email;
    console.log("emailid",emailid);
    connection.query("select password from user where email = ?",[emailid], (err, result) => {
      if (err) throw err;
      var x=JSON.parse(JSON.stringify(result));
      console.log("x",x);
      if(x.length<=0){
        res.send({
          "code":100,
          "success":""
        });
      }
      else{
        res.send({
          "code":200,
          "success":"Email already Exists "
        });
      }
      
       })
  });

  app.post('/register/insert', (req, res) => {
  var id=0;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var emailid=req.body.email;
  var gender=req.body.gender;
  var password = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase:true
}); 
var data=[];
data.push(firstname);
data.push(emailid);
data.push(password);
  var encryptedString = cryptr.encrypt(password);
  var mobile=req.body.mobile;
  var decryptedString = cryptr.decrypt(encryptedString);
  console.log("password",password);
  console.log("encry",encryptedString);
  console.log("decy",decryptedString);
  var date=new Date();
    connection.query("insert into user (id,firstname,lastname,email,gender,password,mobile,date) values(?,?,?,?,?,?,?,?)",
    [id,firstname,lastname,emailid,gender,encryptedString,mobile,date],
     (err, results) => {
      if (err) throw err;
    })
    console.log("in serverss  go ahed ");
 var server   = email.server.connect({
    user:    "nirmalsuryakant@gmail.com", 
    password:"ghirtkytdcgqvema", 
    host:    "smtp.gmail.com", 
    ssl:     true,
    port:465
 });

 server.send({
    text:    "i hope this works", 
    from:    "nirmalsuryakant@gmail.com", 
    to:      emailid,
    subject: "Registration Form",
    attachment: 
    [
       {data:"<html><h1>Hello "+firstname+"</h2><h1>Registration successfull</h1><br><h1>Your password is "+password +"</h1><br><a href='http://127.0.0.1:4200/login'>click here to continue</a> </html>", alternative:true},
       //{ data:emailbody, alternative:true}
    ]
 }, function(err, message) { 
   if (err) throw err;
   res.send({
    "code":20,
    "success":"You have been registered..Check your email for Password"
      });
  });
  });
  
  app.get('/tabs', (req, res) =>{
    var xml ="example.xml";
    fs.readFile(xml, 'utf8',function(err,text){
      parser.parseString(text,function(error,results){
        var user=results['userdata']['user'];
         res.json(user);
      });
    });
  });
  app.get('/subtabs', (req, res) =>{
    var xml ="example.xml";
    fs.readFile(xml, 'utf8',function(err,text){
      parser.parseString(text,function(error,results){
        var user=results['userdata']['user'];
         res.json(user);
      });
    });
  });

  app.post('/login', (req, res) => {
    var email=req.body.email;
    if(email==undefined){
      res.send({
        "code":300,
        "success":"Email should not be empty"
          });
      }
      else{
    connection.query("select id,firstname,lastname,email,gender,password,mobile,date from user where email = ?",[email], (err, results) => {
      if (err) throw err;
      var x=JSON.parse(JSON.stringify(results));
      var pass=x[0].password;
    var password1 = cryptr.decrypt(pass);
    var password2 = req.body.password;
    console.log("email",email);
    console.log("user password",password2);
    console.log("db password",password1);
    console.log("first name",x[0].firstname);
    console.log("ID",x[0].id);
    var userid=x[0].id;
    var firstname=x[0].firstname;
    if(password2==password1){   
       res.send({
        "userid":userid,
        "firstname":firstname,
        "code":200,
        "success":"login sucessfull"
          });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
        }
    })
  }
  });
  app.get('/group/getdata', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group where GROUP_LEVEL=0", (err, results) => {
      if (err) throw err;
      //console.log(results);
      var x=JSON.parse(JSON.stringify(results));
      var GROUP_ID=x[0].GROUP_ID;
      var GROUP_NAME=x[0].GROUP_NAME;
      var GROUP_LEVEL=x[0].GROUP_LEVEL;
      var PARENT_GROUP=x[0].PARENT_GROUP;
      var FQN_NAME=x[0].FQN_NAME;
      res.send({
        "GroupData":results,
        "GROUP_ID":GROUP_ID,
        "GROUP_NAME":GROUP_NAME,
        "GROUP_LEVEL":GROUP_LEVEL,
        "PARENT_GROUP":PARENT_GROUP,
        "FQN_NAME":FQN_NAME
          });
    })
  });
  app.get('/group/getsub', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME FROM vc_user_group where PARENT_GROUP >0 ", (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getallsub/:fkid', (req, res) => {
    connection.query("SELECT GROUP_ID,GROUP_LEVEL,PARENT_GROUP,FQN_NAME FROM vc_user_group where GROUP_ID=? ",[req.params.fkid], (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getalldata', (req, res) => {
    connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group ", (err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getalldatagroup/:Groupname', (req, res) => {
    connection.query("SELECT GROUP_ID FROM vc_user_group WHERE GROUP_NAME=?",[req.params.Groupname],(err, results) => {
      if (err) throw err;      
      var x=JSON.parse(JSON.stringify(results));
      console.log(x[0].GROUP_ID);
      var parentId=x[0].GROUP_ID;
      connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group WHERE PARENT_GROUP=?",[parentId],(err, result) => {
        if (err) throw err;      
        res.json(result);
      })
    })
   
  });
  app.get('/group/userdatagroup/:groupId', (req, res) => {
      connection.query("SELECT GROUP_ID,SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME FROM vc_user_group WHERE PARENT_GROUP=?",[req.params.groupId],(err, result) => {
        if (err) throw err;      
        res.json(result);
      })
  });
  app.get('/group/getallgroupdata/:groupId', (req, res) => {
    var sql=" SELECT ug.GROUP_ID,ug.GROUP_NAME,ug.GROUP_LEVEL,ug.PARENT_GROUP,ug.DESCRIPTION,ug.FQN_NAME, "
      + " ugd.COUNTRY_ID,ugd.STATE_ID,ugd.CITY_ID,ugd.ADDRESS1,ugd.ADDRESS2,ugd.ZIP,ugd.PHONE,ugd.FAX, "
      + " ugd.EMAIL,ugd.WEB,ugd.LANGUAGE_ID,ugd.CURRENCY_ID,ugd.ORGANIZATION_TYPE "
      + " FROM vc_user_group as ug inner join USER_GROUP_DETAILS ugd where ug.GROUP_ID = ugd.GROUP_ID and ug.GROUP_ID = ?";
    connection.query(sql,[req.params.groupId],(err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });
  app.get('/group/getallkey/:groupId', (req, res) => {
    var sql=" SELECT ugk.GROUP_ID,ugk.CONTACT_NAME,ugk.CONTACT_PHONE,ugk.CONTACT_EMAIL, "
      + " ugk.CONTACT_FAX,ugk.CONTACT_MOBILE,ugk.CONTACT_DESIGNATION,ugk.SEQUENCE " 
      + " FROM vc_user_group as ug inner join USER_GROUP_KEY_CONTACTS ugk where ug.GROUP_ID=ugk.GROUP_ID "
      + " and ug.GROUP_ID = ?";
    connection.query(sql,[req.params.groupId],(err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });

  app.get('/group/getallusergroupdata/:Groupname', (req, res) => {
    var sql=" SELECT ug.GROUP_ID,ug.GROUP_NAME,ug.GROUP_LEVEL,ug.PARENT_GROUP,ug.DESCRIPTION,ug.FQN_NAME, "
      + " ugd.COUNTRY_ID,ugd.STATE_ID,ugd.CITY_ID,ugd.ADDRESS1,ugd.ADDRESS2,ugd.ZIP,ugd.PHONE,ugd.FAX, "
      + " ugd.EMAIL,ugd.WEB,ugd.LANGUAGE_ID,ugd.CURRENCY_ID,ugd.ORGANIZATION_TYPE "
      + " FROM vc_user_group as ug inner join USER_GROUP_DETAILS ugd where ug.GROUP_ID = ugd.GROUP_ID and ug.GROUP_NAME = ?";
    connection.query(sql,[req.params.Groupname],(err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });

  app.get('/group/getalluserkey/:Groupname', (req, res) => {
    var sql=" SELECT ugk.GROUP_ID,ugk.CONTACT_NAME,ugk.CONTACT_PHONE,ugk.CONTACT_EMAIL, "
      + " ugk.CONTACT_FAX,ugk.CONTACT_MOBILE,ugk.CONTACT_DESIGNATION,ugk.SEQUENCE " 
      + " FROM vc_user_group as ug inner join USER_GROUP_KEY_CONTACTS ugk where ug.GROUP_ID=ugk.GROUP_ID "
      + " and ug.GROUP_NAME = ?";
    connection.query(sql,[req.params.Groupname],(err, results) => {
      if (err) throw err;      
      res.json(results);
    })
  });


  app.post('/getSearchItem', (req, res) => {
    var nn=req.body.search;
    var searchString=nn.concat('%');
    console.log(searchString);
     console.log("check="+nn); 
    console.log("ssearch data="+JSON.stringify(nn));
    connection.query("select GROUP_ID,GROUP_NAME,PARENT_GROUP,DESCRIPTION  from vc_user_group where GROUP_NAME like ? order by GROUP_NAME ", [searchString], (err, results) => {
      if (err) throw err; 
      var arr=[];
      if(results.length>0)
      { 
        var flag={"flag":1};
        
        arr.push(flag);
        arr.push(results);
        res.json(arr); 
      }
      else
      {
        res.send([{"flag":0}]);
      }
    });    
  });
  app.post('/group/updategroup/:groupId', (req, res) => {
  var usergroup=req.body.usergroup;
  var namearray = req.body.namearray;
  var phonearray = req.body.phonearray;
  var emailarray = req.body.emailarray;
  var faxarray = req.body.faxarray;
  var mobilearray = req.body.mobilearray;
  var desiarray = req.body.desiarray;
  var seqarray=req.body.seqarray
  var x=JSON.parse(JSON.stringify(usergroup));
    var GROUP_NAME=x[0].GROUP_NAME;
    // var PARENT_GROUP=req.body.PARENT_GROUP;
    var LAST_UPDATED_BY=x[0].userid;
    var DESCRIPTION=x[0].DESCRIPTION;
  // var FQN=req.body.FQN_NAME;
  // var FQN_NAME=FQN+"/"+GROUP_NAME;
    var PHONE=x[0].PHONE;
    var COUNTRY_ID=x[0].COUNTRY_ID;
    var STATE_ID=x[0].STATE_ID;
    var CITY_ID=x[0].CITY_ID;
    var ADDRESS1=x[0].ADDRESS1;
    var ADDRESS2=x[0].ADDRESS2;
    var ZIP=x[0].ZIP;
    var PHONE=x[0].PHONE;
    var FAX=x[0].FAX;
    var EMAIL=x[0].EMAIL;
    var WEB=x[0].WEB;
    var LANGUAGE_ID=x[0].LANGUAGE_ID; 
    var CURRENCY_ID=x[0].CURRENCY_ID;
    var ORGANIZATION_TYPE=x[0].ORGANIZATION_TYPE;
   
     var groupsql=" UPDATE vc_user_group SET GROUP_NAME=?,DESCRIPTION=?,LAST_UPDATED_BY=? where GROUP_ID = ?";
     var groupdetail="UPDATE USER_GROUP_DETAILS as ugd set ugd.COUNTRY_ID=?,ugd.STATE_ID=?,ugd.CITY_ID=?,ugd.ADDRESS1=?,ugd.ADDRESS2=?,ugd.ZIP=?,ugd.PHONE=?,ugd.FAX=?, "
     + " ugd.EMAIL=?,ugd.WEB=?,ugd.LANGUAGE_ID=?,ugd.CURRENCY_ID=?,ugd.ORGANIZATION_TYPE=? where ugd.GROUP_ID = ?";
     var keydata="UPDATE USER_GROUP_KEY_CONTACTS set CONTACT_NAME=?,CONTACT_PHONE=?,CONTACT_EMAIL=?,"
     + "CONTACT_FAX=?,CONTACT_MOBILE=?,CONTACT_DESIGNATION=? where GROUP_ID = ? AND SEQUENCE= ? ";
     connection.query(groupsql,[GROUP_NAME,DESCRIPTION,LAST_UPDATED_BY,req.params.groupId]
     ,(err, results) => {
      if (err) throw err;
      //res.json(results);
    })
    connection.query(groupdetail,[COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,
      ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE,req.params.groupId]
     ,(err, results) => {
      if (err) throw err;
      //res.json(results);
    })
    var values=[ ];
       for(var i=0;i<namearray.length;i++){
        var arr=[namearray[i],phonearray[i],emailarray[i],faxarray[i],mobilearray[i],desiarray[i],req.params.groupId,seqarray[i]];
        //values.push(arr);
         //values.push(req.params.groupId);
         connection.query(keydata,[namearray[i],phonearray[i],emailarray[i],faxarray[i],mobilearray[i],desiarray[i],req.params.groupId,seqarray[i]]
          ,(err, results) => {
           if (err) throw err;
           //res.json(results);
         })
         console.log(arr);
         
     }
     res.send({
      "code":204,
      "success":"Group created Updated!"
        });
  })

  app.post('/group/creategroup', (req, res) => {
    var GROUP_ID=0;
    var SITE_ID=1;
    var G_LEVEL=req.body.GROUP_LEVEL;
    var GROUP_LEVEL=parseInt(G_LEVEL,10)+1;
    var PARENT_GROUP=req.body.PARENT_GROUP;
    var CREATION_TIME=new Date();
    var CREATED_BY=req.body.userid;
    var LAST_UPDATED_BY=req.body.userid;
    var usergroup=req.body.groupdata;
    var x=JSON.parse(JSON.stringify(usergroup));
    console.log("usergroup",x.GROUP_NAME);
    var GROUP_NAME=x.GROUP_NAME;
    var FQN=req.body.FQN_NAME;
    var FQN_NAME=FQN+"/"+GROUP_NAME;
    var LAST_UPDATED_BY=x.userid;
    var DESCRIPTION=x.DESCRIPTION;
    var PHONE=x.PHONE;
    var COUNTRY_ID=x.COUNTRY_ID;
    var STATE_ID=x.STATE_ID;
    var CITY_ID=x.CITY_ID;
    var ADDRESS1=x.ADDRESS1;
    var ADDRESS2=x.ADDRESS2;
    var ZIP=x.ZIP;
    var PHONE=x.PHONE;
    var FAX=x.FAX;
    var EMAIL=x.EMAIL;
    var WEB=x.WEB;
    var LANGUAGE_ID=x.LANGUAGE_ID; 
    var CURRENCY_ID=x.CURRENCY_ID;
    var ORGANIZATION_TYPE=x.ORGANIZATION_TYPE;

    var SEQUENCE=[];
    var namearray = req.body.namearray;
    var phonearray = req.body.phonearray;
    var emailarray = req.body.emailarray;
    var faxarray = req.body.faxarray;
    var mobilearray = req.body.mobilearray;
    var desiarray = req.body.desiarray;
   
    console.log("table1...."+GROUP_LEVEL+".."+PARENT_GROUP+".."+FQN_NAME+".."+CREATED_BY+".."+DESCRIPTION+".."+GROUP_NAME);
    console.log("table2...."+COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE);
    var usergroupsql="insert into vc_user_group (SITE_ID,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME) values(?,?,?,?,?,?,?,?,?)";
    var groupdetailsql="insert into USER_GROUP_DETAILS (GROUP_ID,COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var groupkeysql="insert into USER_GROUP_KEY_CONTACTS (GROUP_ID,SEQUENCE,CONTACT_NAME,CONTACT_PHONE,CONTACT_EMAIL,CONTACT_FAX,CONTACT_MOBILE,CONTACT_DESIGNATION) values ?";
    connection.query(usergroupsql,[SITE_ID ,GROUP_NAME,GROUP_LEVEL,PARENT_GROUP,CREATION_TIME,CREATED_BY,LAST_UPDATED_BY,DESCRIPTION,FQN_NAME], (err, results) => {
      if (err) throw err;
   
    })
    connection.query("select GROUP_ID from vc_user_group where GROUP_NAME=?", GROUP_NAME,(err, gid) => {
      console.log("groupid",gid)
      var x=JSON.parse(JSON.stringify(gid));
      var groupId=x[0].GROUP_ID;
      console.log("groupId",groupId)
     connection.query(groupdetailsql,[groupId,COUNTRY_ID,STATE_ID,CITY_ID,ADDRESS1,ADDRESS2,ZIP,PHONE,FAX,EMAIL,WEB,LANGUAGE_ID,CURRENCY_ID,ORGANIZATION_TYPE], (err, results) => {
         if (err) throw err;
     
       })
       var values=[ ];
       for(var i=0;i<namearray.length;i++){
        var arr=[groupId,i+1,namearray[i],phonearray[i],emailarray[i],faxarray[i],mobilearray[i],desiarray[i]]
         values.push(arr);
     }
     console.log("values",values);
    connection.query(groupkeysql,[values], (err, results) => {
        if (err) throw err;
        res.send({
          "code":204,
          "success":"Group created Successfully!"
            });
       })
      })
   
  });

  

  app.post('/register/createpass/:email', (req, res) => {
    var password=req.body.password;
    connection.query("UPDATE user set password=? where email = ?",[password,req.params.email], (err, results) => {
      if (err) throw err;
      res.json(results);
   
    })
  });

 
  app.get('/user/updatedata', (req, res) => {
    connection.query("SELECT * FROM user", (err, results) => {
      if (err) throw err;
      var dat=results;
      res.json(results);

    })
  });
  app.get('/user/get/:id', (req, res) => {
    connection.query("select id,firstname,lastname,email,gender,mobile,date from user where id = ?",[req.params.id], (err, results) => {
      if (err) throw err;
      //var data=results;
      res.json(results);
    })
  });
  app.get('/user/getcolumns', (req, res) => {
    connection.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='vc_user_group'",(err, results) => {
      if (err) throw err;
      //var data=results;
      res.json(results);
    })
  });


  app.post('/showMenus',(req,res) =>{

    //connection.query("select * from menus", (err,result) => {
   

    connection.query("select m.MENU_NAME,s.SUBMENU_ID,s.SUBMENU_NAME from menus m right JOIN sub_menus s on m.MENU_ID=s.MENU_ID ",(err,result) => {   
    var userdata=result;
     
    
    console.log("fetch menus data"+userdata);

        if(err) throw err;

        var permissionquery=connection.query("select * from perimision",(error,newresult) => {
            var newdata=newresult;

            if(error) throw error;

            console.log("perimision result"+JSON.stringify(newdata));

            var arr=[];
                                        
    
            if (userdata.length > 0) {
            var code={"code":'200'};
             arr.push(code);
             arr.push(userdata);
             arr.push(newdata);
           
            
             res.json(arr);
             console.log("array"+arr[2]);
             }
             else {
                 console.log("fail")
                 res.send([{"code":'400'}]); 
             }

        })


        //console.log("perimision outside result"+newdata);
   
        // var arr=[];
                                        
    
        // if (userdata.length > 0) {
        // var code={"code":'200'};
        //  arr.push(code);
        //  arr.push(userdata);
       
        
        //  res.json(arr);
        //  console.log("array"+arr[1]);
        //  }
        //  else {
        //      console.log("fail")
        //      res.send([{"code":'400'}]); 
        //  }

       // res.json(userdata);

    })

    
})

app.post('/showSubmenus',(req,res) =>{

    connection.query("select * from sub_menus", (err,result) => {

        var userdata=result;
        console.log("fetch submenus data"+userdata);

        if(err) throw err;

   
        var arr=[];
                                        
    
        if (userdata.length > 0) {
        var code={"code":'200'};
         arr.push(code);
         arr.push(userdata);
       
        
         res.json(arr);
         console.log("array"+arr[1]);
         }
         else {
             console.log("fail")
             res.send([{"code":'400'}]); 
         }

        //res.json(userdata);

    })

})


app.post('/showRoles',(req,res) => {
    connection.query("select * from role", (err,result) => {
        var userdata=result;
        console.log("fetch role data"+userdata);

        if(err) throw err;

   
        var arr=[];
                                        
    
        if (userdata.length > 0) {
        var code={"code":'200'};
         arr.push(code);
         arr.push(userdata);
       
        
         res.json(arr);
         console.log("array"+arr[1]);
         }
         else {
             console.log("fail")
             res.send([{"code":'400'}]); 
         }

        //res.json(userdata);

    })
})

app.post('/insertRole',(req,res) => {

  var rolename=req.body.role;
  var description=req.body.role_description;

  console.log("role n name is"+rolename)
  console.log("role dersription is"+description);

  connection.query("insert into role(role_name,role_description) values(?,?)",[rolename,description],(err,result) => {
      if (err) throw err;
      res.json(result);
  
  })
})
app.post('/tabs',(req,res) => {
  connection.query("select * from menus",(err,result) => {
      var userdata=result;
      if(err) throw err;
      //console.log("err here"+err);
      console.log("menus data fetch here"+userdata);       
      var arr=[];
                           

      if (userdata.length > 0) {
      var code={"code":'200'};
       arr.push(code);
       arr.push(userdata);
     
      
       res.json(arr);
       console.log("array"+arr[1]);
       }
       else {
           console.log("fail")
           res.send([{"code":'400'}]); 
       }
    //  res.json(userdata);


  })
})
app.post('/group/checkgroupname', (req, res) => {
  var GROUP_NAME=req.body.GROUP_NAME;
  console.log("GROUP_NAME",GROUP_NAME);
  connection.query("select GROUP_ID from vc_user_group where GROUP_NAME = ? ",[GROUP_NAME], (err, result) => {
    if (err) throw err;
    var x=JSON.parse(JSON.stringify(result));
    console.log("x",x);
    if(x.length<=0){
      res.send({
        "code":100,
        "success":""
      });
    }
    else{
      res.send({
        "code":200,
        "success":"Group Name already Exists "
      });
    }
     })
});