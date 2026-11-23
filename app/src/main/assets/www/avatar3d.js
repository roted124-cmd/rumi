import * as THREE from 'three';

const canvas = document.getElementById('rumiCanvas');
if (canvas) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth || 360, canvas.clientHeight || 300, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.65, 7.4);
    camera.lookAt(0, 1.35, 0);
    scene.add(new THREE.HemisphereLight(0xdedbff, 0x30204d, 2.0));
    const key = new THREE.DirectionalLight(0xffffff, 2.7); key.position.set(3, 5, 5); scene.add(key);
    const rim = new THREE.PointLight(0x9c68ff, 18, 9); rim.position.set(-2, 2.8, -1); scene.add(rim);
    const pink = new THREE.PointLight(0xff72c7, 10, 7); pink.position.set(2, 1, 2); scene.add(pink);

    const avatar = new THREE.Group(); scene.add(avatar);
    const mat = (color, roughness=.65, metalness=0) => new THREE.MeshStandardMaterial({color, roughness, metalness});
    const skin=mat(0xffd7c8), skinShade=mat(0xeeb6aa), hair=mat(0x542b91,.38), hairLight=mat(0x9c62db,.36), hairPink=mat(0xf18bc9,.38), dark=mat(0x17162f,.5), violet=mat(0x7746c6,.35,.18), lilac=mat(0xc2a5ff,.35,.1), white=mat(0xffffff,.3), iris=mat(0x493080,.25), boot=mat(0x20213f,.45,.15);
    function ball(parent, material, pos, scale, seg=32){const m=new THREE.Mesh(new THREE.SphereGeometry(1,seg,24),material);m.position.set(...pos);m.scale.set(...scale);parent.add(m);return m;}
    function capsule(parent, material, a, b, radius, r2=radius){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(B,A);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r2,radius,d.length(),16),material);mesh.position.copy(A).add(B).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());parent.add(mesh);ball(parent,material,a,[radius,radius,radius],16);ball(parent,material,b,[r2,r2,r2],16);return mesh;}
    // Legs, boots and a compact pop-stage outfit.
    capsule(avatar,dark,[-.23,.75,0],[-.25,.18,0],.105); capsule(avatar,dark,[.23,.75,0],[.25,.18,0],.105);
    ball(avatar,boot,[-.27,.1,.06],[.19,.11,.28]); ball(avatar,boot,[.27,.1,.06],[.19,.11,.28]);
    const skirt=new THREE.Mesh(new THREE.CylinderGeometry(.28,.48,.42,8),violet);skirt.position.y=1.08;avatar.add(skirt);
    ball(avatar,lilac,[0,1.32,0],[.36,.43,.22]);
    ball(avatar,skin,[0,1.92,0],[.47,.54,.39]);
    // Hair cap and long locks framing the face.
    ball(avatar,hair,[0,2.2,-.08],[.51,.43,.43]);
    const fringe1=new THREE.Mesh(new THREE.SphereGeometry(.25,24,16),hairLight);fringe1.position.set(-.23,2.19,.28);fringe1.scale.set(1,.7,.6);avatar.add(fringe1);
    const fringe2=new THREE.Mesh(new THREE.SphereGeometry(.23,24,16),hair);fringe2.position.set(.08,2.22,.31);fringe2.scale.set(1,.72,.55);avatar.add(fringe2);
    capsule(avatar,hair,[-.39,2.05,-.03],[-.52,1.15,-.08],.16,.1);
    capsule(avatar,hair,[.39,2.04,-.03],[.51,1.17,-.08],.16,.1);
    capsule(avatar,hairPink,[-.48,1.78,.01],[-.54,1.25,.0],.045,.025);
    // Face: large friendly eyes, brows, nose and animated mouth.
    ball(avatar,white,[-.18,1.99,.342],[.105,.14,.045]);ball(avatar,white,[.18,1.99,.342],[.105,.14,.045]);
    ball(avatar,iris,[-.17,1.98,.382],[.052,.08,.025]);ball(avatar,iris,[.19,1.98,.382],[.052,.08,.025]);
    ball(avatar,white,[-.185,2.02,.405],[.018,.025,.012]);ball(avatar,white,[.175,2.02,.405],[.018,.025,.012]);
    capsule(avatar,dark,[-.28,2.17,.34],[-.1,2.19,.35],.018);capsule(avatar,dark,[.1,2.19,.35],[.28,2.17,.34],.018);
    ball(avatar,skinShade,[0,1.88,.39],[.045,.035,.035]);
    const mouth=ball(avatar,mat(0x8c365e),[0,1.78,.38],[.07,.018,.022]);
    ball(avatar,mat(0xffa4bd),[-.31,1.83,.31],[.075,.035,.018]);ball(avatar,mat(0xffa4bd),[.31,1.83,.31],[.075,.035,.018]);
    // Hair ribbon and star accessory.
    ball(avatar,hairPink,[.42,2.42,-.02],[.13,.09,.1]);ball(avatar,lilac,[.49,2.42,.02],[.07,.07,.07]);
    // Arms are separate pivot groups so Rumi can wave.
    const leftArm=new THREE.Group();leftArm.position.set(-.34,1.58,0);avatar.add(leftArm);
    capsule(leftArm,skin,[0,0,0],[-.08,-.42,.02],.105,.085);ball(leftArm,skin,[-.1,-.49,.03],[.11,.12,.09]);
    const rightArm=new THREE.Group();rightArm.position.set(.34,1.58,0);avatar.add(rightArm);
    capsule(rightArm,skin,[0,0,0],[.1,-.42,.02],.105,.085);ball(rightArm,skin,[.12,-.49,.03],[.11,.12,.09]);
    // Outfit collar and luminous star badge.
    ball(avatar,lilac,[0,1.58,.24],[.13,.07,.045]);
    const star=new THREE.Mesh(new THREE.OctahedronGeometry(.105,0),mat(0xffd76b,.28,.25));star.position.set(0,1.35,.27);avatar.add(star);

    const floor=new THREE.Mesh(new THREE.CircleGeometry(1.35,48),new THREE.MeshBasicMaterial({color:0x7e5ce8,transparent:true,opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=.015;floor.scale.set(1.2,.7,1);scene.add(floor);
    let mode='idle',start=performance.now();
    const clock=new THREE.Clock();
    function resize(){const w=canvas.clientWidth||360,h=canvas.clientHeight||300;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize',resize);resize();
    window.addEventListener('rumi-action',e=>{mode=e.detail?.action||'idle';start=performance.now();if(e.detail?.text)document.getElementById('avatarSpeech').textContent=e.detail.text;});
    function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();avatar.position.y=.035*Math.sin(t*2.2);avatar.rotation.y=.08*Math.sin(t*.65);avatar.rotation.x=.018*Math.sin(t*1.4);
      leftArm.rotation.z=.05*Math.sin(t*1.7);rightArm.rotation.z=-.05*Math.sin(t*1.7);
      if(mode==='wave'){const p=(performance.now()-start)/1000;rightArm.rotation.z=-.3-Math.sin(p*10)*.65;if(p>2.3)mode='idle';}
      if(mode==='celebrate'){const p=(performance.now()-start)/1000;rightArm.rotation.z=-1.1;leftArm.rotation.z=1.1;avatar.rotation.z=.05*Math.sin(p*14);if(p>1.8){mode='idle';avatar.rotation.z=0}}
      if(mode==='listen'){avatar.rotation.x=.06;}
      else if(mode!=='celebrate')avatar.rotation.x=.018*Math.sin(t*1.4);
      if(mode==='talk'){mouth.scale.y=.018+.055*Math.abs(Math.sin(t*12));}else mouth.scale.y=.018;
      renderer.render(scene,camera);
    }
    animate();
  } catch (err) {
    const ctx=canvas.getContext('2d');if(ctx){ctx.fillStyle='#d8caff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText('Rumi 3D potrzebuje WebGL',canvas.width/2,canvas.height/2);}
    console.warn('Rumi 3D initialization failed:',err);
  }
}
