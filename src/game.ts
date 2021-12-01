/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform);

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform);

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10);
    }
  }
}

// Add a new instance of the system to the engine
// engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity();

  // add a transform to the entity
  cube.addComponent(
    new Transform({
      position: new Vector3(x, y, z),
      rotation: Quaternion.Euler(180, 180, 0),
      scale: new Vector3(8, 4, 1),
    })
  );

  // add a shape to the entity
  cube.addComponent(new PlaneShape());

  // Create texture
  const myTexture = new Texture(
    "http://localhost:3000/_next/image?url=https%3A%2F%2Fipfs.fleek.co%2Fipfs%2Fbafybeihb4adk45udjpnymx55msypjuxptcraokavywzxm5ouc5h4phvn2i&w=3840&q=75"
  );

  // Create a material
  const myMaterial = new Material();
  myMaterial.albedoTexture = myTexture;

  // Assign the material to the entity
  cube.addComponent(myMaterial);

  // add the entity to the engine
  engine.addEntity(cube);

  return cube;
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 3, 8);

cube.addComponent(
  new OnClick(() => {
    cube.getComponent(Transform).scale.z *= 1.1;
    cube.getComponent(Transform).scale.x *= 0.9;

    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1);
  })
);
