---
layout: post
title:  "Image animations"
date:   2018-01-09 01:26:55 -0700
tags: interactive

scriptFolder: "/scripts/2018-01-09-image-reveals"

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
<!--<script src="/libraries/jquery-1.10.2.js"></script> TODO: If not needed as req for jquery UI dump -->
<script src="/libraries/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js"></script>

<script src="/libraries/bootstrap-3.3.7-dist/js/bootstrap-3.3.7.min.js"></script>
<script src="{{ page.scriptFolder }}/ctrls.js"></script>
<script src="{{ page.scriptFolder }}/imageUtils.js"></script>
<script src="{{ page.scriptFolder }}/ball.js"></script>
<script src="{{ page.scriptFolder }}/pointAnimation.js"></script>
<script src="{{ page.scriptFolder }}/colorRotationAnimation.js"></script>
<script src="{{ page.scriptFolder }}/main.js"></script>

<style>
    body {
      padding: 0;
      margin: 0;
    }

    #userProvidedImage {
      visibility: hidden;
      width: 0;
      height: 0;
      z-index: -1;
    }
	
    .centeredSubContent { /*Takes into account the fact we are in a compressed, centered "reading area". Don't want to protrude from that. */
      max-width: calc(760px - (30px * 2));
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
	
</style>

I spent some time recently playing around with Processing after watching Dan Shiffman's Coding Train channel on Youtube. The following is a work in 
progress that I'll probably come back to and enhance/clean up. It works (mostly) and allows you to use your own images. 

Some ideas for further work:
* Refactoring (it's messy, but mostly working)
* More animations
* More user control of the different animation parameters
* Queueing up multiple images to transition through




  <div class="container">
    <div class="row centeredSubContent" style="margin-bottom:10px" id="statOutput">
      <code>Stats go here</code>
    </div>

    <div class='row centeredSubContent' id="canvasDiv">
    </div>

    <div class="row centeredSubContent">
      <button type="button" class="btn btn-default" onclick="ctrls.pause()" aria-label="Pause">
      <span class="glyphicon glyphicon-pause" aria-hidden="true"></span>
    </button>
      <button type="button" class="btn btn-default" onclick="ctrls.play()" aria-label="Left Align">
      <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
    </button>
      <button type="button" class="btn btn-default" onclick="ctrls.clearScreen()" aria-label="Clear Screen">
      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
    </button>
    </div>
    <!--TODO: Carousel of images to work thru -->
    <div id="imageCarousel" class="row">
	<!--
      <img src="DogPants.png" width="100" height="100" alt="">
      <img src="DogPants.png" width="100" height="100" alt="">
	  -->
    </div>

    <div class="row centeredSubContent">
      <input multiple type="file" onchange='changeImage()' id="userProvidedImage"/>
      <label for="userProvidedImage">
          <button type="button" class="btn btn-default" onclick="$(this).parent().click();" aria-label="Clear Screen">
            <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
          </button>
        </label>
    </div>
    <div class="row">
      <abbr title="What kind of reveal should we use?">Animation Type</abbr>
      <!-- <label for="revealTechnique">Animation Type</label> -->
      <select id="revealTechnique" name="revealTechnique" onchange="propertyUpdate(event)">
      <option value="balls" selected>Kinectic Balls</option>
      <option value="points">Points</option>
      <option value="colorRotation">Color Rotation</option>

    </select>
    </div>
    <br>
	<div id="specificConfigs" class='todo'>
		<div class='row' id="ballSpecificConfigs">
		  <div class="container">
			<div class="row">
			  <abbr class='col-xs-3' title="A smaller number will lead to a more accurate image. Higher numbers -> Grainier">Minimum Ball Size</abbr>
			  <div class='col-xs-8' id="minBallSizeSlider"></div>
			  <p class='col-xs-1' id="minBallSizeDisplay"></p>
			</div>
			<div class="row">
			  <abbr class='col-xs-3' title="How many steps should be taken prior to a split(on average)">Split %</abbr>
			  <div class='col-xs-8' id="splitChanceSlider"></div>
			  <p class='col-xs-1' id="splitChanceDisplay"></p>
			</div>
		  </div>
		</div>
		<div class='row' id="pointSpecificConfigs">
		  <abbr class='col-xs-3' title="Fewer samples -> more gradual fade in">Samples per step</abbr>
		  <div class='col-xs-8' id="numSamplesSlider"></div>
		  <p class='col-xs-1' id="numSamplesDisplay"></p>
		</div>
	</div>
    <div class='row todo'>
      <abbr class='col-xs-3' title="Each step draws in additional detail, more steps, longer processing">Total steps per image</abbr>
      <div class='col-xs-8' id="numStepsSlider"></div>
      <p class='col-xs-1' id="numStepsDisplay"></p>
    </div>
    <!--<label for="clearBetweenPics">Clear Between Pictures?</label>
      <input class="todo" type="checkbox" name="clearBetweenPics" value="false">
    -->
  </div>

  
  
<script type="text/javascript">

  function initSlider(slideId, labelId, _min, _max, path) {
    $(slideId).slider({
      range: "min",
      value: _min,
      min: _min,
      max: _max,
      slide: function(event, ui) {
        $(labelId).text(ui.value);
      },
      change:function(event,ui){
        config[path] = ui.value;
      }
    });
    $(labelId).text($(slideId).slider("value"));
  }

  $(function() { //document ready shorthand
    initSlider("#minBallSizeSlider", "#minBallSizeDisplay", 1, 20, 'minBallSize');
    initSlider("#splitChanceSlider", "#splitChanceDisplay", 0, 100, 'splitChance');
    initSlider("#numSamplesSlider", "#numSamplesDisplay", 1, 20000);
    initSlider("#numStepsSlider", "#numStepsDisplay", 1, 5000);
  });
</script>