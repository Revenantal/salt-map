$(function() {
    $.ajax({
        dataType: "json",
        url: "resources/MapData.txt"
    })
    .done(function(data) {
        var boundaries = { minX: -50, maxX: 50, minY: -50, maxY: 50};
        var $map = $('#map');


        var x = boundaries.minX;
        var y = boundaries.minY;
        var map = '';
        var width = (Math.abs(boundaries.minX) + Math.abs(boundaries.maxX)+1) * 52;
        while (y <= boundaries.maxY) {
            
            map += "<div class='row' style='width:"+width+"px'>";
            while (x <= boundaries.maxX) {
                map += "<div class='cell' x='"+x+"' y='"+y+"'></div>";
                x++;
            }
            map += "<div style='clear:both;'></div></div>";
            x = boundaries.minX;
            y++;
        }

        $map.css("width", width);
        $map.append(map);

        
        $.each(data['nodes'], function( index, island ) {
            if ((island.x >= boundaries.minX && island.x <= boundaries.maxX) &&
                (island.y >= boundaries.minY && island.y <= boundaries.maxY)) {           
                    $(".cell[x='"+island.x+"'][y='"+island.y+"']").addClass('island');
                }
        });

        $( ".cell" ).mouseenter(function() {
            $(".x").text($(this).attr( "x" ));
            $(".y").text($(this).attr( "y" ));
        });

        
        var $section = $('body');
        var $panzoom = $map.panzoom();
        $panzoom.parent().on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: false,
            focal: e
            });
        });
    });
});