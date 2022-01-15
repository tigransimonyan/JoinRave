export function initAnimation(audio) {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var PI = Math.PI,
    TWO_PI = Math.PI * 2,
    cos = Math.cos,
    sin = Math.sin,
    round = Math.round,
    random = Math.random,
    floor = Math.floor;
  var ctx, actx, analyser, gainNode, frequencyDataLen, frequencyData, bufferSource;
  var startAngle = (PI / 180) * -90;
  var rotation = 0;
  var playing = false,
    startedAt,
    pausedAt;
  var W, H, CX, CY;

  //var avgCounter = document.getElementById('avg');
  //var radCounter = document.getElementById('rad');
  var canvas = document.getElementById('canv');

  var settings = {
    polygons: 20,
    colors: {
      background: 'rgba(0,0,0,.1)',
    },
    media: '',
    fftSize: 32, // [32, 64, 128, 256, 512, 1024, 2048]
    smoothingTimeConstant: 0.8, // 0.8
  };

  var vertices = [];
  var i;
  for (i = 0; i < settings.polygons; i++) {
    var dir = Math.random() * Math.PI * 2;
    vertices.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dirx: Math.sin(dir),
      diry: Math.cos(dir),
    });
  }

  function run() {
    /*ctx = document.createElement('canvas').getContext('2d');*/
    startedAt = 0;
    pausedAt = 0;

    actx = new AudioContext();
    canvas = document.getElementById('canv');
    ctx = canvas.getContext('2d');

    analyser = actx.createAnalyser();
    analyser.fftSize = settings.fftSize;
    analyser.smoothingTimeConstant = settings.smoothingTimeConstant;
    // analyser.maxDecibels = -30;
    // analyser.minDecibels = -100;

    gainNode = actx.createMediaElementSource(audio);
    gainNode.connect(analyser);
    analyser.connect(actx.destination);
    frequencyDataLen = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(frequencyDataLen);

    document.body.appendChild(ctx.canvas);
    //play();

    resizeHandler();
    // ctx.canvas.addEventListener('click', toggleAudio);
    window.addEventListener('resize', resizeHandler);
  }

  function animate() {
    if (!playing) return;
    requestAnimationFrame(animate);
    update();
  }

  function update() {
    var i,
      sides,
      radius,
      r,
      g,
      b,
      a,
      avg = 0;

    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = settings.colors.background;
    ctx.fillRect(0, 0, W, H);
    ctx.closePath();

    analyser.getByteFrequencyData(frequencyData);

    for (i = 0; i < frequencyDataLen; i++) {
      avg += frequencyData[i];
    }
    avg = avg / frequencyDataLen;
    sides = floor(avg / 40);

    //avgCounter.innerHTML = '';
    //avgCounter.innerHTML = 'AVG: ' + avg;

    for (i = 0; i < settings.polygons; i++) {
      radius = (avg * i) / 10 + 10;
      //radCounter.innerHTML = '';
      //radCounter.innerHTML = radius;
      r = 255;
      g = 0;
      b = round(random() * radius);
      a = 255 / radius;

      if (avg < 80) {
        rotation = 0;
        g = 0;
        b = rand(255, 240);
        r = rand(255, 220);
        a = 0.25;
      }

      if (avg > 80 && avg < 150) {
        rotation += rand(0.002, 0.0001);
        g = b = rand(255, 100);
        a = 0.55;
      }

      if (avg > 80 && avg < 120) {
        rotation += rand(0.002, 0.0001);
        g = b = 45;
        a = 0.55;
        sides = floor(avg / rand(60, 24));
      }

      if (avg < 175 && avg > 150) {
        r = 12;
        g = 40;
        b = 255;
        radius = (avg * i) / 10 + rand(5, 10);
        sides = floor(avg / 80);
        rotation += rand(100, 2);
      }

      if (avg == 175) {
        radius = (avg * i) / 10 + rand(2, 40);
      }
      if (avg < 120 && avg > 100) {
        // b = rand(20,255);
        radius = (avg * i) / 10 + rand(5, 40);
        sides = floor(avg / rand(30, 22));
      }

      if (avg > 160 && avg < 175) {
        rotation = 5;
        sides = floor(avg / 24);
      }

      if (avg > 175) {
        rotation += 0;
        /*r = 32;
              g = 43;
              b = 23;*/
        r = Math.floor(Math.random() * (100 - 32)) + 32;
        g = 0;
        b = Math.floor(Math.random() * (100 - 23)) + 23;
        a = 1;
        radius = (avg * i) / 10 + rand(5, 20);
        sides = floor(avg / rand(45, 32));
      }

      if (avg >= 185) {
        b = Math.floor(Math.random() * (255 - 150)) + 150;
        g = Math.floor(Math.random() * (255 - 150)) + 150;
        sides = floor(avg / rand(40, 20));

        a = 0.5;
        r = 2;

        ctx.beginPath();
        ctx.lineWidth = 1;
        var sidesNEW = rand(3, 0);
        createPolygon(
          ctx,
          rand(ctx.canvas.width, 0),
          rand(ctx.canvas.height, 0),
          90,
          sidesNEW,
          startAngle,
          0
        );
        //ctx.strokeStyle = 'hsla('+rand(300, 170)+', 100%, '+rand(75, 50)+'%, 1)';
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';

        //ctx.globalCompositeOperation = "source-over";
        ctx.globalCompositeOperation = 'source-atop';

        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();

        var blue = rand(255, 200);
        var green = rand(50, 20);

        var red = rand(230, 200);

        ctx.globalCompositeOperation = 'source-over';

        ctx.moveTo(ctx.canvas.width * Math.random(), ctx.canvas.height * Math.random());
        ctx.lineTo(ctx.canvas.width * Math.random(), ctx.canvas.height * Math.random());

        ctx.lineWidth = 1;
        //ctx.strokeStyle = 'rgba('+red+','+green+','+blue+',0.5)';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';

        ctx.stroke();
        ctx.closePath();
      }

      if (avg < 191 && avg > 180) {
        if (avg < 191 && avg > 184) {
          settings.colors.background = 'rgba(200,200,200,.1)';
          r = 0;
          b = 0;
          g = 0;
          a = 0;
          ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        } else {
          settings.colors.background = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
      } else {
        settings.colors.background = 'rgba(0,0,0,.1)';
      }

      ctx.beginPath();
      ctx.globalCompositeOperation = 'lighter';
      createPolygon(ctx, CX, CY, radius, sides, startAngle, 0);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

      if (avg >= 150) {
        var randomNUM = rand(3, 1);
        if (randomNUM == 2) {
          ctx.strokeStyle = 'hsla(' + rand(300, 170) + ', 100%, ' + rand(75, 50) + '%, 1)';
        }
        if (randomNUM == 3) {
          b = 255;
          g = 255;
          r = 255;
          ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
      }

      ctx.stroke();

      ctx.closePath();
    }
  }
  function createPolygon(ctx, x, y, radius, sides, startAngle) {
    if (sides < 3) sides = 3;

    var a = TWO_PI / sides;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(startAngle + rotation);
    ctx.moveTo(radius, 0);

    for (var i = 1; i < sides; i++) {
      ctx.lineTo(radius * cos(a * i), radius * sin(a * i));
    }

    ctx.closePath();
    ctx.restore();
  }

  function createPoints(i, ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.arc(vertices[i].x, vertices[i].y, 50, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.restore();
  }

  // function toggleAudio() {
  //   if (playing) pause();
  //   else play();
  // }

  function play() {
    playing = true;
    startedAt = pausedAt ? Date.now() - pausedAt : Date.now();
    bufferSource = null;
    bufferSource = actx.createBufferSource();
    //bufferSource.buffer = audioBuffer;
    //bufferSource.loop = true;
    //bufferSource.connect(gainNode);

    if (pausedAt) bufferSource.start(0, pausedAt / 1000);
    else bufferSource.start();

    animate();
  }

  function pause() {
    playing = false;
    pausedAt = Date.now() - startedAt;
    bufferSource.stop();
  }

  function resizeHandler() {
    W = ctx.canvas.width = window.innerWidth;
    H = ctx.canvas.height = window.innerHeight;
    CX = W / 2;
    CY = H / 2;
  }
  function rand(max, min, _int) {
    var max = max === 0 || max ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return _int ? Math.round(gen) : gen;
  }

  try {
    run();
  } catch (e) {
    console.log(e);
  }

  return { playAnimation: play, pauseAnimation: pause };
}
