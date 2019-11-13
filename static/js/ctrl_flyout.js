function toggleCP(){
			var cp = document.getElementById("cp");
			if(cp.style.opacity == 1){
				cp.style.opacity = 0;
				cp.style.left = "20px"; // remove it from active screen space		
			} else {
				cp.style.left = "20px"; // return it to active screen space
				cp.style.opacity = 1;
			}
		}