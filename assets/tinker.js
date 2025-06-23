let clock,i_time,s_time1,s_time2;

d = new Date();
i_time = d.getTime();
clock = 0 //d.getTime()-i_time;
s_time1 = 0;
s_time2 = 0;

let b1_timer,b2_timer,b1_counts,b2_counts;
b1_timer = 95;
b2_timer = 80;
b1_counts = 65;
b2_counts = 75;

let state1,counter1,state2,counter2;
state1 = 0;
counter1 = b1_counts+0;
state2 = 0;
counter2 = b2_counts+0;

let isKill,textInpBlock;
isKill = 0;
textInpBlock = 0;

let txtTimer,txtFirstIn;
txtTimer = 0;
txtFirstIn = 0;
textPrev = "";

const vowels = ['a','e','i','o','u'];

let K, wordsTimer,wordsDelay,sampleS;
wordsTimer = 0;
wordsDelay = 100;
K = 0;
sampleS = "";
const sampleText = ['This', 'one', 'is', 'going', 'to', 'be', 'a', 'little', 'annoying,', 'but', 'maybe', 'I', 'can', 'put', 'it', 'inot', 'a', 'quick', 'python', 'script', 'to', 'get', 'it', 'formatted', 'correctly,', 'the', 'main', 'thing', 'is', 'that', 'I', 'want', 'it', 'to', 'be', 'a', 'pretty', 'long', 'string', 'so', 'that', 'it', 'can', 'cycle', 'through', 'visibly', 'different', 'lengths', 'quickly', 'and', 'showcase', 'the', 'update', 'in', 'a', 'smooth', 'way.', 'to', 'that', 'end,', "it's", 'pretty', 'simple,', 'I', 'just', 'have', 'to', 'vamp', 'on', 'some', 'text', 'here,', 'ignoring', 'any', 'and', 'all', 'errors', 'I', 'make,', 'even,', 'because', "it's", 'all', 'just', 'a', 'weird', 'version', 'of', 'lorem', 'ipsum,', 'but', 'maybe', 'more', 'self', 'aware.', 'or', 'less,', "it's", 'actually', 'kind', 'of', 'hard', 'to', 'tell', 'when', 'something', 'gets', 'elevated', 'from', 'trope', 'to', 'technique,', 'which', 'would', 'incidentally', 'be', 'a', 'great', 'name', 'for', 'a', 'linguistic', 'paper.'];

let topString1 = "It's very strange about timing, but that makes sense with all the event-based stuff";
let topString2 = "And that's not going to stop me from doing sequential things";
let randStrTimer = d.getTime();
let randStrProb = 0.1;
let randStrDur = 500;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.getElementById('ts1').innerHTML=topString1;
document.getElementById('ts2').innerHTML=topString2;

setInterval(tickTock,10);
//setTimeout(makeToast,3000);

function clickerIDCheck(event){	
	document.getElementById('clickerOP').innerHTML = event.target.id;
}

function doAFetch(){
	//Wait a minute
}

function randEditStr(S,prob){
	let len = S.length;
	let r = Math.random();
	let sOut = ""
	if (r < prob){
		let ind = Math.floor((len+1)*Math.random());
		let i = 0;
		while (i<ind) {sOut = sOut + S.charAt(i);i=i+1;}
		sOut = sOut + alphabet[Math.floor(47*Math.random())];
		i = i + 1;
		while (i<len) {sOut = sOut + S.charAt(i);i=i+1;}
		return sOut;
	}
	else{
		return S;
	}
}

function checkCharIn(chr,lst){
	let i = 0,len = lst.length;
	let isIn = false;
	while (i<len){
		if (chr == lst[i]){isIn = true;}
		i = i + 1;
	}
	return isIn;
}

function setTBText(newText){document.getElementById('tb').innerHTML=newText;}

function makeToast(){
	S = "Values: ";
	S = S + s_time1 + "," + s_time2 + "," + counter1 + "," + counter2;
	alert(S);
}

function toggle1(){
	state1 = 1 - state1;
	if (state1==1){document.getElementById('myImage1').src='pic_bulbon.gif';}
	else{document.getElementById('myImage1').src='pic_bulboff.gif';}
}

function toggle2(){
	state2 = 1 - state2;
	if (state2==1){document.getElementById('myImage2').src='pic_bulbon.gif';}
	else{document.getElementById('myImage2').src='pic_bulboff.gif';}
}

function lightsOff(){
	document.getElementById('myImage1').src='pic_bulboff.gif';
	document.getElementById('myImage2').src='pic_bulboff.gif';
}

function makePlot(lst,minVal,maxVal){

	let sze = 60;
	let S = "";

	let i = 0;len = lst.length;
	while (i < len){
		num = Math.floor(sze*(lst[i]-minVal)/(maxVal-minVal));
		//S = S + num + " ";
		if (num > sze){sze = 20;}
		if (num < 0){num = 0;}
		let n = 0;
		while (n<num){S = S + "|"; n = n + 1;}
		while (n<sze){S = S + " "; n = n + 1;}
		S = S + "<br>";
		i = i + 1;
	}
	return S;
}

function tickTock(){

	d = new Date();
	clock = d.getTime()-i_time;
	document.getElementById('clock').innerHTML="Clocktime: "+(clock/1000.0)+"s";

	S = "s_times: "
	if (counter1==b1_counts){S = S + "-,";}
	else{S = S + (d.getTime()-s_time1)/1000.0+"s,";}
	
	if (counter2==b2_counts){S = S + "-";}
	else{S = S + (d.getTime()-s_time2)/1000.0+"s";}

	document.getElementById('op1').innerHTML=S;
	document.getElementById('op2').innerHTML="ticks: "+(b1_counts-counter1)+","+(b2_counts-counter2);

	if (counter1 < b1_counts){
		if ((d.getTime()-s_time1) > b1_timer){
			toggle1();
			counter1 = counter1 + 1;
			d = new Date();
			s_time1 = d.getTime();
		}
	}
	if (counter2 < b2_counts){
		if ((d.getTime()-s_time2) > b2_timer){
			toggle2();
			counter2 = counter2 + 1;
			d = new Date();
			s_time2 = d.getTime();
		}
	}
	if ((counter1 >= b1_counts)&&(counter2 >= b2_counts)){
		isKill = 0;
		textInpBlock = 0;
	}

	if (d.getTime()-wordsTimer > wordsDelay){	
		let l = 0;
		sampleS = "";
		while (l < 9){
			let ind = (K+l)%sampleText.length;
			sampleS = sampleS + sampleText[ind] + " ";
			l = l + 1;
		}
		sampleS = sampleS + sampleText[K];

		K = (K + 1)%sampleText.length;
		
		d = new Date();
		wordsTimer = d.getTime();
	}

	document.getElementById('text1').value = sampleS;

	let textVal = document.getElementById('text1').value;

	if(textVal != textPrev){
		let i = 0, len = textVal.length,S = "";
		while (i<len){
			chr = textVal.charAt(i);
			let isVowel = checkCharIn(chr,vowels);
			if (!isVowel){S = S + chr;}
			i = i + 1
		}
		document.getElementById('tb').innerHTML = S;
	}
	textPrev = textVal;

	let wordLens = [0,0,0,0,0,0,0,0,0,0];
	let i,j,len,wordLen;
	i = textVal.length-1;
	j = 0;
	len = textVal.length;
	wordLen=0;

	while ((i >= 0)&&(j < wordLens.length)){
				
		if (textVal.charAt(i) == " "){
			if (wordLen > 0){
				wordLen = 0;
				j = j + 1;
			}
		}
		else{
			wordLen = wordLen + 1;
			wordLens[j] = wordLen;
		}
		
		i = i - 1;
	}

	//document.getElementById('op2').innerHTML=textVal.length + "|" + wordLens

	wordLenPlot = makePlot(wordLens,0,20);
	document.getElementById('chart').innerHTML=wordLenPlot;

	if ((textVal == "CLICKY!")&&(textInpBlock==0)){
		do_click();
		textInpBlock=1;
	}

	if (d.getTime()-randStrTimer > randStrDur){
		topString1 = randEditStr(topString1,randStrProb);
		topString2 = randEditStr(topString2,randStrProb);

		document.getElementById('ts1').innerHTML=topString1;
		document.getElementById('ts2').innerHTML=topString2;

		d = new Date();
		randStrTimer = d.getTime()
	}

}

function do_click(){
	if (isKill == 0){
		d = new Date();
		s_time1 = d.getTime();
		counter1 = 0;
		s_time2 = d.getTime();
		counter2 = 0;
		isKill = 1;
	}
	else{
		state1 = 0;
		counter1 = b1_counts+0;
		state2 = 0;
		counter2 = b2_counts+0;
		lightsOff();
		isKill = 0;
	}
}

