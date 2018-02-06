---
layout: post
title:  "Recursion is unreasonably powerful"
date:   2018-02-05 14:26:55 -0700
categories: 
---

Since leaving school I haven't found myself using recursion all that much. Occassionally an opportunity presents itself, but for 
the most part it seems simpler to just use an iterative solution. 

I'm doing some interview prep and came across a problem that I don't want to say is impossible with looping, but it seems like it.
| Generate all possible permutations of an input string.
| Example: "ab" => ['ab','bc']

So I dusted off the toolbox. A college professor I had used to say 
Step 1: Base case
Step 2: Reduce the problem size on each call
Step 3: Test
Step 4: Believe!

I can't think of a better summary. I know everything I did and the thought process, but I'm still amazed it works. There's just not much 
code there. I'm sure it can be done more succinctly (and with better naming), but I don't want people to think I'm padding my blog with 
other people's work :) 

```Javascript
function permute(a){
	//Done if have a single element 
	if(a.length == 1){
		return [a];
    }
	let out = [];
	//Multiple elements. Let's break them into 2 groups (a single element and all the remainder)
	for(let i = 0; i < a.length; i++){
		let singleLetter = a.charAt(i);
		let theRest = a.slice(0,i).concat(a.slice(i+1));

		let temp = permuteTwoGroups(singleLetter, theRest);
		
		//Putting computations results directly means nesting arrays, undesirable
		for(let t of temp){
			out.push(t);
		}
    }
	
	return out;
}

function permuteTwoGroups(a,b){
	//Get left and right side's permutations
	let left = permute(a);
	let right = permute(b);
	
	return combineLeftAndRight(left,right);
}

//create pairing of EACH left with EVERY right 
// Examples: 
// L:['a'] R['b'] => ['ab']
// L:['a'] R['bc','cb'] => ['abc','acb']
function combineLeftAndRight(left, right){
	let out = [];
	for (let i = 0; i< left.length; i++){
		for (let j = 0; j< right.length; j++){
			out.push(left[i] + right[j]);
		}
	}
	return out;
}

permute("a");
permute("ab");
permute("abc");
```