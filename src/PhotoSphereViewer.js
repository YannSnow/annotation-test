/*
 * Photo Sphere Viewer v2.8
 * http://jeremyheleine.me/photo-sphere-viewer
 *
 * Copyright (c) 2014,2015 Jérémy Heleine
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Represents a panorama viewer.
 * @class
 * @param {object} args - Settings to apply to the viewer
 * @param {string} args.panorama - Panorama URL or path (absolute or relative)
 * @param {HTMLElement|string} args.container - Panorama container (should be a `div` or equivalent), can be a string (the ID of the element to retrieve)
 * @param {object} args.overlay - Image to add over the panorama
 * @param {string} args.overlay.image - Image URL or path
 * @param {object} [args.overlay.position=null] - Image position (default to the bottom left corner)
 * @param {string} [args.overlay.position.x=null] - Horizontal image position ('left' or 'right')
 * @param {string} [args.overlay.position.y=null] - Vertical image position ('top' or 'bottom')
 * @param {object} [args.overlay.size=null] - Image size (if it needs to be resized)
 * @param {number|string} [args.overlay.size.width=null] - Image width (in pixels or a percentage, like '20%')
 * @param {number|string} [args.overlay.size.height=null] - Image height (in pixels or a percentage, like '20%')
 * @param {integer} [args.segments=100] - Number of segments on the sphere
 * @param {integer} [args.rings=100] - Number of rings on the sphere
 * @param {boolean} [args.autoload=true] - `true` to automatically load the panorama, `false` to load it later (with the {@link PhotoSphereViewer#load|`.load`} method)
 * @param {boolean} [args.usexmpdata=true] - `true` if Photo Sphere Viewer must read XMP data, `false` if it is not necessary
 * @param {boolean} [args.cors_anonymous=true] - `true` to disable the exchange of user credentials via cookies, `false` otherwise
 * @param {object} [args.pano_size=null] - The panorama size, if cropped (unnecessary if XMP data can be read)
 * @param {number} [args.pano_size.full_width=null] - The full panorama width, before crop (the image width if `null`)
 * @param {number} [args.pano_size.full_height=null] - The full panorama height, before crop (the image height if `null`)
 * @param {number} [args.pano_size.cropped_width=null] - The cropped panorama width (the image width if `null`)
 * @param {number} [args.pano_size.cropped_height=null] - The cropped panorama height (the image height if `null`)
 * @param {number} [args.pano_size.cropped_x=null] - The cropped panorama horizontal offset relative to the full width (middle if `null`)
 * @param {number} [args.pano_size.cropped_y=null] - The cropped panorama vertical offset relative to the full height (middle if `null`)
 * @param {object} [args.captured_view=null] - The real captured view, compared to the theoritical 360°×180° possible view
 * @param {number} [args.captured_view.horizontal_fov=360] - The horizontal captured field of view in degrees (default to 360°)
 * @param {number} [args.captured_view.vertical_fov=180] - The vertical captured field of view in degrees (default to 180°)
 * @param {object} [args.default_position] - Defines the default position (the first point seen by the user)
 * @param {number|string} [args.default_position.long=0] - Default longitude, in radians (or in degrees if indicated, e.g. `'45deg'`)
 * @param {number|string} [args.default_position.lat=0] - Default latitude, in radians (or in degrees if indicated, e.g. `'45deg'`)
 * @param {number} [args.min_fov=30] - The minimal field of view, in degrees, between 1 and 179
 * @param {number} [args.max_fov=90] - The maximal field of view, in degrees, between 1 and 179
 * @param {boolean} [args.allow_user_interactions=true] - If set to `false`, the user won't be able to interact with the panorama (navigation bar is then disabled)
 * @param {boolean} [args.allow_scroll_to_zoom=true] - It set to `false`, the user won't be able to scroll with their mouse to zoom
 * @param {number|string} [args.tilt_up_max=π/2] - The maximal tilt up angle, in radians (or in degrees if indicated, e.g. `'30deg'`)
 * @param {number|string} [args.tilt_down_max=π/2] - The maximal tilt down angle, in radians (or in degrees if indicated, e.g. `'30deg'`)
 * @param {number|string} [args.min_longitude=0] - The minimal longitude to show
 * @param {number|string} [args.max_longitude=2π] - The maximal longitude to show
 * @param {number} [args.zoom_level=0] - The default zoom level, between 0 and 100
 * @param {boolean} [args.smooth_user_moves=true] - If set to `false` user moves have a speed fixed by `long_offset` and `lat_offset`
 * @param {number} [args.long_offset=π/360] - The longitude to travel per pixel moved by mouse/touch
 * @param {number} [args.lat_offset=π/180] - The latitude to travel per pixel moved by mouse/touch
 * @param {number|string} [args.keyboard_long_offset=π/60] - The longitude to travel when the user hits the left/right arrow
 * @param {number|string} [args.keyboard_lat_offset=π/120] - The latitude to travel when the user hits the up/down arrow
 * @param {integer} [args.time_anim=2000] - Delay before automatically animating the panorama in milliseconds, `false` to not animate
 * @param {boolean} [args.reverse_anim=true] - `true` if horizontal animation must be reversed when min/max longitude is reached (only if the whole circle is not described)
 * @param {string} [args.anim_speed=2rpm] - Animation speed in radians/degrees/revolutions per second/minute
 * @param {string} [args.vertical_anim_speed=2rpm] - Vertical animation speed in radians/degrees/revolutions per second/minute
 * @param {number|string} [args.vertical_anim_target=0] - Latitude to target during the autorotate animation, default to the equator
 * @param {boolean} [args.navbar=false] - Display the navigation bar if set to `true`
 * @param {object} [args.navbar_style] - Style of the navigation bar
 * @param {string} [args.navbar_style.backgroundColor=rgba(61, 61, 61, 0.5)] - Navigation bar background color
 * @param {string} [args.navbar_style.buttonsColor=rgba(255, 255, 255, 0.7)] - Buttons foreground color
 * @param {string} [args.navbar_style.buttonsBackgroundColor=transparent] - Buttons background color
 * @param {string} [args.navbar_style.activeButtonsBackgroundColor=rgba(255, 255, 255, 0.1)] - Active buttons background color
 * @param {number} [args.navbar_style.buttonsHeight=20] - Buttons height in pixels
 * @param {number} [args.navbar_style.autorotateThickness=1] - Autorotate icon thickness in pixels
 * @param {number} [args.navbar_style.zoomRangeWidth=50] - Zoom range width in pixels
 * @param {number} [args.navbar_style.zoomRangeThickness=1] - Zoom range thickness in pixels
 * @param {number} [args.navbar_style.zoomRangeDisk=7] - Zoom range disk diameter in pixels
 * @param {number} [args.navbar_style.fullscreenRatio=4/3] - Fullscreen icon ratio (width/height)
 * @param {number} [args.navbar_style.fullscreenThickness=2] - Fullscreen icon thickness in pixels
 * @param {number} [args.eyes_offset=5] - Eyes offset in VR mode
 * @param {string} [args.loading_msg=Loading…] - Loading message
 * @param {string} [args.loading_img=null] - Loading image URL or path (absolute or relative)
 * @param {HTMLElement|string} [args.loading_html=null] - An HTML loader (element to append to the container or string representing the HTML)
 * @param {object} [args.size] - Final size of the panorama container (e.g. {width: 500, height: 300})
 * @param {(number|string)} [args.size.width] - Final width in percentage (e.g. `'50%'`) or pixels (e.g. `500` or `'500px'`) ; default to current width
 * @param {(number|string)} [args.size.height] - Final height in percentage or pixels
  ; default to current height
 * @param {PhotoSphereViewer~onReady} [args.onready] - Function called once the panorama is ready and the first image is displayed
 **/

var PhotoSphereViewer = function(args) {
    /**
     * Detects whether canvas is supported.
     * @private
     * @return {boolean} `true` if canvas is supported, `false` otherwise
     **/


    var labeling_k = false;
    var labeling_m = false;

    var targetting_k = false;
    var targetting_m = false;

    var b_points = new Array();
    var b_lpoints = new Array();
    var b_4points = new Array();

    var box_tl, box_tr, box_br, box_bl;

    var lines;
    var lines_array = new Array();

    var h;
    var w;
    var obj;

    var raycasterPoint = new THREE.Vector3();

    var outputClasses = new Array();
    var outputLClasses = new Array();

    var outputName = args.inputname;

    var isCanvasSupported = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        var can_pano0 = document.getElementById('your-pano');
        ctx.fillRect((can_pano0.bottom - can_pano0.top) / 2 - 5, (can_pano0.right - can_pano0.left) / 2 - 5, (can_pano0.bottom - can_pano0.top) / 2 + 5, (can_pano0.right - can_pano0.left) / 2 + 5);
        return !!(canvas.getContext && canvas.getContext('2d'));
    };

    /**
     * Detects whether WebGL is supported.
     * @private
     * @return {boolean} `true` if WebGL is supported, `false` otherwise
     **/

    var isWebGLSupported = function() {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    };

    /**
     * Attaches an event handler function to an element.
     * @private
     * @param {HTMLElement} elt - The element
     * @param {string} evt - The event name
     * @param {function} f - The handler function
     * @return {void}
     **/

    var addEvent = function(elt, evt, f) {
        if (!!elt.addEventListener)
            elt.addEventListener(evt, f, false);
        else
            elt.attachEvent('on' + evt, f);
    };

    /**
     * Ensures that a number is in a given interval.
     * @private
     * @param {number} x - The number to check
     * @param {number} min - First endpoint
     * @param {number} max - Second endpoint
     * @return {number} The checked number
     **/

    var stayBetween = function(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    /**
     * Calculates the distance between two points (square of the distance is enough).
     * @private
     * @param {number} x1 - First point horizontal coordinate
     * @param {number} y1 - First point vertical coordinate
     * @param {number} x2 - Second point horizontal coordinate
     * @param {number} y2 - Second point vertical coordinate
     * @return {number} Square of the wanted distance
     **/

    var dist = function(x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        return x * x + y * y;
    };

    /**
     * Returns the measure of an angle (between 0 and 2π).
     * @private
     * @param {number} angle - The angle to reduce
     * @param {boolean} [is_2pi_allowed=false] - Can the measure be equal to 2π?
     * @return {number} The wanted measure
     **/

    var getAngleMeasure = function(angle, is_2pi_allowed) {
        is_2pi_allowed = (is_2pi_allowed !== undefined) ? !!is_2pi_allowed : false;
        return (is_2pi_allowed && angle == 2 * Math.PI) ? 2 * Math.PI : angle - Math.floor(angle / (2.0 * Math.PI)) * 2.0 * Math.PI;
    };

    /**
     * Starts to load the panorama.
     * @public
     * @return {void}
     **/

    this.load = function() {
        container.innerHTML = '';

        // Loading HTML: HTMLElement
        if (!!loading_html && loading_html.nodeType === 1)
            container.appendChild(loading_html);

        // Loading HTML: string
        else if (!!loading_html && typeof loading_html == 'string')
            container.innerHTML = loading_html;

        // Loading image
        else if (!!loading_img) {
            var loading = document.createElement('img');
            loading.setAttribute('src', loading_img);
            loading.setAttribute('alt', loading_msg);
            container.appendChild(loading);
        }

        // Loading text
        else
            container.textContent = loading_msg;

        // Adds a new container
        root = document.createElement('div');
        root.style.width = '100%';
        root.style.height = '100%';
        root.style.position = 'relative';
        root.style.overflow = 'hidden';

        // Is canvas supported?
        if (!isCanvasSupported()) {
            container.textContent = 'Canvas is not supported, update your browser!';
            return;
        }

        // Is Three.js loaded?
        if (window.THREE === undefined) {
            console.log('PhotoSphereViewer: Three.js is not loaded.');
            return;
        }

        // Current viewer size
        viewer_size = {
            width: 0,
            height: 0,
            ratio: 0
        };

        // XMP data?
        if (readxmp && !panorama.match(/^data:image\/[a-z]+;base64/))
            loadXMP();

        else
            createBuffer();
    };

    /**
     * Returns Google's XMP data.
     * @private
     * @param {string} file - Binary file
     * @return {string} The data
     **/

    var getXMPData = function(file) {
        var a = 0,
            b = 0;
        var data = '';

        while ((a = file.indexOf('<x:xmpmeta', b)) != -1 && (b = file.indexOf('</x:xmpmeta>', a)) != -1) {
            data = file.substring(a, b);
            if (data.indexOf('GPano:') != -1)
                return data;
        }

        return '';
    };

    /**
     * Returns the value of a given attribute in the panorama metadata.
     * @private
     * @param {string} data - The panorama metadata
     * @param {string} attr - The wanted attribute
     * @return {string} The value of the attribute
     **/

    var getAttribute = function(data, attr) {
        var a = data.indexOf('GPano:' + attr) + attr.length + 8,
            b = data.indexOf('"', a);

        if (b == -1) {
            // XML-Metadata
            a = data.indexOf('GPano:' + attr) + attr.length + 7;
            b = data.indexOf('<', a);
        }

        return data.substring(a, b);
    };

    /**
     * Loads the XMP data with AJAX.
     * @private
     * @return {void}
     **/

    var loadXMP = function() {
        var xhr = null;

        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();

        else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
        } else {
            container.textContent = 'XHR is not supported, update your browser!';
            return;
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Metadata
                var data = getXMPData(xhr.responseText);

                if (!data.length) {
                    createBuffer();
                    return;
                }

                // Useful values
                pano_size = {
                    full_width: parseInt(getAttribute(data, 'FullPanoWidthPixels')),
                    full_height: parseInt(getAttribute(data, 'FullPanoHeightPixels')),
                    cropped_width: parseInt(getAttribute(data, 'CroppedAreaImageWidthPixels')),
                    cropped_height: parseInt(getAttribute(data, 'CroppedAreaImageHeightPixels')),
                    cropped_x: parseInt(getAttribute(data, 'CroppedAreaLeftPixels')),
                    cropped_y: parseInt(getAttribute(data, 'CroppedAreaTopPixels')),
                };

                recalculate_coords = true;
                createBuffer();
            }
        };

        xhr.open('GET', panorama, true);
        xhr.send(null);
    };

    /**
     * Creates an image in the right dimensions.
     * @private
     * @return {void}
     **/

    var createBuffer = function() {
        var img = new Image();

        img.onload = function() {
            // Must the pano size be changed?
            var default_pano_size = {
                full_width: img.width,
                full_height: img.height,
                cropped_width: img.width,
                cropped_height: img.height,
                cropped_x: null,
                cropped_y: null
            };

            // Captured view?
            if (captured_view.horizontal_fov != 360 || captured_view.vertical_fov != 180) {
                // The indicated view is the cropped panorama
                pano_size.cropped_width = default_pano_size.cropped_width;
                pano_size.cropped_height = default_pano_size.cropped_height;
                pano_size.full_width = default_pano_size.full_width;
                pano_size.full_height = default_pano_size.full_height;

                // Horizontal FOV indicated
                if (captured_view.horizontal_fov != 360) {
                    var rh = captured_view.horizontal_fov / 360.0;
                    pano_size.full_width = pano_size.cropped_width / rh;
                }

                // Vertical FOV indicated
                if (captured_view.vertical_fov != 180) {
                    var rv = captured_view.vertical_fov / 180.0;
                    pano_size.full_height = pano_size.cropped_height / rv;
                }
            } else {
                // Cropped panorama: dimensions defined by the user
                for (var attr in pano_size) {
                    if (pano_size[attr] === null && default_pano_size[attr] !== undefined)
                        pano_size[attr] = default_pano_size[attr];
                }

                // Do we have to recalculate the coordinates?
                if (recalculate_coords) {
                    if (pano_size.cropped_width != default_pano_size.cropped_width) {
                        var rx = default_pano_size.cropped_width / pano_size.cropped_width;
                        pano_size.cropped_width = default_pano_size.cropped_width;
                        pano_size.full_width *= rx;
                        pano_size.cropped_x *= rx;
                    }

                    if (pano_size.cropped_height != default_pano_size.cropped_height) {
                        var ry = default_pano_size.cropped_height / pano_size.cropped_height;
                        pano_size.cropped_height = default_pano_size.cropped_height;
                        pano_size.full_height *= ry;
                        pano_size.cropped_y *= ry;
                    }
                }
            }

            // Middle if cropped_x/y is null
            if (pano_size.cropped_x === null)
                pano_size.cropped_x = (pano_size.full_width - pano_size.cropped_width) / 2;

            if (pano_size.cropped_y === null)
                pano_size.cropped_y = (pano_size.full_height - pano_size.cropped_height) / 2;

            // Size limit for mobile compatibility
            var max_width = 2048;
            if (isWebGLSupported()) {
                var canvas_tmp = document.createElement('canvas');
                var ctx_tmp = canvas_tmp.getContext('webgl');
                max_width = ctx_tmp.getParameter(ctx_tmp.MAX_TEXTURE_SIZE);
            }

            // Buffer width (not too big)
            var new_width = Math.min(pano_size.full_width, max_width);
            var r = new_width / pano_size.full_width;

            pano_size.full_width = new_width;
            pano_size.cropped_width *= r;
            pano_size.cropped_x *= r;
            img.width = pano_size.cropped_width;

            // Buffer height (proportional to the width)
            pano_size.full_height *= r;
            pano_size.cropped_height *= r;
            pano_size.cropped_y *= r;
            img.height = pano_size.cropped_height;

            // Buffer creation
            var buffer = document.createElement('canvas');
            buffer.width = pano_size.full_width;
            buffer.height = pano_size.full_height;

            var ctx = buffer.getContext('2d');
            ctx.drawImage(img, pano_size.cropped_x, pano_size.cropped_y, pano_size.cropped_width, pano_size.cropped_height);

            loadTexture(buffer.toDataURL('image/jpeg'));
        };

        // CORS when the panorama is not given as a base64 string
        if (cors_anonymous && !panorama.match(/^data:image\/[a-z]+;base64/))
            img.setAttribute('crossOrigin', 'anonymous');

        img.src = panorama;
    };

    /**
     * Loads the sphere texture.
     * @private
     * @param {string} path - Path to the panorama
     * @return {void}
     **/

    var loadTexture = function(path) {
        var texture = new THREE.Texture();
        var loader = new THREE.ImageLoader();

        var onLoad = function(img) {
            texture.needsUpdate = true;
            texture.image = img;
            w = img.width;
            h = img.height;
            console.log(w, h)
            createScene(texture);

        };

        loader.load(path, onLoad);
    };

    /**
     * Creates the 3D scene.
     * @private
     * @param {THREE.Texture} texture - The sphere texture
     * @return {void}
     **/

    var createScene = function(texture) {
        // New size?
        if (new_viewer_size.width !== undefined)
            container.style.width = new_viewer_size.width.css;

        if (new_viewer_size.height !== undefined)
            container.style.height = new_viewer_size.height.css;

        fitToContainer();

        // The chosen renderer depends on whether WebGL is supported or not
        renderer = (isWebGLSupported()) ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
        renderer.setSize(viewer_size.width, viewer_size.height);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(PSV_FOV_MAX, viewer_size.ratio, 1, 200);
        camera.position.set(0, 0, 0);
        camera.lookAt(8.84, 135.64, 146.7);

        scene.add(camera);

        // Sphere
        var geometry = new THREE.SphereGeometry(200, rings, segments);
        //geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: true });
        material.side = THREE.DoubleSide;
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = -1;


        scene.add(mesh);

        obj = mesh;

        // var geometry1 = new THREE.SphereGeometry(300, rings, segments);
        // var material1 = new THREE.MeshBasicMaterial({map: texture, overdraw: true});
        // var mesh1 = new THREE.Mesh(geometry1, material1);
        // mesh1.scale.x = -1;
        // scene.add(mesh1);


        // Canvas container
        canvas_container = document.createElement('div');
        canvas_container.style.position = 'absolute';
        canvas_container.style.zIndex = 0;
        root.appendChild(canvas_container);

        // Navigation bar?
        if (display_navbar) {
            navbar.setStyle(navbar_style);
            navbar.create();
            root.appendChild(navbar.getBar());
        }

        // Overlay?
        if (overlay !== null) {
            // Add the image
            var overlay_img = document.createElement('img');

            overlay_img.onload = function() {
                overlay_img.style.display = 'block';

                // Image position
                overlay_img.style.position = 'absolute';
                overlay_img.style[overlay.position.x] = '5px';
                overlay_img.style[overlay.position.y] = '5px';

                if (overlay.position.y == 'bottom' && display_navbar)
                    overlay_img.style.bottom = (navbar.getBar().offsetHeight + 5) + 'px';

                // Should we resize the image?
                if (overlay.size !== undefined) {
                    overlay_img.style.width = overlay.size.width;
                    overlay_img.style.height = overlay.size.height;
                }

                root.appendChild(overlay_img);
            };

            overlay_img.src = overlay.image;
        }

        // Adding events
        addEvent(window, 'resize', fitToContainer);

        if (user_interactions_allowed) {
            addEvent(canvas_container, 'mousedown', onMouseDown);
            addEvent(document, 'mousemove', onMouseMove);
            addEvent(canvas_container, 'mousemove', showNavbar);
            addEvent(document, 'mouseup', onMouseUp);

            addEvent(canvas_container, 'touchstart', onTouchStart);
            addEvent(document, 'touchend', onMouseUp);
            addEvent(document, 'touchmove', onTouchMove);

            if (scroll_to_zoom) {
                addEvent(canvas_container, 'mousewheel', onMouseWheel);
                addEvent(canvas_container, 'DOMMouseScroll', onMouseWheel);
            }

            //self.addAction('key', toggleArrowKeys);

            addEvent(document, 'keydown', keyDown);
            addEvent(document, 'keyup', keyUp);
        }

        addEvent(document, 'fullscreenchange', fullscreenToggled);
        addEvent(document, 'mozfullscreenchange', fullscreenToggled);
        addEvent(document, 'webkitfullscreenchange', fullscreenToggled);
        addEvent(document, 'MSFullscreenChange', fullscreenToggled);

        // addEvent(b, 'GenerateFile', GbuttonDown);

        document.getElementById('generate').onclick = function() {
            //deletetst(1);
            console.log(outputClasses)
            saveFile(outputClasses);
            saveLLFile(outputLClasses);

        };
        sphoords.addListener(onDeviceOrientation);

        // First render
        container.innerHTML = '';
        container.appendChild(root);

        var canvas = renderer.domElement;
        canvas.style.display = 'block';

        canvas_container.appendChild(canvas);
        render();

        // Zoom?
        if (zoom_lvl > 0)
            zoom(zoom_lvl);

        // Animation?
        anim();


        /**
         * Indicates that the loading is finished: the first image is rendered
         * @callback PhotoSphereViewer~onReady
         **/

        triggerAction('ready');
    };

    /**
     * Renders an image.
     * @private
     * @return {void}
     **/

    var render = function() {
        var point = new THREE.Vector3();
        point.setX(Math.cos(lat) * Math.sin(long) * 200);
        point.setY(Math.sin(lat) * 200);
        point.setZ(Math.cos(lat) * Math.cos(long) * 200);

        //console.log(point);
        //console.log(camera.position);

        camera.lookAt(point);

        // Stereo?
        if (stereo_effect !== null)
            stereo_effect.render(scene, camera);

        else
            renderer.render(scene, camera);

    };

    /**
     * Starts the stereo effect.
     * @private
     * @return {void}
     **/

    var startStereo = function() {
        stereo_effect = new THREE.StereoEffect(renderer);
        stereo_effect.eyeSeparation = eyes_offset;
        stereo_effect.setSize(viewer_size.width, viewer_size.height);

        startDeviceOrientation();
        enableFullscreen();
        navbar.mustBeHidden();
        render();

        /**
         * Indicates that the stereo effect has been toggled.
         * @callback PhotoSphereViewer~onStereoEffectToggled
         * @param {boolean} enabled - `true` if stereo effect is enabled, `false` otherwise
         **/

        triggerAction('stereo-effect', true);
    };

    /**
     * Stops the stereo effect.
     * @private
     * @return {void}
     **/

    var stopStereo = function() {
        stereo_effect = null;
        renderer.setSize(viewer_size.width, viewer_size.height);

        navbar.mustBeHidden(false);
        render();

        triggerAction('stereo-effect', false);
    };

    /**
     * Toggles the stereo effect (virtual reality).
     * @public
     * @return {void}
     **/

    this.toggleStereo = function() {
        if (stereo_effect !== null)
            stopStereo();

        else
            startStereo();
    };

    /**
     * Automatically animates the panorama.
     * @private
     * @return {void}
     **/

    var anim = function() {
        if (anim_delay !== false)
            anim_timeout = setTimeout(startAutorotate, anim_delay);
    };

    /**
     * Automatically rotates the panorama.
     * @private
     * @return {void}
     **/

    var autorotate = function() {
        lat -= (lat - anim_lat_target) * anim_lat_offset;

        long += anim_long_offset;

        var again = true;

        if (!whole_circle) {
            long = stayBetween(long, PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);

            if (long == PSV_MIN_LONGITUDE || long == PSV_MAX_LONGITUDE) {
                // Must we reverse the animation or simply stop it?
                if (reverse_anim)
                    anim_long_offset *= -1;

                else {
                    stopAutorotate();
                    again = false;
                }
            }
        }

        long = getAngleMeasure(long, true);

        triggerAction('position-updated', {
            longitude: long,
            latitude: lat
        });

        render();

        if (again)
            autorotate_timeout = setTimeout(autorotate, PSV_ANIM_TIMEOUT);
    };

    /**
     * Starts the autorotate animation.
     * @private
     * @return {void}
     **/

    var startAutorotate = function() {
        autorotate();

        /**
         * Indicates that the autorotate animation state has changed.
         * @callback PhotoSphereViewer~onAutorotateChanged
         * @param {boolean} enabled - `true` if animation is enabled, `false` otherwise
         **/

        triggerAction('autorotate', true);
    };

    /**
     * Stops the autorotate animation.
     * @private
     * @return {void}
     **/

    var stopAutorotate = function() {
        clearTimeout(anim_timeout);
        anim_timeout = null;

        clearTimeout(autorotate_timeout);
        autorotate_timeout = null;

        triggerAction('autorotate', false);
    };

    /**
     * Launches/stops the autorotate animation.
     * @public
     * @return {void}
     **/

    this.toggleAutorotate = function() {
        clearTimeout(anim_timeout);

        if (!!autorotate_timeout)
            stopAutorotate();

        else
            startAutorotate();
    };

    /**
     * Resizes the canvas to make it fit the container.
     * @private
     * @return {void}
     **/

    var fitToContainer = function() {
        if (container.clientWidth != viewer_size.width || container.clientHeight != viewer_size.height) {
            resize({
                width: container.clientWidth,
                height: container.clientHeight
            });
        }
    };

    /**
     * Resizes the canvas to make it fit the container.
     * @public
     * @return {void}
     **/

    this.fitToContainer = function() {
        fitToContainer();
    };

    /**
     * Resizes the canvas.
     * @private
     * @param {object} size - New dimensions
     * @param {number} [size.width] - The new canvas width (default to previous width)
     * @param {number} [size.height] - The new canvas height (default to previous height)
     * @return {void}
     **/

    var resize = function(size) {
        viewer_size.width = (size.width !== undefined) ? parseInt(size.width) : viewer_size.width;
        viewer_size.height = (size.height !== undefined) ? parseInt(size.height) : viewer_size.height;
        viewer_size.ratio = viewer_size.width / viewer_size.height;

        if (!!camera) {
            camera.aspect = viewer_size.ratio;
            camera.updateProjectionMatrix();
        }

        if (!!renderer) {
            renderer.setSize(viewer_size.width, viewer_size.height);
            render();
        }

        if (!!stereo_effect) {
            stereo_effect.setSize(viewer_size.width, viewer_size.height);
            render();
        }
    };



    /**
     * Returns the current position in radians
     * @return {object} A longitude/latitude couple
     **/

    this.getPosition = function() {
        return {
            longitude: long,
            latitude: lat
        };
    };

    /**
     * Returns the current position in degrees
     * @return {object} A longitude/latitude couple
     **/

    this.getPositionInDegrees = function() {
        return {
            longitude: long * 180.0 / Math.PI,
            latitude: lat * 180.0 / Math.PI
        };
    };

    /**
     * Moves to a specific position
     * @private
     * @param {number|string} longitude - The longitude of the targeted point
     * @param {number|string} latitude - The latitude of the targeted point
     * @return {void}
     **/

    var moveTo = function(longitude, latitude) {
        var long_tmp = parseAngle(longitude);

        if (!whole_circle)
            long_tmp = stayBetween(long_tmp, PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);

        var lat_tmp = parseAngle(latitude);

        if (lat_tmp > Math.PI)
            lat_tmp -= 2 * Math.PI;

        lat_tmp = stayBetween(lat_tmp, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);

        long = long_tmp;
        lat = lat_tmp;


        //console.log("long", (long_tmp)  * 180 / Math.PI, 'lat', lat_tmp  * 180 / Math.PI);



        /**
         * Indicates that the position has been modified.
         * @callback PhotoSphereViewer~onPositionUpdateed
         * @param {object} position - The new position
         * @param {number} position.longitude - The longitude in radians
         * @param {number} position.latitude - The latitude in radians
         **/

        triggerAction('position-updated', {
            longitude: long,
            latitude: lat
        });

        render();
    };

    /**
     * Moves to a specific position
     * @public
     * @param {number|string} longitude - The longitude of the targeted point
     * @param {number|string} latitude - The latitude of the targeted point
     * @return {void}
     **/

    this.moveTo = function(longitude, latitude) {
        moveTo(longitude, latitude);
    };

    /**
     * Rotates the view
     * @private
     * @param {number|string} dlong - The rotation to apply horizontally
     * @param {number|string} dlat - The rotation to apply vertically
     * @return {void}
     **/

    var rotate = function(dlong, dlat) {
        dlong = parseAngle(dlong);
        dlat = parseAngle(dlat);

        moveTo(long + dlong, lat + dlat);
    };

    /**
     * Rotates the view
     * @public
     * @param {number|string} dlong - The rotation to apply horizontally
     * @param {number|string} dlat - The rotation to apply vertically
     * @return {void}
     **/

    this.rotate = function(dlong, dlat) {
        rotate(dlong, dlat);
    };

    /**
     * Attaches or detaches the keyboard events
     * @private
     * @param {boolean} attach - `true` to attach the event, `false` to detach it
     * @return {void}
     **/

    var toggleArrowKeys = function(attach) {
        var action = (attach) ? window.addEventListener : window.removeEventListener;
        attach = true;
        action('keydown', keyDown);
        action('keyup', KeyUp);
    };

    /**
     * Tries to standardize the code sent by a keyboard event
     * @private
     * @param {KeyboardEvent} evt - The event
     * @return {string} The code
     **/

    var retrieveKey = function(evt) {
        // The Holy Grail
        if (evt.key) {
            var key = (/^Arrow/.test(evt.key)) ? evt.key : 'Arrow' + evt.key;
            return key;
        }

        // Deprecated but still used
        if (evt.keyCode || evt.which) {
            var key_code = (evt.keyCode) ? evt.keyCode : evt.which;

            var keycodes_map = {
                38: 'ArrowUp',
                39: 'ArrowRight',
                40: 'ArrowDown',
                37: 'ArrowLeft',
                18: 'alt'
            };

            if (keycodes_map[key_code] !== undefined)
                return keycodes_map[key_code];
        }

        // :/
        return '';
    };

    /**
     * Rotates the view through keyboard arrows
     * @private
     * @param {KeyboardEvent} evt - The event
     * @return {void}
     **/

    var keyDown = function(evt) {
        var dlong = 0,
            dlat = 0;

        switch (retrieveKey(evt)) {
            case 'ArrowUp':
                dlat = 2 * PSV_KEYBOARD_LAT_OFFSET;
                break;

            case 'Arroww':
                dlat = 2 * PSV_KEYBOARD_LAT_OFFSET;
                break;

            case 'ArrowRight':
                dlong = -2 * PSV_KEYBOARD_LONG_OFFSET;
                break;

            case 'Arrowd':
                dlong = -2 * PSV_KEYBOARD_LONG_OFFSET;
                break;

            case 'ArrowDown':
                dlat = -2 * PSV_KEYBOARD_LAT_OFFSET;
                break;

            case 'Arrows':
                dlat = -2 * PSV_KEYBOARD_LAT_OFFSET;
                break;

            case 'ArrowLeft':
                dlong = 2 * PSV_KEYBOARD_LONG_OFFSET;
                break;

            case 'Arrowa':
                dlong = 2 * PSV_KEYBOARD_LONG_OFFSET;
                break;

            case 'Arrowx':
                targetting_k = true;
                break;

            case 'ArrowX':
                targetting_k = true;
                break;

            case 18:
                labeling_k = true;
                break;

            case 'ArrowControl':
                labeling_k = true;
                break;

            case 'ArrowAlt':
                labeling_k = true;
                break;

            case 'Arrow+':
                zoom(zoom_lvl + 10);
                break;

            case 'Arrowq':
                zoom(zoom_lvl + 10);
                break;

            case 'Arrow-':
                zoom(zoom_lvl - 10);
                break;

            case 'Arrowe':
                zoom(zoom_lvl - 10);
                break;
        }
        //console.log(retrieveKey(evt));

        rotate(dlong, dlat);
    };

    var keyUp = function(evt) {
        labeling_k = false;
        targetting_k = false;
    };



    /**
     * The user wants to move.
     * @private
     * @param {Event} evt - The event
     * @return {void}
     **/

    var onMouseDown = function(evt) {
        b_points = [];
        b_lpoints = [];

        if (labeling_k) {
            labeling_m = true;
            getPoint(evt);
            box_tl = getCoord(evt);
        }
        if (targetting_k ){
            targetting_m = true;
            var foc_pos = new Object();
            var lon;
            foc_pos = getSPosition(evt);
            if(foc_pos.lon < Math.PI/2 && foc_pos.lon > 0){
                lon = foc_pos.lon * -1 + Math.PI/2;
            }else{
                lon = foc_pos.lon * -1 + Math.PI/2*5;
            }
            moveTo(lon , Math.PI/2 - foc_pos.lat);
            console.log(foc_pos.lon * 180/Math.PI, foc_pos.lat * 180 / Math.PI);
        }
        //if(!labeling && !lock) {
        else {
            startMove(parseInt(evt.clientX), parseInt(evt.clientY));
        }
    };

    var getPoint = function(evt) {
        var b_x = parseInt(evt.clientX);
        var b_y = parseInt(evt.clientY);
        var point_obj = new Object();
        var latlon = new Object();

        //var can_pano = document.getElementById('your-pano').getBoundingClientRect();


        latlon = getSPosition(evt);


        point_obj.x = latlon.lon / (2 * Math.PI) * w;
        point_obj.y = latlon.lat / Math.PI * h;

        //console.log(point_obj);
        latlon.lon = latlon.lon * 180 / Math.PI;
        latlon.lat = latlon.lat * 180 / Math.PI;

        b_points.push(point_obj);
        b_lpoints.push(latlon);
    }

     var getSPosition = function(evt){
        var b_x = parseInt(evt.clientX);
        var b_y = parseInt(evt.clientY);
        var lat_lon = new Object();

        var can_pano = document.getElementById('your-pano').getBoundingClientRect();


        lat_lon = outputInfospotPosition(can_pano, b_x, b_y);


        return lat_lon;
        
    }

    var outputInfospotPosition = function(can_pano, b_x, b_y) {
        //console.log(lat / Math.PI * 180, long / Math.PI * 180)\

        var latlon = new Object();

        var vector = new THREE.Vector3(((b_x - can_pano.left) / viewer_size.width) * 2 - 1, -((b_y - can_pano.top) / viewer_size.height) * 2 + 1, 0.50);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        var intersects = raycaster.intersectObject(scene.children[1], true);

        point = intersects[0].point.clone();


        var lati = Math.asin(point.y / 200);
        var longi = Math.acos(point.z / (200 * Math.cos(lati)));
        if (point.x < 0) {
            longi = 2 * Math.PI - longi;
        }

        if (longi <= (Math.PI / 2) && point.x >= 0) {
            longi = Math.PI / 2 - longi;
        } else {
            longi = Math.PI * 5 / 2 - longi;
        }

        latlon.lon = longi;
        latlon.lat = Math.PI / 2 - lati;

        return latlon;

    };

    var getCoord = function(evt) {
        var b_x = parseInt(evt.clientX);
        var b_y = parseInt(evt.clientY);
        var coord_obj = new Object();

        coord_obj = outputInfospotCoord(b_x, b_y);

        console.log(coord_obj)

        return coord_obj;

    };

    var outputInfospotCoord = function(b_x, b_y) {
        //console.log(lat / Math.PI * 180, long / Math.PI * 180)

        var can_pano = document.getElementById('your-pano').getBoundingClientRect();

        var coordPoint = new Object();

        var vector = new THREE.Vector3(((b_x - can_pano.left) / viewer_size.width) * 2 - 1, -((b_y - can_pano.top) / viewer_size.height) * 2 + 1, 0.50);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        var intersects = raycaster.intersectObject(scene.children[1], true);

        point = intersects[0].point.clone();

        var p_vector = new THREE.Vector3(point.x, point.y, point.z);

        coordPoint.b_x = b_x;
        coordPoint.b_y = b_y;
        coordPoint.point = p_vector;

        //console.log('testout', coordPoint)
        return coordPoint;
    };

    /**
     * The user wants to move or to zoom (mobile version).
     * @private
     * @param {Event} evt - The event
     * @return {void}
     **/

    var onTouchStart = function(evt) {
        // Move
        if (evt.touches.length == 1) {
            var touch = evt.touches[0];
            if (touch.target.parentNode == canvas_container)
                startMove(parseInt(touch.clientX), parseInt(touch.clientY));
        }

        // Zoom
        else if (evt.touches.length == 2) {
            onMouseUp();

            if (evt.touches[0].target.parentNode == canvas_container && evt.touches[1].target.parentNode == canvas_container)
                startTouchZoom(dist(evt.touches[0].clientX, evt.touches[0].clientY, evt.touches[1].clientX, evt.touches[1].clientY));
        }

        // Show navigation bar if hidden
        showNavbar();
    };

    /**
     * Initializes the movement.
     * @private
     * @param {integer} x - Horizontal coordinate
     * @param {integer} y - Vertical coordinate
     * @return {void}
     **/

    var startMove = function(x, y) {
        // Store the current position of the mouse
        mouse_x = x;
        mouse_y = y;

        // Stop the animation
        stopAutorotate();

        // Start the movement
        mousedown = true;
        var can_pano = document.getElementById('your-pano').getBoundingClientRect();
        // console.log("x",getAngleMeasure((long-(x - can_pano.left - (can_pano.right-can_pano.left)/2)/ viewer_size.height * fov * Math.PI / 180)),true);
        // console.log("y", stayBetween(lat + ((can_pano.bottom-can_pano.top)/2 - y + can_pano.top) / viewer_size.height * fov * Math.PI / 180, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX));

        // console.log("long,", long);
        // console.log("lat,", lat);
        // console.log("///////////");
    };



    /**
     * Initializes the "pinch to zoom" action.
     * @private
     * @param {number} d - Square of the distance between the two fingers
     * @return {void}
     **/

    var startTouchZoom = function(d) {
        touchzoom_dist = d;

        touchzoom = true;
    };

    /**
     * The user wants to stop moving (or stop zooming with their finger).
     * @private
     * @param {Event} evt - The event
     * @return {void}
     **/

    var onMouseUp = function(evt) {
        mousedown = false;
        touchzoom = false;
        labeling_m = false;
       // if (labeling_k) {
        labeling_k = false;
            getPoint(evt);
        //}
        //console.log("m:"+labeling_m+"k:"+labeling_k+"len:"+b_points.length + ": "+b_points[0]);
        //console.log(b_points[0]);
        //console.log(b_lpoints[0]);

        if (targetting_k && targetting_m){
            targetting_k = false;
            targetting_m = false;
            console.log(targetting_k);
        }


        if ((b_points.length == 2) && (!labeling_m) && (b_lpoints.length == 2)) {
            // if ((b_points.length == 2) && (!labeling_m || !labeling_k)) 
            disp_prompt(b_points, b_lpoints);
            drawBoxes(lines_array);

        }

        getFinalBounding();

    };

    function disp_prompt(points, lpoints) {
        var f_class = new Object();
        var l_class = new Object();
        var name = prompt("input class name", "")
        if (name != null && name != "") {
            f_class.name = name;
            f_class.xmin = Math.ceil(points[0].x);
            f_class.ymin = Math.ceil(points[0].y);
            f_class.xmax = Math.ceil(points[1].x);
            f_class.ymax = Math.ceil(points[1].y);
            f_class.pose = 'Unspecified';
            f_class.truncated = 0;
            f_class.difficult = 0;

            l_class.name = name;
            l_class.xmin = Math.ceil(lpoints[0].lon);
            l_class.ymin = Math.ceil(lpoints[0].lat);
            l_class.xmax = Math.ceil(lpoints[1].lon);
            l_class.ymax = Math.ceil(lpoints[1].lat);
            l_class.pose = 'Unspecified';
            l_class.truncated = 0;
            l_class.difficult = 0;

            outputClasses.push(f_class);
            outputLClasses.push(l_class);

            console.log(outputClasses[outputClasses.length - 1]);
            console.log(outputLClasses[outputLClasses.length - 1]);

            labeling_k = false;
            labeling_m = false;

            /**/
            var box = new Object();
            box.tl = box_tl;
            box.tr = box_tr;
            box.br = box_br;
            box.bl = box_bl;

            b_4points.push(box);
            lines_array.push(lines);

        } else {

            labeling_k = false;
            labeling_m = false;
            scene.remove(lines);
        }

    }

    function drawBox(tl, tr, br, bl) {
        var material, geometry0, line0;
        var geometry1, line1;
        var geometry2, line2;
        var geometry3, line3;

        if (lines) {
            scene.remove(lines);
        }
        // else {
        lines = new THREE.Object3D();
        scene.add(lines)

        var material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 10
        });


        geometry0 = new THREE.Geometry();
        geometry0.vertices = [tl.point, tr.point];
        line0 = new THREE.Line(geometry0, material);
        lines.add(line0);

        geometry1 = new THREE.Geometry();
        geometry1.vertices = [tr.point, br.point];
        line1 = new THREE.Line(geometry1, material);
        lines.add(line1);

        geometry2 = new THREE.Geometry();
        geometry2.vertices = [br.point, bl.point];
        line2 = new THREE.Line(geometry2, material);
        lines.add(line2);

        geometry3 = new THREE.Geometry();
        geometry3.vertices = [bl.point, tl.point];
        line3 = new THREE.Line(geometry3, material);
        lines.add(line3);

        render();
    }

    var drawBoxes = function(lineArray) {

        var i = lineArray.length;
        while (i--) {
            scene.add(lineArray[i]);
        }
        render();
    }

    function v(x, y, z) {
        return new THREE.Vector3(x * 100, y * 100, z * 100);
    }





    var getFinalBounding = function() {
        // var up_long = b_points[0].x;
        // var up_lat = b_points[0].y;

        // var down_long = b_points[1].x;
        // var down_lat = b_points[1].y;

        // var w_up = w * Math.cos(up_lat);
        // var w_down = w * Math.cos(down_lat);


        // var tl_x = calCoordinate(up_long, w_up);
        // var tl_y = Math.abs((90 - (tl_y * 180 / Math.PI)) * h / 180);

        // var br_x = calCoordinate(down_long, w_down);
        // var br_y = Math.abs((90 - (down_lat * 180 / Math.PI)) * h / 180);

        // var tr_x = calCoordinate(down_long, w_up);

        b_points = [];
        b_lpoints = [];
    }

    var calCoordinate = function(c_long, perimeter) {
            var c_x = c_long * 180 / Math.PI * perimeter / 360;
            if (c_x < perimeter / 2) {
                c_x = perimeter / 2 - c_x;
            } else {
                c_x = perimeter * 3 / 2 - c_x + 1;
            }
            return c_x;
        }
        /**
         * The user moves the image.
         * @private
         * @param {Event} evt - The event
         * @return {void}
         **/

    var onMouseMove = function(evt) {
        evt.preventDefault();
        if (labeling_k && labeling_m) {
            box_br = outputInfospotCoord(parseInt(evt.clientX), parseInt(evt.clientY));
            box_tr = outputInfospotCoord(box_br.b_x, box_tl.b_y);
            box_bl = outputInfospotCoord(box_tl.b_x, box_br.b_y);


            drawBox(box_tl, box_tr, box_br, box_bl);
            //console.log(box_br);
        } else {

            move(parseInt(evt.clientX), parseInt(evt.clientY));
        }
    };

    /**
     * The user moves the image (mobile version).
     * @private
     * @param {Event} evt - The event
     * @return {void}
     **/

    var onTouchMove = function(evt) {
        // Move
        if (evt.touches.length == 1 && mousedown) {
            var touch = evt.touches[0];
            if (touch.target.parentNode == canvas_container) {
                evt.preventDefault();
                move(parseInt(touch.clientX), parseInt(touch.clientY));
            }
        }

        // Zoom
        else if (evt.touches.length == 2) {
            if (evt.touches[0].target.parentNode == canvas_container && evt.touches[1].target.parentNode == canvas_container && touchzoom) {
                evt.preventDefault();

                // Calculate the new level of zoom
                var d = dist(evt.touches[0].clientX, evt.touches[0].clientY, evt.touches[1].clientX, evt.touches[1].clientY);
                var diff = d - touchzoom_dist;

                if (diff !== 0) {
                    var direction = diff / Math.abs(diff);
                    zoom(zoom_lvl + direction);

                    touchzoom_dist = d;
                }
            }
        }
    };

    /**
     * Movement.
     * @private
     * @param {integer} x - Horizontal coordinate
     * @param {integer} y - Vertical coordinate
     * @return {void}
     **/

    var move = function(x, y) {
        if (mousedown) {
            // Smooth movement
            if (smooth_user_moves) {
                long += (x - mouse_x) / viewer_size.height * fov * Math.PI / 180;
                lat += (y - mouse_y) / viewer_size.height * fov * Math.PI / 180;
            }

            // No smooth movement
            else {
                long += (x - mouse_x) * PSV_LONG_OFFSET;
                lat += (y - mouse_y) * PSV_LAT_OFFSET;
            }

            // Save the current coordinates for the next movement
            mouse_x = x;
            mouse_y = y;

            // Coordinates treatments
            // if (!whole_circle)
            //  long = stayBetween(long, PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);

            long = getAngleMeasure(long, true);

            lat = stayBetween(lat, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);

            //console.log("long", long, 'lat', lat);

            triggerAction('position-updated', {
                longitude: long,
                latitude: lat
            });

            render();
        }
    };

    /**
     * Starts following the device orientation.
     * @private
     * @return {void}
     **/

    var startDeviceOrientation = function() {
        sphoords.start();
        stopAutorotate();

        /**
         * Indicates that we starts/stops following the device orientation.
         * @callback PhotoSphereViewer~onDeviceOrientationStateChanged
         * @param {boolean} state - `true` if device orientation is followed, `false` otherwise
         **/

        triggerAction('device-orientation', true);
    };

    /**
     * Stops following the device orientation.
     * @private
     * @return {void}
     **/

    var stopDeviceOrientation = function() {
        sphoords.stop();

        triggerAction('device-orientation', false);
    };

    /**
     * Starts/stops following the device orientation.
     * @public
     * @return {void}
     **/

    this.toggleDeviceOrientation = function() {
        if (sphoords.isEventAttached())
            stopDeviceOrientation();

        else
            startDeviceOrientation();
    };

    /**
     * The user moved their device.
     * @private
     * @param {object} coords - The spherical coordinates to look at
     * @param {number} coords.longitude - The longitude
     * @param {number} coords.latitude - The latitude
     * @return {void}
     **/

    var onDeviceOrientation = function(coords) {
        long = stayBetween(coords.longitude, PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);
        lat = stayBetween(coords.latitude, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);

        triggerAction('position-updated', {
            longitude: long,
            latitude: lat
        });

        render();
    };

    /**
     * The user wants to zoom.
     * @private
     * @param {Event} evt - The event
     * @return {void}
     **/

    var onMouseWheel = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var delta = (evt.detail) ? -evt.detail : evt.wheelDelta;

        if (delta !== 0) {
            var direction = parseInt(delta / Math.abs(delta));
            zoom(zoom_lvl + direction);
        }
    };

    /**
     * Sets the new zoom level.
     * @private
     * @param {integer} level - New zoom level
     * @return {void}
     **/

    var zoom = function(level) {
        zoom_lvl = stayBetween(parseInt(Math.round(level)), 0, 100);
        fov = PSV_FOV_MAX + (zoom_lvl / 100) * (PSV_FOV_MIN - PSV_FOV_MAX);

        camera.fov = fov;
        camera.updateProjectionMatrix();
        render();

        /**
         * Indicates that the zoom level has changed.
         * @callback PhotoSphereViewer~onZoomUpdated
         * @param {number} zoom_level - The new zoom level
         **/

        triggerAction('zoom-updated', zoom_lvl);
    };

    /**
     * Returns the current zoom level.
     * @public
     * @return {integer} The current zoom level (between 0 and 100)
     **/

    this.getZoomLevel = function() {
        return zoom_lvl;
    };

    /**
     * Sets the new zoom level.
     * @public
     * @param {integer} level - New zoom level
     * @return {void}
     **/

    this.zoom = function(level) {
        zoom(level);
    };

    /**
     * Zoom in.
     * @public
     * @return {void}
     **/

    this.zoomIn = function() {
        if (zoom_lvl < 100)
            zoom(zoom_lvl + 1);
    };

    /**
     * Zoom out.
     * @public
     * @return {void}
     **/

    this.zoomOut = function() {
        if (zoom_lvl > 0)
            zoom(zoom_lvl - 1);
    };

    /**
     * Detects whether fullscreen is enabled or not.
     * @private
     * @return {boolean} `true` if fullscreen is enabled, `false` otherwise
     **/

    var isFullscreenEnabled = function() {
        return (!!document.fullscreenElement || !!document.mozFullScreenElement || !!document.webkitFullscreenElement || !!document.msFullscreenElement);
    };

    /**
     * Fullscreen state has changed.
     * @private
     * @return {void}
     **/

    var fullscreenToggled = function() {
        // Fix the (weird and ugly) Chrome and IE behaviors
        if (!!document.webkitFullscreenElement || !!document.msFullscreenElement) {
            real_viewer_size.width = container.style.width;
            real_viewer_size.height = container.style.height;

            container.style.width = '100%';
            container.style.height = '100%';
            fitToContainer();
        } else if (!!container.webkitRequestFullscreen || !!container.msRequestFullscreen) {
            container.style.width = real_viewer_size.width;
            container.style.height = real_viewer_size.height;
            fitToContainer();
        }

        /**
         * Indicates that the fullscreen mode has been toggled.
         * @callback PhotoSphereViewer~onFullscreenToggled
         * @param {boolean} enabled - `true` if fullscreen is enabled, `false` otherwise
         **/

        triggerAction('fullscreen-mode', isFullscreenEnabled());
    };

    /**
     * Enables fullscreen.
     * @private
     * @return {void}
     **/

    var enableFullscreen = function() {
        if (!!container.requestFullscreen)
            container.requestFullscreen();

        else if (!!container.mozRequestFullScreen)
            container.mozRequestFullScreen();

        else if (!!container.webkitRequestFullscreen)
            container.webkitRequestFullscreen();

        else if (!!container.msRequestFullscreen)
            container.msRequestFullscreen();
    };

    /**
     * Disables fullscreen.
     * @private
     * @return {void}
     **/

    var disableFullscreen = function() {
        if (!!document.exitFullscreen)
            document.exitFullscreen();

        else if (!!document.mozCancelFullScreen)
            document.mozCancelFullScreen();

        else if (!!document.webkitExitFullscreen)
            document.webkitExitFullscreen();

        else if (!!document.msExitFullscreen)
            document.msExitFullscreen();
    };

    /**
     * Enables/disables fullscreen.
     * @public
     * @return {void}
     **/

    this.toggleFullscreen = function() {
        // Switches to fullscreen mode
        if (!isFullscreenEnabled())
            enableFullscreen();

        // Switches to windowed mode
        else
            disableFullscreen();
    };

    /**
     * Shows the navigation bar.
     * @private
     * @return {void}
     **/

    var showNavbar = function() {
        if (display_navbar)
            navbar.show();
    };

    /**
     * Parses an animation speed.
     * @private
     * @param {string} speed - The speed, in radians/degrees/revolutions per second/minute
     * @return {number} The speed in radians
     **/

    var parseAnimationSpeed = function(speed) {
        speed = speed.toString().trim();

        // Speed extraction
        var speed_value = parseFloat(speed.replace(/^(-?[0-9]+(?:\.[0-9]*)?).*$/, '$1'));
        var speed_unit = speed.replace(/^-?[0-9]+(?:\.[0-9]*)?(.*)$/, '$1').trim();

        // "per minute" -> "per second"
        if (speed_unit.match(/(pm|per minute)$/))
            speed_value /= 60;

        var rad_per_second = 0;

        // Which unit?
        switch (speed_unit) {
            // Revolutions per minute / second
            case 'rpm':
            case 'rev per minute':
            case 'revolutions per minute':
            case 'rps':
            case 'rev per second':
            case 'revolutions per second':
                // speed * 2pi
                rad_per_second = speed_value * 2 * Math.PI;
                break;

                // Degrees per minute / second
            case 'dpm':
            case 'deg per minute':
            case 'degrees per minute':
            case 'dps':
            case 'deg per second':
            case 'degrees per second':
                // Degrees to radians (rad = deg * pi / 180)
                rad_per_second = speed_value * Math.PI / 180;
                break;

                // Radians per minute / second
            case 'rad per minute':
            case 'radians per minute':
            case 'rad per second':
            case 'radians per second':
                rad_per_second = speed_value;
                break;

                // Unknown unit
            default:
                m_anim = false;
        }

        // Longitude offset
        return rad_per_second * PSV_ANIM_TIMEOUT / 1000;
    };

    /**
     * Parses an angle given in radians or degrees.
     * @private
     * @param {number|string} angle - Angle in radians (number) or in degrees (string)
     * @return {number} The angle in radians
     **/

    var parseAngle = function(angle) {
        angle = angle.toString().trim();

        // Angle extraction
        var angle_value = parseFloat(angle.replace(/^(-?[0-9]+(?:\.[0-9]*)?).*$/, '$1'));
        var angle_unit = angle.replace(/^-?[0-9]+(?:\.[0-9]*)?(.*)$/, '$1').trim();

        // Degrees
        if (angle_unit == 'deg')
            angle_value *= Math.PI / 180;

        // Radians by default, we don't have anyting to do
        return getAngleMeasure(angle_value);
    };

    /**
     * Sets the viewer size.
     * @private
     * @param {object} size - An object containing the wanted width and height
     * @return {void}
     **/

    var setNewViewerSize = function(size) {
        // Checks all the values
        for (var dim in size) {
            // Only width and height matter
            if (dim == 'width' || dim == 'height') {
                // Size extraction
                var size_str = size[dim].toString().trim();

                var size_value = parseFloat(size_str.replace(/^([0-9]+(?:\.[0-9]*)?).*$/, '$1'));
                var size_unit = size_str.replace(/^[0-9]+(?:\.[0-9]*)?(.*)$/, '$1').trim();

                // Only percentages and pixels are allowed
                if (size_unit != '%')
                    size_unit = 'px';

                // We're good
                new_viewer_size[dim] = {
                    css: size_value + size_unit,
                    unit: size_unit
                };
            }
        }
    };

    /**
     * saing related functions
     **/
    var deletetst = function(pos) {
        outputClasses.splice(pos, 1);
    };

    var saveFile = function(classArray) {
        var header = "<annotation>\r\n";
        var folder = "  <folder>" + "" + "</folder>\r\n";
        var relatedname = "  <filename>" + delExtension(outputName) + "</filename>\r\n";
        var rpath = "  <path>" + " " + "</path>\r\n";
        var rsource0 = "  <source>\r\n";
        var database = "    <database>" + "  " + "</database>\r\n";
        
        var rsource1 = "  </source>\r\n";
        var rsize0 = "  <size>\r\n";
        var rwidth = "    <width>" + w + "</width>\r\n";
        var rheight = "    <height>" + h + "</height>\r\n";
        var rdepth = "    <depth>" + "3" + "</depth>\r\n";
        var rsize1 = "  </size>\r\n";
        var segmented = "  <segmented>" + "0" + "</segmented>\r\n";

        var content = header + folder + relatedname + rpath + rsource0 + database + rsource1 + rsize0 + rwidth + rheight + rdepth + rsize1 + segmented;
        content += generateObjNodes(classArray);
        content += "</annotation>";
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "" + delExtension(outputName) + ".xml"); //saveAs(blob,filename)
        console.log(content);
    }

    var generateObjNodes = function(annotations) {
        var objs = '';
        var i = annotations.length;
        while (i--) {
            objs += "  <object>\r\n"
            objs += "    <name>" + annotations[i].name + "</name>\r\n";
            objs += "    <pose>" + annotations[i].pose + "</pose>\r\n";
            objs += "    <truncated>" + annotations[i].truncated.toString() + "</truncated>\r\n";
            objs += "    <difficult>" + annotations[i].difficult.toString() + "</difficult>\r\n";
            objs += "    <bndbox>\r\n"
            objs += "      <xmin>" + annotations[i].xmin.toString() + "</xmin>\r\n";
            objs += "      <ymin>" + annotations[i].ymin.toString() + "</ymin>\r\n";
            objs += "      <xmax>" + annotations[i].xmax.toString() + "</xmax>\r\n";
            objs += "      <ymax>" + annotations[i].ymax.toString() + "</ymax>\r\n";
            objs += "    </bndbox>\r\n"
            objs += "  </object>\r\n"
        }
        return objs;
    }

    var saveLLFile = function(classArray) {
        var header = "<annotation>\r\n";
        var folder = "  <folder>" + "" + "</folder>\r\n";
        var relatedname = "  <filename>" + delExtension(outputName) + "</filename>\r\n";
        var rpath = "  <path>" + " " + "</path>\r\n";
        var rsource0 = "  <source>\r\n";
        var database = "    <database>" + "  " + "</database>\r\n";
        
        var rsource1 = "  </source>\r\n";
        var rsize0 = "  <size>\r\n";
        var rwidth = "    <width>" + w + "</width>\r\n";
        var rheight = "    <height>" + h + "</height>\r\n";
        var rdepth = "    <depth>" + "3" + "</depth>\r\n";
        var rsize1 = "  </size>\r\n";
        var segmented = "  <segmented>" + "0" + "</segmented>\r\n";

        var content = header + folder + relatedname + rpath + rsource0 + database + rsource1 + rsize0 + rwidth + rheight + rdepth + rsize1 + segmented;
        content += generateObjNodes(classArray);
        content += "</annotation>";
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "l-" +delExtension(outputName) + ".xml"); //saveAs(blob,filename)
        console.log(content);
    }

    var generateLLObjNodes = function(annotations) {
        var objs = '';
        var i = annotations.length;
        while (i--) {
            objs += "  <object>\r\n"
            objs += "    <name>" + annotations[i].name + "</name>\r\n";
            objs += "    <pose>" + annotations[i].pose + "</pose>\r\n";
            objs += "    <truncated>" + annotations[i].truncated.toString() + "</truncated>\r\n";
            objs += "    <difficult>" + annotations[i].difficult.toString() + "</difficult>\r\n";
            objs += "    <bndbox>\r\n"
            objs += "      <xmin>" + annotations[i].xmin.toString() + "</xmin>\r\n";
            objs += "      <ymin>" + annotations[i].ymin.toString() + "</ymin>\r\n";
            objs += "      <xmax>" + annotations[i].xmax.toString() + "</xmax>\r\n";
            objs += "      <ymax>" + annotations[i].ymax.toString() + "</ymax>\r\n";
            objs += "    </bndbox>\r\n"
            objs += "  </object>\r\n"
        }
        return objs;
    }

    function saveAs(blob, filename) {
        var type = blob.type;
        var force_saveable_type = 'application/octet-stream';
        if (type && type != force_saveable_type) {
            var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
        }
        var url = URL.createObjectURL(blob);
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = url;
        save_link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
        URL.revokeObjectURL(url);
    }

    function delExtension(str) {
        var reg = /.jpg+$/;
        return str.replace(reg, '');
    }

    /**
     * Adds a function to execute when a given action occurs.
     * @public
     * @param {string} name - The action name
     * @param {function} f - The handler function
     * @return {void}
     **/

    /*this.addAction = function(name, f) {
        // New action?
        if (!(name in actions))
            actions[name] = [];

        actions[name].push(f);
    };*/

    this.addAction = function(name, f) {
        // New action?
        if (!(name in actions))
            actions[name] = [];

        actions[name].push(f);
    };

    /**
     * Triggers an action.
     * @private
     * @param {string} name - Action name
     * @param {*} arg - An argument to send to the handler functions
     * @return {void}
     **/

    var triggerAction = function(name, arg) {
        // Does the action have any function?
        if ((name in actions) && !!actions[name].length) {
            for (var i = 0, l = actions[name].length; i < l; ++i) {
                if (arg !== undefined)
                    actions[name][i](arg);

                else
                    actions[name][i]();
            }
        }
    };

    // Required parameters
    if (args === undefined || args.panorama === undefined || args.container === undefined) {
        console.log('PhotoSphereViewer: no value given for panorama or container');
        return;
    }

    // Should the movement be smooth?
    var smooth_user_moves = (args.smooth_user_moves !== undefined) ? !!args.smooth_user_moves : true;

    // Movement speed
    var PSV_LONG_OFFSET = (args.long_offset !== undefined) ? parseAngle(args.long_offset) : Math.PI / 360.0;
    var PSV_LAT_OFFSET = (args.lat_offset !== undefined) ? parseAngle(args.lat_offset) : Math.PI / 180.0;

    var PSV_KEYBOARD_LONG_OFFSET = (args.keyboard_long_offset !== undefined) ? parseAngle(args.keyboard_long_offset) : Math.PI / 60.0;
    var PSV_KEYBOARD_LAT_OFFSET = (args.keyboard_lat_offset !== undefined) ? parseAngle(args.keyboard_lat_offset) : Math.PI / 120.0;

    // Minimum and maximum fields of view in degrees
    var PSV_FOV_MIN = (args.min_fov !== undefined) ? stayBetween(parseFloat(args.min_fov), 1, 179) : 30;
    var PSV_FOV_MAX = (args.max_fov !== undefined) ? stayBetween(parseFloat(args.max_fov), 1, 179) : 90;

    // Minimum tilt up / down angles
    var PSV_TILT_UP_MAX = (args.tilt_up_max !== undefined) ? stayBetween(parseAngle(args.tilt_up_max), 0, Math.PI / 2.0) : Math.PI / 2.0;
    var PSV_TILT_DOWN_MAX = (args.tilt_down_max !== undefined) ? -stayBetween(parseAngle(args.tilt_down_max), 0, Math.PI / 2.0) : -Math.PI / 2.0;

    // Minimum and maximum visible longitudes
    var min_long = (args.min_longitude !== undefined) ? parseAngle(args.min_longitude) : 0;
    var max_long = (args.max_longitude !== undefined) ? parseAngle(args.max_longitude) : 0;

    var whole_circle = (min_long == max_long);

    if (whole_circle) {
        min_long = 0;
        max_long = 2 * Math.PI;
    } else if (max_long === 0)
        max_long = 2 * Math.PI;

    var PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE;
    if (min_long < max_long) {
        PSV_MIN_LONGITUDE = min_long;
        PSV_MAX_LONGITUDE = max_long;
    } else {
        PSV_MIN_LONGITUDE = max_long;
        PSV_MAX_LONGITUDE = min_long;
    }

    // Default position
    var lat = 0,
        long = PSV_MIN_LONGITUDE;

    if (args.default_position !== undefined) {
        if (args.default_position.lat !== undefined) {
            var lat_angle = parseAngle(args.default_position.lat);
            if (lat_angle > Math.PI)
                lat_angle -= 2 * Math.PI;

            lat = stayBetween(lat_angle, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);
        }

        if (args.default_position.long !== undefined)
            long = stayBetween(parseAngle(args.default_position.long), PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);
    }

    // Sphere segments and rings
    var segments = (args.segments !== undefined) ? parseInt(args.segments) : 200;
    var rings = (args.rings !== undefined) ? parseInt(args.rings) : 100;

    // Default zoom level
    var zoom_lvl = 0;

    if (args.zoom_level !== undefined)
        zoom_lvl = stayBetween(parseInt(Math.round(args.zoom_level)), 0, 100);

    var fov = PSV_FOV_MAX + (zoom_lvl / 100) * (PSV_FOV_MIN - PSV_FOV_MAX);

    // Animation constants
    var PSV_FRAMES_PER_SECOND = 60;
    var PSV_ANIM_TIMEOUT = 1000 / PSV_FRAMES_PER_SECOND;

    // Delay before the animation
    var anim_delay = 2000;

    if (args.time_anim !== undefined) {
        if (typeof args.time_anim == 'number' && args.time_anim >= 0)
            anim_delay = args.time_anim;

        else
            anim_delay = false;
    }

    // Horizontal animation speed
    var anim_long_offset = (args.anim_speed !== undefined) ? parseAnimationSpeed(args.anim_speed) : parseAnimationSpeed('2rpm');

    // Reverse the horizontal animation if autorotate reaches the min/max longitude
    var reverse_anim = true;

    if (args.reverse_anim !== undefined)
        reverse_anim = !!args.reverse_anim;

    // Vertical animation speed
    var anim_lat_offset = (args.vertical_anim_speed !== undefined) ? parseAnimationSpeed(args.vertical_anim_speed) : parseAnimationSpeed('2rpm');

    // Vertical animation target (default: equator)
    var anim_lat_target = 0;

    if (args.vertical_anim_target !== undefined) {
        var lat_target_angle = parseAngle(args.vertical_anim_target);
        if (lat_target_angle > Math.PI)
            lat_target_angle -= 2 * Math.PI;

        anim_lat_target = stayBetween(lat_target_angle, PSV_TILT_DOWN_MAX, PSV_TILT_UP_MAX);
    }

    // Navigation bar
    var navbar = new PSVNavBar(this);

    // Must we display the navigation bar?
    var display_navbar = (args.navbar !== undefined) ? !!args.navbar : false;

    // Style of the navigation bar
    var navbar_style = (args.navbar_style !== undefined) ? args.navbar_style : {};

    // Are user interactions allowed?
    var user_interactions_allowed = (args.allow_user_interactions !== undefined) ? !!args.allow_user_interactions : true;

    if (!user_interactions_allowed)
        display_navbar = false;

    // Is "scroll to zoom" allowed?
    var scroll_to_zoom = (args.allow_scroll_to_zoom !== undefined) ? !!args.allow_scroll_to_zoom : true;

    // Eyes offset in VR mode
    var eyes_offset = (args.eyes_offset !== undefined) ? parseFloat(args.eyes_offset) : 5;

    // Container (ID to retrieve?)
    var container = (typeof args.container == 'string') ? document.getElementById(args.container) : args.container;

    // Size of the viewer
    var viewer_size, new_viewer_size = {},
        real_viewer_size = {};
    if (args.size !== undefined)
        setNewViewerSize(args.size);

    // Some useful attributes
    var panorama = args.panorama;
    var root, canvas_container;
    var renderer = null,
        scene = null,
        camera = null,
        stereo_effect = null;
    var mousedown = false,
        mouse_x = 0,
        mouse_y = 0;
    var touchzoom = false,
        touchzoom_dist = 0;
    var autorotate_timeout = null,
        anim_timeout = null;

    var sphoords = new Sphoords();

    var actions = {};

    // Do we have to read XMP data?
    var readxmp = (args.usexmpdata !== undefined) ? !!args.usexmpdata : true;

    // Can we use CORS?
    var cors_anonymous = (args.cors_anonymous !== undefined) ? !!args.cors_anonymous : true;

    // Cropped size?
    var pano_size = {
        full_width: null,
        full_height: null,
        cropped_width: null,
        cropped_height: null,
        cropped_x: null,
        cropped_y: null
    };

    // The user defines the real size of the panorama
    if (args.pano_size !== undefined) {
        for (var attr in pano_size) {
            if (args.pano_size[attr] !== undefined)
                pano_size[attr] = parseInt(args.pano_size[attr]);
        }

        readxmp = false;
    }

    // Captured FOVs
    var captured_view = {
        horizontal_fov: 360,
        vertical_fov: 180
    };

    if (args.captured_view !== undefined) {
        for (var attr in captured_view) {
            if (args.captured_view[attr] !== undefined)
                captured_view[attr] = parseFloat(args.captured_view[attr]);
        }

        readxmp = false;
    }

    // Will we have to recalculate the coordinates?
    var recalculate_coords = false;

    // Loading message
    var loading_msg = (args.loading_msg !== undefined) ? args.loading_msg.toString() : 'Loading…';

    // Loading image
    var loading_img = (args.loading_img !== undefined) ? args.loading_img.toString() : null;

    // Loading HTML
    var loading_html = (args.loading_html !== undefined) ? args.loading_html : null;

    // Overlay
    var overlay = null;
    if (args.overlay !== undefined) {
        // Image
        if (args.overlay.image !== undefined) {
            overlay = {
                image: args.overlay.image,
                position: {
                    x: 'left',
                    y: 'bottom'
                }
            };

            // Image position
            if (args.overlay.position !== undefined) {
                if (args.overlay.position.x !== undefined && (args.overlay.position.x == 'left' || args.overlay.position.x == 'right'))
                    overlay.position.x = args.overlay.position.x;

                if (args.overlay.position.y !== undefined && (args.overlay.position.y == 'top' || args.overlay.position.y == 'bottom'))
                    overlay.position.y = args.overlay.position.y;
            }

            // Image size
            if (args.overlay.size !== undefined) {
                // Default: keep the original size, or resize following the current ratio
                overlay.size = {
                    width: (args.overlay.size.width !== undefined) ? args.overlay.size.width : 'auto',
                    height: (args.overlay.size.height !== undefined) ? args.overlay.size.height : 'auto'
                };
            }
        }
    }

    // Function to call once panorama is ready?
    var self = this;
    if (args.onready !== undefined)
        this.addAction('ready', args.onready);

    // Go?
    var autoload = (args.autoload !== undefined) ? !!args.autoload : true;

    if (autoload)
        this.load();
};
