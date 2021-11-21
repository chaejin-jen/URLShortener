var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var base = alphabet.length;

// urls의 _id 값을 alphabet 스트링으로 표현
// 이때, urls의 _id는 sequences 콜렉션의 seq의 따라 정해짐
function encode(num){
	var encoded = '';
	if(num==0) return alphabet[num];
	while (num){
		var remainder = num % base;
		num = Math.floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;
	}
	return encoded;
}

// shourt url을 alphabet 스트링으로 다시 인덱스로 디코드 (=urls의 _id 값이 됨)
// 생성된 shourt url을 저장할 필요없음
function decode(str){
	var decoded = 0;
	while (str){
		var index = alphabet.indexOf(str[0]);
		var power = str.length - 1;
		decoded += index * (Math.pow(base, power));
		str = str.substring(1);
	}
	return decoded;
}
module.exports.encode = encode;
module.exports.decode = decode;
