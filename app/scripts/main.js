/*
$(function() {
	var $showcase = $('.m-work'),
		$detail = $showcase.find('.m-detail'),
		$grid = $showcase.find('.grid'),
		$trigger = $detail.find('.js-close'),
		$cards = $showcase.find('.m-project'),
		$body = $('body'),
		gridViewClass = 'showcase-gridview';

	console.log($cards)

	var init = function(){


		// Set project container size
		$showcase.height($grid.height());


		$trigger.on('click', function(){
			showGrid();
			return false;
		});

		$cards.on('click', function(){
			showScreen($(this));
			return false;
		});

		$body.off('keyup').on('keyup', function(e) {
			//if user press esc or enter
			if (e.keyCode == 27 || e.keyCode == 13) {
				showGrid();
			}
		});

		/*$body.off('click').on('click', function() {
			showGrid();
		});*/
	/*}();


	var showGrid = function(){
		$showcase.addClass(gridViewClass);
	}


	var showScreen = function($card){
		$showcase.removeClass(gridViewClass);
		scrollToDetail();
		if($card){
			$detail.find('[data-project]').hide()
			$detail.find('[data-project="'+$card.data('project')+'"]').show();
		}
	}

	var scrollToDetail = function(){
		$('html,body').animate({scrollTop: $showcase.offset().top}, 400);
	}

});
*/

(function($, w, undefined){

	"use strict";

	var MR = window.MR = window.MR || {};

	MR.showcase = (function(){

		var $showcase = $('.m-work'),
			$detail = $showcase.find('.m-detail'),
			$grid = $showcase.find('.grid'),
			$trigger = $detail.find('.js-close'),
			$cards = $showcase.find('.m-project'),
			$body = $('body'),
			gridViewClass = 'showcase-gridview';

		var init = function(){
			// Set project container size
			$showcase.height($grid.height());

			$trigger.on('click', function(){
				showGrid();
				return false;
			});

			$cards.on('click', function(){
				showScreen($(this));
				return false;
			});

			$body.off('keyup').on('keyup', function(e) {
				//if user press esc or enter
				if (e.keyCode == 27 || e.keyCode == 13) {
					showGrid();
				}
			});
		};

		// Show the grid view (public)
		var showGrid = function(){
			$showcase.addClass(gridViewClass);
		};

		// Show specific project
		var showScreen = function($card){
			$showcase.removeClass(gridViewClass);
			scrollToDetail();
			if($card){
				$detail.find('[data-project]').hide()
				$detail.find('[data-project="'+$card.data('project')+'"]').show();
			}
		};

		var scrollToDetail = function(){
			$('html,body').animate({scrollTop: $showcase.offset().top}, 400);
		};

		return{
			init: init
		}
	})();

})(jQuery, window);

// Call the init when dom is ready
$(document).ready(
	MR.showcase.init
);

