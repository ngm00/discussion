function myFunction() {
    var writepost = document.getElementById("bravtext").value;
	var createpoll = document.getElementById("bravpoll").value;
	var photo = document.getElementById("upload").value;
	if(writepost!=null){
    document.getElementById("demo").innerHTML = '<div class="form-group"> <text>'+ writepost + '</text><div class="dropdown"><span id="brav-span"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" color="blue">...</span><span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" onclick="editFunction()">Edit</a></li><li><a href="#" onclick="deleteFunction()">Delete</a></li><li><a href="#" onclick="reportFunction()">Report</a></li></ul></div></div>';
	}
	//elseif(createpoll!=null && photo!=null){
	//document.getElementById("demo").innerHTML = '<div class="form-group"> <text>'+createpoll + '</text><image>'+photo+'</image><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">...<span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" onclick="editFunction()">Edit</a></li><li><a href="#" onclick="deleteFunction()">Delete</a></li><li><a href="#" onclick="reportFunction()">Report</a></li></ul></div></div>';
	
	//}
	//elseif(createpoll!=null && photo==null){
	//document.getElementById("demo").innerHTML = '<div class="form-group"> <text>'+createpoll + '</text><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">...<span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" onclick="editFunction()">Edit</a></li><li><a href="#" onclick="deleteFunction()">Delete</a></li><li><a href="#" onclick="reportFunction()">Report</a></li></ul></div></div>';
	
	//}
}