let ele = document.getElementsByClassName('plant');
let jar = document.getElementsByClassName('dirt')[0]; 
console.log(jar); 
// gets all the plant elements 
for (let i=0; i< ele.length; i++ ) {
	dragElement(document.getElementById(ele[i].id));
	
}

function jarOverlap(terrariumElement) {
	const plantRect = terrariumElement.getBoundingClientRect(); 
	const jarRect = jar.getBoundingClientRect(); 

	return !(
		jarRect.top > plantRect.bottom ||
		jarRect.right < plantRect.left ||
		jarRect.bottom < plantRect.top ||
		jarRect.left > plantRect.right
	  );

}
function dragElement(terrariumElement) {
	//set 4 positions for positioning on the screen
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	
	terrariumElement.onpointerdown = pointerDrag;

	function pointerDrag(e) {
		e.preventDefault();
		console.log(e);
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onpointermove = elementDrag;
		document.onpointerup = stopElementDrag;
	}

	function elementDrag(e) {
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		console.log(pos1, pos2, pos3, pos4);
		terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
		terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
		console.log(jarOverlap(terrariumElement)); 

		if (jarOverlap(terrariumElement)) {
			stopElementDrag(); 
		}
	}

	function stopElementDrag() {
		document.onpointerup = null;
		document.onpointermove = null;
	}

	document.addEventListener('keydown', (event) => {
		event.preventDefault();
		let name = event.key;
		let code = event.code;
		// Alert the key name and key code on keydown
		if (event.key === 'b') {
			terrariumElement.style.top = 0;
			terrariumElement.style.left = 0;
			console.log("key pressed"); 
		}
	
	});
}

