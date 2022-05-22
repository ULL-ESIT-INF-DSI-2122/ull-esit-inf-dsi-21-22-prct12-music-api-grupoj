# Práctica 12 - API Node/Express de gestión de información musical

En esta práctica, la segunda grupal de la asignatura, tendrá que implementar un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de canciones, artistas y playlists.

Para el desarrollo del código se ha dividio en diferentes directorios que contienen los diferentes ficheros que permiten su funcionamiento. Además hay un fichero externo a los directorios mencionados el cual contendrá el códig que se deberá ejecutar para iniciar el servidor.

## Servidor

Como se mencionaba anteriormente, el fichero server contendrá el código que deberá ser ejecutado para iniciar el servidor. Este estará compuesto por la inicialización de un varible `app = express()` y seguidamente las imortaciones de los demás routers para poder acceder a los puntos de acceso. Por último se declara el puerto y se quedaría escuchando peticiones.

```ts
const app = express();

app.use(express.json());

app.use(defaultRouter);
app.use(deleteRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

Resaltar que haciendo uso de `app.use(express.json())` se parsea las peticiones a formato json.

## Modelos de objetos

Dentro de la API se distinguirán tres tipos de datos, canciones, artistas y playlist, cada una con su propia interfaz (extendida del módulo Documnts de mongoose), su schema y su modelo de datos.

### Artista

En el caso de los artistas, la interfaz contendrá el nombre del mismo, sus generos musicales, sus canciones, y su número de oyentes.

```ts
export interface artistInterface extends Document {
  name: string,
  genres: string[],
  songs: string[],
  rep: number
}
```

Siguiendo esta interfaz, crearemos Schema de artista en el cual se especificará que los diferentes valores son obligatorios y no van a contener espacios. Además en el caso del nombre deberá ser un valor único.

```ts
const artistSchema = new Schema<artistInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
  },
  rep: {
    type: Number,
    required: true,
    trim: true,
  },
});
```

Por último creamos el modelo de datos y lo exportamos.

```ts
export const artistModel = model<artistInterface>('artist', artistSchema);
```

### Canción

En el caso de las canciones, la interfaz contendrá el nombre de la misma, sus generos musicales, su duración, su creador, si se trata de un single o no y su número de oyentes.

```ts
export interface songInterface extends Document {
  name: string,
  genre: string[],
  lenght: string,
  artist: string,
  single: boolean,
  rep: number
}
```

Siguiendo esta interfaz, crearemos Schema de canción en el cual se especificará que los diferentes valores son obligatorios y no van a contener espacios.

```ts
const songSchema = new Schema<songInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  genre: {
    type: [String],
    required: true,
    trim: true,
  },
  length: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  single: {
    type: Boolean,
    required: true,
    trim: true,
  },
  rep: {
    type: Number,
    required: true,
    trim: true,
  },
});
```

Por último creamos el modelo de datos y lo exportamos.

```ts
export const songModel = model<songInterface>('song', songSchema);
```

### PLaylist

En el caso de las playlists, la interfaz contendrá el nombre de la misma, sus generos musicales, sus canciones, y su duración.

```ts
export interface playlistInterface extends Document {
  name: string,
  genre: string[],
  songs: string[],
  lenght: string
}
```

Siguiendo esta interfaz, crearemos Schema de playlist en el cual se especificará que los diferentes valores son obligatorios y no van a contener espacios. Además en el caso del nombre deberá ser un valor único.

```ts
const playlistSchema = new Schema<playlistInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  genre: {
    type: [String],
    required: true,
    trim: true,
  },
  songs: {
    type: [String],
    required: true,
    trim: true,
  },
  length: {
    type: String,
    required: true,
    trim: true,
  },
});
```

Por último creamos el modelo de datos y lo exportamos.

```ts
export const playlistModel =
  model<playlistInterface>('playlist', playlistSchema);
```


## Router de objetos

Para poder gestionar los diferentes puntos de acceso se creará un router para cada una de las funciones del programa, y cada uno de estos routers podrá diferenciar el punto de acceso que está recibiendo.

### Default

En primer lugar existirá un ruoter por defecto que devolvera un estado 501 en caso de que se intente acceder a una ruta no especificada.

```ts
export const defaultRouter = express.Router();

defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
```

### Delete

Para la opción de borrar un elemento de la base de datos crearemos un router que permita identificar un elemento por su nombre o por su identificador único, y una vez lo tenga lo elimine.

```ts
export const deleteRouter = express.Router();
```

En caso de querer eliminar una canción:
```ts
deleteRouter.delete('/song', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const song =
        await songModel.findOneAndDelete({name: req.query.name.toString()});
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/song/:id', async (req, res) => {
  try {
    const song = await songModel.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send();
  }
});
```

En caso de querer eliminar un artista:
```ts
deleteRouter.delete('/artist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const artist =
      await artistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/artist/:id', async (req, res) => {
  try {
    const artist = await artistModel.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send();
  }
});
```

En caso de querer eliminar una playlist
```ts
deleteRouter.delete('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name required',
    });
  }
  try {
    const playlist =
        await playlistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/playlist/:id', async (req, res) => {
  try {
    const playlist = await playlistModel.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});
```

### Get

Para la opción de obtener un elemento de la base de datos crearemos un router que permita identificar un elemento por su nombre o por su identificador único, de forma que este sea buscado en la base de datos.

```ts
export const getRouter = express.Router();
```

Para buscar una canción:
```ts
getRouter.get('/song', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const song = await songModel.find(filter);
    if (song.length !== 0) {
      return res.send(song);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

getRouter.get('/song/:id', async (req, res) => {
  try {
    const song = await songModel.findById(req.params.id);
    if (!song) {
      return res.send(song);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
```

Para buscar un artista:
```ts
getRouter.get('/artist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const artist = await artistModel.find(filter);
    if (artist.length !== 0) {
      return res.send(artist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

getRouter.get('/artist/:id', async (req, res) => {
  try {
    const artist = await artistModel.findById(req.params.id);
    if (!artist) {
      return res.send(artist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
```

Para buscar una playlist:
```ts
getRouter.get('/playlist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const playlist = await playlistModel.find(filter);
    if (playlist.length !== 0) {
      return res.send(playlist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

getRouter.get('/playlist/:id', async (req, res) => {
  try {
    const playlist = await playlistModel.findById(req.params.id);
    if (!playlist) {
      return res.send(playlist);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
```

### Patch

Para la opción de actualizar un elemento de la base de datos crearemos un router que permita identificar un elemento por su nombre o por su identificador único, y una vez lo tenga lo pueda modificar según se le indique.

```ts
export const patchRouter = express.Router();
```
Para modificar una canción:
```ts
patchRouter.patch('/song', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const song = await songModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchRouter.patch('/song/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
          actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const song = await songModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) {
      return res.status(404).send();
    }
    return res.send(song);
  } catch (error) {
    return res.status(400).send(error);
  }
});
```

Para modificar un artista:
```ts
patchRouter.patch('/artist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const artist = await artistModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchRouter.patch('/artist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const artist = await artistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return res.status(404).send();
    }
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});
```

Para modificar una playlist:
```ts
patchRouter.patch('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Name requiered',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const playlist = await playlistModel.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchRouter.patch('/playlist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songs', 'rep'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
          actualUpdates.every((update) => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update denied',
    });
  }
  try {
    // eslint-disable-next-line max-len
    const playlist = await playlistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!playlist) {
      return res.status(404).send();
    }
    return res.send(playlist);
  } catch (error) {
    return res.status(400).send(error);
  }
});
```

### Post

Para la opción de crear un elemento de la base de datos crearemos un router que permita recibir los datos de un objeto y guardarlo en la base de datos.

```ts
export const postRouter = express.Router();
```
Para crear una canción:
```ts
postRouter.post('/song', async (req, res) => {
  // eslint-disable-next-line new-cap
  const song = new songModel(req.body);
  try {
    await song.save();
    res.status(201).send(song);
  } catch (err) {
    res.status(400).send(err);
  }
});
```

Para crear un artista:
```ts
postRouter.post('/artist', async (req, res) => {
  // eslint-disable-next-line new-cap
  const artist = new artistModel(req.body);
  try {
    await artist.save();
    res.status(201).send(artist);
  } catch (err) {
    res.status(400).send(err);
  }
});
```

Para crear una playlist:
```ts
postRouter.post('/playlist', async (req, res) => {
  // eslint-disable-next-line new-cap
  const playlist = new playlistModel(req.body);
  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (err) {
    res.status(400).send(err);
  }
});
```

## Base de datos

Para poder conectar con la base de datos de mongodb haremos uso de mongoose, de forma que si consigue establecer la conexión el servidor nos lo hrá saber, y de igua forma si no lo consigue.

```ts
const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/grupojapp';

connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});
```

## Heroku y MongoDB

El proyecto estará desplegado en la dirección https://grupojapp.herokuapp.com/ mediante el uso de heruko, y estará conectado a una base de daatos de mongoDB de forma que se pueda hacer un seguimiento de los cambios de la misma.

Para comprobar su correcto funcionamiento se han hecho pruebas con la extensión thunder client, tal y como se muestra en el vídeo explicativo de la práctica.