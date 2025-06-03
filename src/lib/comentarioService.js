import { supabase } from './supabaseClient'

export const subirComentario = async ({ id_usuario, id_lugar, comentario }) => {
  try {
    const fecha = new Date().toISOString();

    const { error } = await supabase
      .from('comentario')
      .insert({
        id_usuario,
        id_lugar,
        comentario,
        fecha_creacion: fecha
      });

    if (error) throw new Error('Error al insertar comentario: ' + error.message);

    return { success: true };
  } catch (error) {
    console.error('Error al registrar comentario:', error.message);
    return { success: false, error: error.message };
  }
};

export const obtenerComentariosPorLugar = async (id_lugar) => {
  try {
    const { data, error } = await supabase
      .from('comentario')
      .select('id_comentario, comentario, fecha_creacion, id_usuario(nombre)')
      .eq('id_lugar', id_lugar)
      .order('fecha_creacion', { ascending: false });

    if (error) throw new Error('Error al obtener comentarios: ' + error.message);

    return { success: true, comentarios: data };
  } catch (error) {
    console.error('Error al traer comentarios:', error.message);
    return { success: false, error: error.message };
  }
};
