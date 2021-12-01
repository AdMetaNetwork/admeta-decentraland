/// --- Set up a system ---

export class TextureUpdater implements ISystem {
  static cnt = 0;
  group = engine.getComponentGroup(Material);
  update(dt: number) {
    TextureUpdater.cnt++;
    // Update texture every 2 sec (FPS 30)
    if (TextureUpdater.cnt === 60) {
      TextureUpdater.cnt = 0;

      // iterate over the entities of the group
      for (let entity of this.group.entities) {
        const myTexture = new Texture(
          "http://localhost:3000/_next/image?url=https%3A%2F%2Fipfs.fleek.co%2Fipfs%2Fbafybeihb4adk45udjpnymx55msypjuxptcraokavywzxm5ouc5h4phvn2i&w=3840&q=75"
        );
        entity.getComponent(Material).albedoTexture = myTexture;
      }
    }
  }
}
engine.addSystem(new TextureUpdater());

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
    openExternalURL("https://admeta.network");
  })
);
