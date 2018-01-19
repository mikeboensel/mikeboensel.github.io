---
layout: post
title:  "Modular times tables animation"
date:   2018-01-19 09:00:00 -0800
tags: interactive

scriptFolder: "/scripts/2018-01-19-modular-mult"
imageFolder: "/images/2018-01-19-modular-mult"
---

<link rel="stylesheet" href="/libraries/bootstrap-3.3.7-dist/css/bootstrap-3.3.7.min.css">
<link rel="stylesheet" href="/libraries/bootstrap-3.3.7-dist/css/bootstrap-theme-3.3.7.min.css">
<link rel="stylesheet" href="/libraries/jquery-ui-1.10.4.custom/development-bundle/themes/base/jquery-ui.css">

<script src="/libraries/p5/p5.min.js"></script>
<script src="/libraries/p5/addons/p5.dom.min.js"></script>
<script src="/libraries/p5/addons/p5.sound.min.js"></script> <!--TODO necessary?-->


<!-- Network pulls
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.sound.min.js"></script>
-->
<script src="/libraries/jquery-3.2.1.js"></script>
<script src="/libraries/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>

<script src="/libraries/bootstrap-3.3.7-dist/js/bootstrap-3.3.7.min.js"></script>
<script src="{{ page.scriptFolder }}/main.js"></script>


<style>
    body {
      padding: 0;
      margin: 0;
    }	
    .centeredSubContent { /*Takes into account the fact we are in a compressed, centered "reading area". Don't want to protrude from that. */
      max-width: calc(690px - (30px * 2));
	  text-align: center;
    }

    #defaultCanvas0 {
      border: 1px solid #ede5e5;
    }
    abbr[title]{
      /* Bootstrap issue. Probably have too many conflicting libraries. We get an ugly 2x underline. Overiding */
      border-bottom: none;
    }
	label{
	  display: inline;
	}
	.todo{
	  display: none;
	}
	
	figure{
		width:60%; 
		margin:0 auto; 
		display:block
	}
	
</style>

  <div class="container">
	<div id="canvasContainer">

	</div>
	<div class="centeredSubContent">
		<div>
			<button id= 'playCtrl' onclick="pauseOrPlay()">Pause</button>
		</div>
		<div>
			<label for='limitFrames'>Limit Animation Speed</label>
			<input id='limitFrames' type='checkBox' onchange='updateLimit()' checked/>
			
			<select id='maxFrames' onchange='updateMaxFrames()'>
			  <option value="1">1</option>
			  <option selected value="5">5</option>
			  <option value="10">10</option>
			  <option value="30">30</option>
			  <option value="60">60</option>
			  <option value="120">120</option>
			</select>
		</div>
		<div>
			<button id= 'resetCtrl' onclick="reset()">Reset</button>
		</div>
	</div>
  </div>

-------------------
  
  Fun. Mesmerizing. Dizzying. I've been watching a lot of Youtube math videos recently. Especially channels that focus on visualizations. 
  For a full explaination of what's going on here's the inspiration: 
  
  <iframe width="640" height="360" src="https://www.youtube.com/embed/qhbuKbxJsk8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  <br>
  <br>
# Quick Explaination
  
  It's a visual representation of the times tables we all did in school. Each number is laid out on 
  the circle's circumference, equally spaced. The multiplier in the corner gets applied to each number. We take the result and form 
  a line from the number to the result. 
  
  Example: 1 * 2 = 2. We draw a line from 1 -> 2. Continue around the circle, drawing lines. Once we complete a cycle we add a number to the circle. 
  Redraw the lines. Repeat until our circle has the 150. Then we do the next times table (3x).

  If the result is greater than any number on our circle we draw to the remainder after dividing by the highest number + 1. The +1 comes from the fact we 
  start at 0.
  
  Example: Assume our highest number on the circle is 9. Since we start at 0 this means we have 10 total numbers.
  9 * 2 = 18. 18/10 has a remainder of 8. Draw a line 9 -> 8.
    
	
  You end up with beautiful patterns emerging. Sometimes they last, sometimes they're fleeting.
  
<figure>
	<img src='{{ page.imageFolder}}/Spirograph.jpg'>
    <figcaption>
</figcaption>
</figure>  

<figure>
	<img src='{{ page.imageFolder}}/Beauty.jpg'>
    <figcaption>
</figcaption>
</figure>  



	
# If you thought this was fun..
  
  For a much better version of this concept, check out <a href="https://mathiaslengler.github.io/TimesTableWebGL/">this guy's take</a> on it 
  (much slicker, better controls, better visuals). He did a hell of a job. 

# Known issues
  I'm using setTimeout to limit FPS. At lower values the imprecision of when it gets executed can lead to jitter. Need to take a look at it. 