var initAnimation = function (audio) {
  var noise = new window.SimplexNoise();
  function play() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();
    var src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    var scene = new window.window.THREE.Scene();
    var group = new window.THREE.Group();
    var camera = new window.THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    scene.add(camera);

    var renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    var planeGeometry = new window.THREE.PlaneGeometry(800, 800, 20, 20);
    var planeMaterial = new window.THREE.MeshLambertMaterial({
      color: 0x6904ce,
      side: window.THREE.DoubleSide,
      wireframe: true,
    });

    var plane = new window.THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 30, 0);
    group.add(plane);

    var plane2 = new window.THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -30, 0);
    group.add(plane2);

    var icosahedronGeometry = new window.THREE.IcosahedronGeometry(10, 4);
    var lambertMaterial = new window.THREE.MeshLambertMaterial({
      color: 0xff00ee,
      wireframe: true,
    });

    var ball = new window.THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.set(0, 0, 0);
    group.add(ball);

    var ambientLight = new window.THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var spotLight = new window.THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(group);

    document.getElementById('out').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    function render() {
      analyser.getByteFrequencyData(dataArray);

      var lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
      var upperHalfArray = dataArray.slice(dataArray.length / 2 - 1, dataArray.length - 1);

      var overallAvg = avg(dataArray);
      var lowerMax = max(lowerHalfArray);
      var lowerAvg = avg(lowerHalfArray);
      var upperMax = max(upperHalfArray);
      var upperAvg = avg(upperHalfArray);

      var lowerMaxFr = lowerMax / lowerHalfArray.length;
      var lowerAvgFr = lowerAvg / lowerHalfArray.length;
      var upperMaxFr = upperMax / upperHalfArray.length;
      var upperAvgFr = upperAvg / upperHalfArray.length;

      makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
      makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));

      makeRoughBall(
        ball,
        modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
        modulate(upperAvgFr, 0, 1, 0, 4)
      );

      group.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    render();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeRoughBall(mesh, bassFr, treFr) {
      mesh.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.00001;
        var distance =
          offset +
          bassFr +
          noise.noise3D(
            vertex.x + time * rf * 7,
            vertex.y + time * rf * 8,
            vertex.z + time * rf * 9
          ) *
            amp *
            treFr;
        vertex.multiplyScalar(distance);
      });
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
    }

    function makeRoughGround(mesh, distortionFr) {
      mesh.geometry.vertices.forEach(function (vertex, i) {
        var amp = 2;
        var time = Date.now();
        var distance =
          (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) *
          distortionFr *
          amp;
        vertex.z = distance;
      });
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
    }
  }

  play();
};

function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + fr * delta;
}

function avg(arr) {
  var total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

function max(arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

export { initAnimation };
