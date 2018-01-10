(function () {
    $('#plainText').on('change textInput input', function () {
        calcCeasarCipher();
    });
}());

function calcCeasarCipher(){
	var v = $("#plainText");

	var cipher = '';
	for(var s of v.val()){
		s = s.toLowerCase();
		var charCode = s.charCodeAt(0);
		if(charCode >= 97 && charCode <= 122){
			cipher += String.fromCharCode(charCode + 1);
		}
		else{
			cipher += s;
		}
	}
	$("#cipherText").text(cipher);
	
	
}