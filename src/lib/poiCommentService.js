import { supabase } from './supabaseClient'

export const subirComentario = async ({ id_usuario, poi_id, comentario }) => {
  try {
    const { error } = await supabase
      .from('poi_comment')
      .insert({
        user_id: id_usuario,
        poi_id: poi_id,
        comment_text: comentario,
      });

    if (error) throw new Error('Error al insertar comentario: ' + error.message);

    return { success: true };
  } catch (error) {
    console.error('Error al registrar comentario:', error.message);
    return { success: false, error: error.message };
  }
};

export const obtenerComentariosPorLugar = async (poi_id) => {
  try {
    const { data, error } = await supabase
      .from('poi_comment_with_user')
      .select('*')
      .eq('poi_id', poi_id)
      .order('created_at', { ascending: false });

    if (error) throw new Error('Error al obtener comentarios: ' + error.message);

    return { success: true, comentarios: data };
  } catch (error) {
    console.error('Error al traer comentarios:', error.message);
    return { success: false, error: error.message };
  }
};
