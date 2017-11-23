var mysql requiere('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "single",
	database: "mysqlhw"
})

connection.connect(function(err){
	if(err) throw err;
	console.log("connection suscesfull")
	makeTable();
})
var makeTable = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for(var i=0; i<res.length; i++){
			console.log(res[i].itemid+" || "+res[i].productname+" || "+
				res[i].departmentname+ " || "+res[i].price+" || "+res[i].stockquantity+"\n");


				}
		}promtCustomer = function(res){
			inquire.promt([{
				type:'input',
				name:'choice',
				message "What do you want to buy? [Salir con Q]"
			}]).then(function(answer){
				var correct = false;
				for(var i=0;i<res.length;i++){
					if(res[i].productname==answer.choice;
						correct = true;
						var product=answer.choice;
						var id=i;
						inquirer.promt({
							type:"input",
							name:"quant",
							message:"how many would you like to buy",
							validate: function(value){
								if(isNaN(value)==false){
									return true;
								} else { 
									return false;		
								}	
							}
						}).then(function(answer){
							if((res[id].stockquantity-answer.quant)>0){
								connection.query("UPDATE products SET
									stockquantity='"+(res[id].stockquantity-
									answer.quant)+"' WHERE productname='"+product
								+"'", function(err,res2) {
									console.log("product purchased!");
									makeTable();
								})

						} else {
							console.log("Seleccion no valida")
							promtCustomer(res);

						}

						})
				}
			}
						if(i==res.length && correct==false){
							console.log("seleccion no valida");
							promtCustomer(res);
						}

			})
	}	}
}
