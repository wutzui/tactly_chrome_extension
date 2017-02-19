
//======================================================================================//
// require npm sentiword 
//======================================================================================//
var sw = require('sentiword');
//======================================================================================//
// Array to store the user comments.
//======================================================================================//
var commentArray = [];

//======================================================================================//
// create and append button in textarea.
//======================================================================================//
var createBtn = createButton();
document.addEventListener('keypress', function(){
    var tactModal = document.getElementById("tact-modal");
    if(tactModal.style.display == "none"){ // set condition: 
    	onFocusIn(event); // activate tact button only when modal is closed.
    	commentArray.splice(1); 
    }
});

function onFocusIn(event) {
    var el = event.target;
    if (el.contentEditable ||
        el.matches('input, textarea') && el.type.match(/text/)) {
        if(el.name!== "search" && el.title!== "Search"){
        	appendButton(el);
        }
    }

    // modal show : hide events.
    var tactBtn = document.getElementById("tact-btn");
    var tactModal = document.getElementById("tact-modal");
    var modalConfirm = document.getElementById("modal-confirm");
    var tactModalText = document.getElementById("modal-text");
	tactBtn.addEventListener('click', showModal);
	tactModal.addEventListener('click', hideModal);
	modalConfirm.addEventListener('click', showConfirmOne);
	
	function showModal() {
		tactModal.style.display = "block";
		textValue_push(); // activate the text.value when click the tact button.
	}

	function hideModal(event) {
		if(event.target == tactModal){
			// confirm one box show.
			tactModal.style.display = "none";
		}
	}

	function showConfirmOne() {
		// confirm one box show.
		tactConfirmOne.style.display = "block";
	}

	// confirm one box.
	var tactConfirmOne = document.getElementById("confirm-one");
	var confirmOne_xClose = document.getElementById("closex-one");
	var confirmOne_back = document.getElementById("confirm-one-back");
	var confirmOne_confirm = document.getElementById("confirm-one-confirm");
	confirmOne_xClose.addEventListener('click', confirmOne_close);
	confirmOne_back.addEventListener('click', confirmOne_close);
	confirmOne_confirm.addEventListener('click', confirmOne_hide);

	function confirmOne_close() {
		tactConfirmOne.style.display = "none";
	}

	function confirmOne_cancel() {
		tactConfirmOne.style.display = "none";
		tactModal.style.display = "none";		
	}

	function confirmOne_hide() {
		tactConfirmOne.style.display = "none";
		tactModal.style.display = "none";
		taxtValue_back();
	}

	// add text value from el.textContent -> tactModalText.value. 
	function textValue_push() {
		// get the text content in the text area.
    	console.log("el.textContent = "+ el.textContent);
    	commentArray.splice(1); // clear the commentArray[1].
    	commentArray.push(el.textContent); // push the textContent to commentArray[1].
    	tactModalText.value = commentArray[1];
    	console.log("commentArray[1] = " + commentArray[1]);
	}

	function taxtValue_back() {
		commentArray.splice(1);
		commentArray.push(tactModalText.value);
		el.textContent = tactModalText.value;
	}
}

function createButton() {
	var btn = document.createElement("button");
    btn.setAttribute("id", "tact-btn");
    btn.textContent = "tact it";
    return btn;
}

// button append near the event.target element.
function appendButton(textElement) {
    textElement.parentElement.insertBefore(createBtn, textElement.previousSibling);
}

//======================================================================================//
// popup modal.
//======================================================================================//
// logo at top left 
var logo = chrome.extension.getURL("tactly_logo.png");

function createModal() {
	// modal section. id = tact-modal
	var modal = document.createElement("SECTION");
	modal.setAttribute("id", "tact-modal");
	modal.style.display = "none"; // set modal invisible at first.

	  // modal content div. id = tact-modal-in
	  var modalIn = document.createElement("DIV");
	  modalIn.setAttribute("id", "tact-modal-in");
	  modal.appendChild(modalIn);

	 	/*=============================================================================*/
	    //modal header 
	    var modalHeader = document.createElement("DIV");
	    modalHeader.setAttribute("id", "modal-header");
	    modalIn.appendChild(modalHeader);
	      //tactly logo -> inline left
	      var modalLogo = document.createElement("DIV");
	      modalLogo.setAttribute("id", "tact-logo");
	      modalLogo.setAttribute("class", "inline");
	      modalHeader.appendChild(modalLogo);
	      	//logo img
	        var modalLogo_img = document.createElement("IMG");
	        modalLogo_img.setAttribute("src", logo);
	        modalLogo.appendChild(modalLogo_img);
	      
	      //modal confirm button
	      var modalConfirm = document.createElement("DIV");
	      modalConfirm.setAttribute("id", "modal-confirm");
	      modalConfirm.setAttribute("class", "inline");
	      modalConfirm.textContent = "Confirm";
	      modalHeader.appendChild(modalConfirm);

	    /*=============================================================================*/
	    //modal inline left div.
	    var modalLeft = document.createElement("DIV");
	    modalLeft.setAttribute("id", "modal-left");
	    modalLeft.setAttribute("class", "inline");
	    modalIn.appendChild(modalLeft);
	      //modal left div: top -> text area
	      var modalLeft_1 = document.createElement("DIV");
	      modalLeft_1.setAttribute("id", "modal-left-1");
	      modalLeft.appendChild(modalLeft_1);
	      	// modal text instruction
	      	var modalText_instruct = document.createElement("DIV");
	      	modalText_instruct.setAttribute("id", "modal-text-instruct");
	      	modalText_instruct.textContent = "You can edit your sentence here.";
	      	modalLeft_1.appendChild(modalText_instruct);
	      	// modal text area. id = modal-text
		    var modalText = document.createElement("TEXTAREA");
	        modalText.setAttribute("id", "modal-text");
	        modalLeft_1.appendChild(modalText);
	      //modal left div: middle -> warning
	      var modalLeft_2 = document.createElement("DIV");
	      modalLeft_2.setAttribute("id", "modal-left-2");
	      modalLeft.appendChild(modalLeft_2);	      
	      //modal left div: middle -> sw analysis
	      var modalLeft_3 = document.createElement("DIV");
	      modalLeft_3.setAttribute("id", "modal-left-3");
	      modalLeft.appendChild(modalLeft_3);

	    /////////////////////////////////////////////////////////////////////////////////
	    //modal inline hr div -> vertical.
	    var modalHr_v =document.createElement("DIV");
	    modalHr_v.setAttribute("id", "modal-hr-v");
	    modalHr_v.setAttribute("class", "inline");
	    modalIn.appendChild(modalHr_v);

	    /*=============================================================================*/
	    //modal inline right div.
	    var modalRight =document.createElement("DIV");
	    modalRight.setAttribute("id", "modal-right");
	    modalRight.setAttribute("class", "inline");
	    modalIn.appendChild(modalRight);
	      //modal right div: top -> ratio area
	      var modalRight_1 = document.createElement("DIV");
	      modalRight_1.setAttribute("id", "modal-right-1");
	      modalRight.appendChild(modalRight_1);
	      	//d3 donut chart.
	      	var tactChart = document.createElement("DIV");
	      	tactChart.setAttribute("id", "tactly-chart");
	      	modalRight_1.appendChild(tactChart);
	      	//inside the donut chart.
	      	var tactChart_info = document.createElement("DIV");
	      	tactChart_info.setAttribute("id", "chart-info");
	      	modalRight_1.appendChild(tactChart_info);
	      	  // chart ratio number.
	      	  var tactChart_ratio = document.createElement("DIV");
	      	  tactChart_ratio.setAttribute("id", "chart-ratio");
	      	  tactChart_ratio.textContent = 10; //sentiword % value.
	      	  tactChart_info.appendChild(tactChart_ratio);
	      	  // text -> based on the word you used.
	      	  var tactChart_desc = document.createElement("DIV");
	      	  tactChart_desc.setAttribute("id", "chart-desc");
	      	  tactChart_desc.textContent = "based on the word you used.";
	      	  tactChart_info.appendChild(tactChart_desc);
	      	    // text -> your tact score
	      	    var desc_span = document.createElement("SPAN");
	      	    desc_span.textContent = "Your Tact Score";
	      	    tactChart_desc.insertBefore(desc_span, tactChart_desc.firstChild);
	      	    var br = document.createElement("BR");
	      	    tactChart_desc.insertBefore(br, desc_span.nextSibling);
	      
	      // modal right div: down -> tact word count
	      var modalRight_2 = document.createElement("DIV");
	      modalRight_2.setAttribute("id", "modal-right-2");
	      modalRight.appendChild(modalRight_2);
	      	// negative words amount returned from sentiword.
	      	var tactAmount = document.createElement("DIV");
	      	tactAmount.setAttribute("id", "tact-amount");
	      	tactAmount.setAttribute("class", "inline");
	      	tactAmount.textContent = 2; // -> return the amount.
	      	modalRight_2.appendChild(tactAmount);
	      	// amount description. 
	      	var tactAmount_desc = document.createElement("DIV");
	      	tactAmount_desc.setAttribute("id", "tact-amount-disc");
	      	tactAmount_desc.setAttribute("class", "inline");
	      	tactAmount_desc.textContent = "found errors in your sentence.";
	      	modalRight_2.appendChild(tactAmount_desc);

	return modal;
}

// insert the modal div to the firstchild of the body.
function appendModal() {
	var createMdl = createModal();
	document.body.insertBefore(createMdl, document.body.firstChild);
}

appendModal();

//======================================================================================//
// confirm box.
//======================================================================================//
var x_img = chrome.extension.getURL("x.png");

function createConfirmOne() {
	var confirmOne = document.createElement("SECTION");
	confirmOne.setAttribute("id", "confirm-one");
	confirmOne.style.display = "none"; // set 'confirm box 1' invisible at first.

	var confirmOneIn = document.createElement("DIV");
	confirmOneIn.setAttribute("id", "confirm-one-in");
	confirmOne.appendChild(confirmOneIn);

	//close button x in confirm one.
	var closex = document.createElement("IMG");
	closex.setAttribute("src", x_img);
	closex.setAttribute("id", "closex-one");
	confirmOneIn.appendChild(closex);
	//text
	var confirmOne_text = document.createElement("DIV");
	confirmOne_text.setAttribute("id", "confirm-one-text");
	confirmOneIn.appendChild(confirmOne_text);
		var confirmOne_title = document.createElement("P");
		confirmOne_title.setAttribute("id", "confirm-one-title");
		confirmOne_title.textContent = "You can do better!";
		confirmOne_text.appendChild(confirmOne_title);
		var confirmOne_p = document.createElement("P");
		confirmOne_p.setAttribute("id", "comfirm-one-p");
		confirmOne_p.textContent = "Communicating tactfully could strengthen your reputation and build your credibitiy."
		confirmOne_text.appendChild(confirmOne_p);

	//confirm one -> ratio area
	var confirmOne_d3 = document.createElement("DIV");
	confirmOne_d3.setAttribute("id", "confirm-one-d3");
	confirmOneIn.appendChild(confirmOne_d3);
	    //d3 donut chart.
	    var tactChart = document.createElement("DIV");
	    tactChart.setAttribute("id", "tactly-chart-c1");
	    confirmOne_d3.appendChild(tactChart);
	    //inside the donut chart.
	    var tactChart_info = document.createElement("DIV");
	    tactChart_info.setAttribute("id", "chart-info-c1");
	    confirmOne_d3.appendChild(tactChart_info);
	        // chart ratio number.
	        var tactChart_ratio = document.createElement("DIV");
	        tactChart_ratio.setAttribute("id", "chart-ratio");
	        tactChart_ratio.textContent = 10; //sentiword % value.
	        tactChart_info.appendChild(tactChart_ratio);
	      	// text -> based on the word you used.
	      	var tactChart_desc = document.createElement("DIV");
	      	tactChart_desc.setAttribute("id", "chart-desc");
	      	tactChart_desc.textContent = "based on the word you used.";
	      	tactChart_info.appendChild(tactChart_desc);
	      	// text -> your tact score
	      	var desc_span = document.createElement("SPAN");
	      	desc_span.textContent = "Your Tact Score";
	      	tactChart_desc.insertBefore(desc_span, tactChart_desc.firstChild);
	      	var br = document.createElement("BR");
	      	tactChart_desc.insertBefore(br, desc_span.nextSibling);
	var confirmOne_btns = document.createElement("DIV");
	confirmOne_btns.setAttribute("id", "confirm-one-btns");
	confirmOneIn.appendChild(confirmOne_btns);
		var confirmOne_back = document.createElement("DIV");
		confirmOne_back.setAttribute("id", "confirm-one-back");
		confirmOne_back.setAttribute("class", "inline");
		confirmOne_back.textContent = "Back";
		confirmOne_btns.appendChild(confirmOne_back);
		var confirmOne_confirm = document.createElement("DIV");
		confirmOne_confirm.setAttribute("id", "confirm-one-confirm");
		confirmOne_confirm.setAttribute("class", "inline");
		confirmOne_confirm.textContent = "Confirm";
		confirmOne_btns.appendChild(confirmOne_confirm);

	return confirmOne;
}

function appendConfirmOne() {
	var createC1 = createConfirmOne();
	document.body.insertBefore(createC1, document.body.firstchild);
}

appendConfirmOne();
//======================================================================================//
// d3 donut Chart.
//======================================================================================//
var d3Js = document.createElement("script");
d3Js.src = chrome.extension.getURL("d3.min.js");
d3Js.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(d3Js);

	var dataset = [
		{label: 'Positive', count:10},
		{label: 'Negative', count:90}
	];

function d3Chart (div) {

	var width = 170,
		height = 170;

	var radius = Math.min(width, height) / 2;
	var donutWidth = 5;

	var color = d3.scale.ordinal()
			   .range(["#31CFFF", "#FF2222"]);

	var svg = d3.select(div)
			  .append('svg')
			  .attr('width', width)
			  .attr('height', height)
			  .append('g')
			  .attr('transform', 'translate(' + (width/2)+',' + (height/2) + ')');

	var arc = d3.svg.arc()
		      .innerRadius(radius - donutWidth)
		      .outerRadius(radius);

	var pie = d3.layout.pie()
			  .value(function(d){ return d.count; })
			  .sort(null);

	var path = svg.selectAll('path')
		       .data(pie(dataset))
		       .enter()
		       .append('path')
		       .attr('d', arc)
		       .attr('fill', function(d, i){
		       	return color(d.data.label);
		       });
}

d3Chart("#tactly-chart");
d3Chart("#tactly-chart-c1");

