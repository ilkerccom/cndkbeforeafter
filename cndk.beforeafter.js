$.fn.cndkbeforeafter = function(options) {

    // Default settings
    var settings = $.extend({
        mode: "drag", /* hover,drag */
        showText: true,
        beforeText: "BEFORE",
        afterText: "AFTER",
        seperatorWidth: "5px",
        seperatorColor: "#ffffff",
        hoverEffect: true,
    }, options);

    // This
    var element = this;

    // Wait for image(s) loading
    var img = new Image();
    img.src = $(this).find(">div").eq(0).find('div[data-type="before"] img').attr("src"); 
    img.onload = function() {
        runCndkBeforeAfter(element);
    };

    // Run Plugin
    function runCndkBeforeAfter(element)
    {
        element.each(function() { 

            // Get contents
            var count = $(this).find(">div>div").length;
            if(count <= 1)
            {
                // No images
                console.log("(cndk.beforeafter.js) Error -> No before-after images found.");
            }

            // Continue
            var root = $(this);
            root.addClass("cndkbeforeafter cndkbeforeafter-root");
            root.append("<div class='cndkbeforeafter-seperator' style='width:"+settings.seperatorWidth+" ;background:"+settings.seperatorColor+"'></div>");

            // Container
            root.append("<div class='cndkbeforeafter-container'></div>");

            // Hover Effect
            if(settings.hoverEffect == true)
            {
                root.addClass("cndkbeforeafter-hover");
            }

            // Before-After text
            if(settings.showText == true)
            {
                root.append("<div class='cndkbeforeafter-item-before-text'>"+settings.beforeText+"</div>");
                root.append("<div class='cndkbeforeafter-item-after-text'>"+settings.afterText+"</div>");
            }

            for(i=0; i<count; i++)
            {
                // Before
                var div1 = $(this).find(">div").eq(i).find('div[data-type="before"]');
                var img1 = $(this).find(">div").eq(i).find('div[data-type="before"] img');
                img1.addClass("cndkbeforeafter-item-before");
                div1.addClass("cndkbeforeafter-item-before-c");
                div1.css("overflow","hidden");
                div1.css("z-index","2");

                // After
                var div2 = $(this).find(">div").eq(i).find('div[data-type="after"]');
                var img2 = $(this).find(">div").eq(i).find('div[data-type="after"] img');
                img2.addClass("cndkbeforeafter-item-after");
                div2.addClass("cndkbeforeafter-item-after-c");
                div2.css("z-index","1");

                // Image-Item width/height
                var itemwidth = img1.width();
                var itemheight = img1.height();

                // Screen width
                var screenWidth = $(this).parent().width();
                if(screenWidth < itemwidth)
                {
                    itemheight = itemheight/(itemwidth/screenWidth);
                    itemwidth = screenWidth;
                    img1.css("width", itemwidth + "px");
                    img2.css("width", itemwidth + "px");
                }

                // Item
                $(this).find(">div").eq(0).addClass("cndkbeforeafter-item");
                $(this).find(">div").eq(0).css("height",itemheight + "px");

                // Start position
                div1.css("width","50%");
                div2.css("width","50%");
                $(".cndkbeforeafter-seperator").css("left","50%");

                // Root inline
                root.css("width",itemwidth + "px");
                root.css("height",itemheight + "px");
            }

            if(settings.mode == "hover")
            {
                $(root).find(".cndkbeforeafter-seperator, .cndkbeforeafter-item > div").addClass("cndkbeforeafter-hover-transition");
                $(root).mousemove(function(e){
                    var parentOffset = $(this).offset();
                    var mouseX = parseInt((e.pageX - parentOffset.left));
                    var mousePercent = (mouseX*100)/parseInt(root.width());
                    $(this).find(".cndkbeforeafter-item-before-c").css("width",mousePercent+"%");
                    $(this).find(".cndkbeforeafter-item-after-c").css("width",(100-mousePercent)+"%");
                    $(this).find(".cndkbeforeafter-seperator").css("left",mousePercent+"%");
                }).mouseleave(function(){
                    $(this).find(".cndkbeforeafter-item-after-c").css("width","50%");
                    $(this).find(".cndkbeforeafter-item-before-c").css("width","50%");
                    $(this).find(".cndkbeforeafter-seperator").css("left","50%");
                });
            }
            else if(settings.mode == "drag")
            {
                $(root).find(".cndkbeforeafter-seperator, .cndkbeforeafter-item > div").addClass("cndkbeforeafter-drag-transition");
                $(root).click(function(e){
                    var parentOffset = $(this).offset();
                    var mouseX = parseInt((e.pageX - parentOffset.left));
                    var mousePercent = (mouseX*100)/parseInt(root.width());
                    $(this).find(".cndkbeforeafter-item-before-c").css("width",mousePercent+"%");
                    $(this).find(".cndkbeforeafter-item-after-c").css("width",(100-mousePercent)+"%");
                    $(this).find(".cndkbeforeafter-seperator").css("left",mousePercent+"%");
                });

                // Draggable seperator
                var isSliding = false;
                var currentElement = (root);
                currentElement.find(".cndkbeforeafter-seperator").on("mousedown",function(e){
                    isSliding = true;
                    currentElement.find(".cndkbeforeafter-seperator, .cndkbeforeafter-item > div").removeClass("cndkbeforeafter-drag-transition");
                    currentElement.mousemove(function(e){
                        if(isSliding) {
                            var parentOffset = currentElement.offset();
                            var mouseX = parseInt((e.pageX - parentOffset.left));
                            var mousePercent = (mouseX*100)/parseInt(root.width());
                            currentElement.find(".cndkbeforeafter-item-before-c").css("width",mousePercent+"%");
                            currentElement.find(".cndkbeforeafter-item-after-c").css("width",(100-mousePercent)+"%");
                            currentElement.find(".cndkbeforeafter-seperator").css("left",mousePercent+"%");
                        }
                    });
                });

                // Release
                currentElement.find(".cndkbeforeafter-seperator").on("mouseup",function(e){
                    isSliding = false;
                    currentElement.find(".cndkbeforeafter-seperator, .cndkbeforeafter-item > div").addClass("cndkbeforeafter-drag-transition");
                });

                // Add visual to seperator
                currentElement.find(".cndkbeforeafter-seperator").append("<div><span></span></div>");
            }

            $( window ).resize(function() {
                
            });
        });
    }
};