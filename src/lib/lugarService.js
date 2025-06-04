import { supabase } from './supabaseClient'

// Sube la foto con su la url publica
// const subirFoto = async (archivo, nombreArchivo) => {
//   const { data, error } = await supabase.storage
//     .from('fotos') 
//     .upload(`lugares/${nombreArchivo}`, archivo, {
//       cacheControl: '3600',
//       upsert: false
//     });

//   if (error) throw new Error('Error al subir la foto: ' + error.message);

//   const { data: publicUrlData } = supabase.storage
//     .from('fotos')
//     .getPublicUrl(`lugares/${nombreArchivo}`);

//   return publicUrlData.publicUrl;
// };

// Función principal para cargar lugar + foto (+ categoría opcional)
export const subirLugarConFoto = async ({ nombre, descripcion, latitud, longitud, categoria }) => {
  try {
    const fecha = new Date().toISOString();
    // const nombreArchivo = `${nombre}-${Date.now()}`.replace(/\s/g, '_');

    // 1. Subir foto al bucket
    // const fotoUrl = await subirFoto(archivoFoto, nombreArchivo);

    // 2. Insertar lugar en tabla "lugar"
    const { data: lugarInsertado, error: errorLugar } = await supabase
      .from('lugar')
      .insert({
        nombre,
        descripcion,
        geocode: `${latitud},${longitud}`,
        fecha_creacion: fecha
      })
      .select(); // Esto devuelve el lugar insertado, incluido el ID

    if (errorLugar) throw new Error('Error al insertar lugar: ' + errorLugar.message);

    const lugarId = lugarInsertado[0].id;

    // 3. Insertar foto con relación al lugar
    // const { error: errorFoto } = await supabase
    //   .from('foto')
    //   .insert({
    //     id_lugar: lugarId,
    //     // foto: fotoUrl
    //   });

    // if (errorFoto) throw new Error('Error al insertar la foto: ' + errorFoto.message);

    // 4. Insertar relación con categoría (si hay)
    // if (categoriaId) {
    //   const { error: errorCategoria } = await supabase
    //     .from('categoria_lugar')
    //     .insert({
    //       id_lugar: lugarId,
    //       id_categoria: categoriaId
    //     });

    //   if (errorCategoria) throw new Error('Error al insertar categoría: ' + errorCategoria.message);
    // }

    // 2. Crear POI en la tabla point_of_interest
    const { error: errorPOI } = await supabase
      .from('point_of_interest')
      .insert({
        source: 'user',
        external_id: lugarId.toString(),
        name: nombre,
        description: descripcion,
        geo: {
          type: 'Point',
          coordinates: [longitud, latitud]
        },
        kinds: [categoria],
        created_by: null, // TODO: Agregar el ID del usuario cuando se implemente autenticación
        ts: fecha
      });

    if (errorPOI) throw new Error('Error al crear POI: ' + errorPOI.message);

    return { success: true, lugarId };
  } catch (error) {
    console.error('Error al registrar lugar:', error.message);
    return { success: false, error: error.message };
  }
};
