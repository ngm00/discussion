
var Alert=new CustomAlert();
function CustomAlert(){

this.render=function(dialog){
var winW=window.innerWidth;
var winH=window.innerHeight;
var dialogoverlay=document.getElementById('dialogoverlay');
var dialogbox=document.getElementById('dialogbox');
dialogoverlay.style.display="block";
dialogoverlay.style.height=winH;
dialogbox.style.left=(winW/2)-100+"px";
dialogbox.style.top=(winH/2)-100+"px";
dialogbox.style.display="block";
document.getElementById('dialogboxhead').innerHTML='<b>Alert</b>';
document.getElementById('dialogboxbody').innerHTML= dialog;
document.getElementById('dialogboxfoot').innerHTML= '<span id="brav-span"><a href="http://one.brav.org/#/login.html">Login</a></span>';
}

this.ok=function(){
document.getElementById('dialogbox').style.display="none";
document.getElementById('dialogoverlay').style.display="none";
}
}