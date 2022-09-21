/// --- Set up a system ---

export class TextureUpdater implements ISystem {
  static cnt = 0;
  static adimg = ''
  group = engine.getComponentGroup(Material);
  update(dt: number) {
    TextureUpdater.cnt++;
    // Update texture every 2 sec (FPS 30)
    if (TextureUpdater.cnt === 60) {
      TextureUpdater.cnt = 0;
      // iterate over the entities of the group
      for (let entity of this.group.entities) {
        if (!TextureUpdater.adimg) {
          executeTask(async () => {
            try {
              let response = await fetch('http://168.119.116.180:3002/api/getmb')
              let json = await response.json()
              log(json, '---------json')
              if (json.ad.adimg) {
                const myTexture = new Texture(json.ad.adimg);
                entity.getComponent(Material).albedoTexture = myTexture;
                TextureUpdater.adimg = json.ad.adimg;
                entity.addComponent(
                  new OnPointerDown(() => {
                    openExternalURL(json.ad.adurl);
                  })
                );
              } else {
                const myTexture = new Texture(
                  "https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/banner2.png"
                );
                TextureUpdater.adimg = "https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/banner2.png";
                entity.getComponent(Material).albedoTexture = myTexture;
                entity.addComponent(
                  new OnPointerDown(() => {
                    openExternalURL("https://admeta.network");
                  })
                );
              }
              
            } catch {
              log("failed to reach URL")
            }
          })
        } else {
          entity.addComponent(
            new OnPointerDown(() => {
              openExternalURL("https://admeta.network");
            })
          );
        }
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
    "https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/banner2.png"
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

const cube = spawnCube(8, 3, 11);
// cube.addComponent(
//   new OnPointerDown(() => {
//     openExternalURL("https://admeta.network");
//   })
// );
