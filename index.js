const http = require("http");

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Peace</title>
<style>
html,body{margin:0;overflow:hidden;background:#0b2e1a}
canvas{width:100vw;height:100vh;display:block}
.text{
 position:fixed;bottom:24px;width:100%;
 text-align:center;
 color:rgba(200,255,220,.7);
 font-family:system-ui;letter-spacing:1px
}
</style>
</head>
<body>
<canvas id="c"></canvas>
<div class="text">☮️ Give Peace a Chance</div>
<script>
const c=document.getElementById("c"),g=c.getContext("webgl");
function r(){c.width=innerWidth;c.height=innerHeight;g.viewport(0,0,g.drawingBufferWidth,g.drawingBufferHeight)}
addEventListener("resize",r);r();

const vs=\`
attribute vec2 p;
void main(){gl_Position=vec4(p,0.,1.);}
\`;
const fs=\`
precision highp float;
uniform float t;uniform vec2 r;
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
 float d=length(uv);
 float glow=smoothstep(.5,.2,d)*(0.8+0.2*sin(t));
 gl_FragColor=vec4(vec3(0.2,1.,0.5)*glow,1.);
}
\`;
function sh(t,s){const h=g.createShader(t);g.shaderSource(h,s);g.compileShader(h);return h;}
const p=g.createProgram();
g.attachShader(p,sh(g.VERTEX_SHADER,vs));
g.attachShader(p,sh(g.FRAGMENT_SHADER,fs));
g.linkProgram(p);g.useProgram(p);

const b=g.createBuffer();
g.bindBuffer(g.ARRAY_BUFFER,b);
g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),g.STATIC_DRAW);
const l=g.getAttribLocation(p,"p");
g.enableVertexAttribArray(l);
g.vertexAttribPointer(l,2,g.FLOAT,false,0,0);

const tl=g.getUniformLocation(p,"t");
const rl=g.getUniformLocation(p,"r");

(function d(t){
 g.uniform1f(tl,t*0.002);
 g.uniform2f(rl,c.width,c.height);
 g.drawArrays(g.TRIANGLE_STRIP,0,4);
 requestAnimationFrame(d);
})(0);
</script>
</body>
</html>`;

http.createServer((_,res)=>{
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end(html);
}).listen(3000,()=>console.log("Peace page on :3000"));
