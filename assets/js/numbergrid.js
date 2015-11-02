var grid = (function($) {

  var init = function() {
    var html = $('<div/>').attr('id', 'grid');
    for(var i=1; i<101; i++) {

      var cellHtml = $('<div data-cell="'+i+'"/>').html(i);
      var cell = $('<div class="cell" />').html(cellHtml);

      $(cell).on('click', function(e) {
        e.stopPropagation();
        $(e.target).toggleClass('selected');
        updateUI();
        showRelated($(e.target).data('cell'));
      });

      $(html).append(cell);

    }

    var reset = $('<button/>').attr('id', 'reset').html('reset');

    $(reset).on('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      clearUI();
    });

    $(html).append(reset);

    return html;
  };

  var clearUI = function() {
    $('#grid .cell div')
      .removeClass('related')
      .removeClass('total')
      .removeClass('difference')
      .removeClass('selected');
  }

  var updateUI = function() {
    var selected = getSelected();
    calcTotal(selected);
    calcDifference(selected);
  }

  var getSelected = function() {
    return $('.selected').map(function(indx, obj) {
      return $(obj).data('cell');
    }).get();
  }

  var calcTotal = function(selected) {

    $('#grid .cell div.total').removeClass('total');

    if(selected.length == 2) {
      var total = selected.reduce(function(a,b) { return a+b; }, 0);
      $('#grid .cell div[data-cell="'+total+'"]').addClass('total');
    }

  }

  var calcDifference = function(selected) {

    $('#grid .cell div.difference').removeClass('difference');

    if(selected.length == 2) {
      var difference = selected.reduce(function(a,b) { return a-b; }, selected.pop());
      $('#grid .cell div[data-cell="'+difference+'"]').addClass('difference');
    }

  }

  var showAllRelated = function(selected) {
    for(var i=0; i<selected.length; i++) {
      var numbr = selected[i]+"";
      var base = parseInt(numbr.substr(numbr.length-1, 1));
      var j=0;

      while(j<=100) {
        var related = base+j;
        j=j+10;
        $('#grid .cell div[data-cell="'+(related)+'"]').addClass('related');
      }
    }
  }

  var showRelated = function(selected) {
    var numbr = selected+"";
      var base = parseInt(numbr.substr(numbr.length-1, 1));
      var j=0;

      while(j<=100) {
        var related = base+j;
        j=j+10;
        $('#grid .cell div[data-cell="'+(related)+'"]').addClass('related');
      }
  }

  return {
    toHtml: function() {
      var gridHtml = init();
      $('body').append(gridHtml);
    },
  }

})(jQuery);

jQuery(function($) {
  grid.toHtml()
});
