import * as THREE from 'three'

export const SpaceTimeGrid = {
  mounted() {
    let camera, scene, renderer
    let planeGeometry, planeMaterial, planeMesh
    let raycaster, mouse
    let uniforms

    const vertexShaderSource = `
      uniform vec3 u_mouse3D;
      uniform vec3 u_clickPosition;
      uniform float u_timeSinceClick;
      uniform float u_rippleSpeed;
      void main() {
        vec3 pos = position;
        
        float distToMouse = distance(pos, u_mouse3D);
        pos.z += exp(-distToMouse) * 0.9; 
        
        if (u_timeSinceClick >= 0.0) {
          float distToClick = distance(pos.xy, u_clickPosition.xy);
          float rippleEffect = sin(distToClick * 10.0 - u_timeSinceClick * u_rippleSpeed) * exp(-u_timeSinceClick * 0.5);
          pos.z += rippleEffect * 0.1;
        }

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragmentShaderSource = `
      void main() {
        gl_FragColor = vec4(1.0); // White color for grid lines
      }
    `

    init.call(this)
    animate.call(this)

    function init() {
      renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.el.appendChild(renderer.domElement)

      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()

      uniforms = {
        u_mouse3D: { value: new THREE.Vector3() },
        u_clickPosition: { value: new THREE.Vector3(10000, 10000, 10000) },
        u_timeSinceClick: { value: -1.0 }, // We have to make this negative to init with a no click
        u_rippleSpeed: { value: 1.0 },
      }

      planeGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)
      planeMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        wireframe: true,
      })

      planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

      scene.add(planeMesh)

      window.addEventListener('resize', onWindowResize, false)
      document.addEventListener('mousemove', onDocumentMouseMove, false)
      document.addEventListener('click', onCanvasClick, false)
    }

    function onDocumentMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    function onCanvasClick(event) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(planeMesh)

      if (intersects.length > 0) {
        const intersect = intersects[0]
        uniforms.u_clickPosition.value.copy(intersect.point)
        uniforms.u_timeSinceClick.value = 0.0
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.u_resolution.value.x = renderer.domElement.width
      uniforms.u_resolution.value.y = renderer.domElement.height
    }

    function animate() {
      requestAnimationFrame(animate)

      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObject(planeMesh)

      if (intersects.length > 0) {
        const intersect = intersects[0]
        uniforms.u_mouse3D.value.copy(intersect.point)
      }

      if (uniforms.u_timeSinceClick.value >= 0.0) {
        uniforms.u_timeSinceClick.value += 0.05
      }

      renderer.render(scene, camera)
    }

    this.handleEvent('update-shader', ({ vertex, fragment }) => {
      planeMaterial.vertexShader = vertex
      planeMaterial.fragmentShader = fragment
      planeMaterial.needsUpdate = true
    })
  },

  destroyed() {
    window.removeEventListener('resize', onWindowResize)
    document.removeEventListener('mousemove', onDocumentMouseMove)
    document.removeEventListener('click', onCanvasClick)

    planeMesh.geometry.dispose()
    planeMesh.material.dispose()
    scene.remove(planeMesh)
    renderer.dispose()

    camera = null
    scene = null
    renderer = null
    planeGeometry = null
    planeMaterial = null
    planeMesh = null
    raycaster = null
    mouse = null
    uniforms = null
  },
}
