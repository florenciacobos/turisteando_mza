import { supabase } from './supabaseClient';

// Filtro por categoría
// Esta funcion recibe el id de la categoria y devuelve los lugares que pertenecen a esa categoria
export const obtenerLugaresPorCategoria = async (idCategoria) => {
  try {
    const { data, error } = await supabase
      .from('categoria_lugar')
      .select('id_lugar')
      .eq('id_categoria', idCategoria);

    if (error) {
      console.error('Error al obtener los datos:', error.message);
      return { success: false, error: error.message };
    } else {
      console.log('Datos obtenidos correctamente:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, error: err.message };
  }
};

// Búsqueda por nombre
// Esta función busca lugares cuyo nombre contenga una cadena específica
export const buscarLugaresPorNombre = async (nombreParcial) => {
  try {
    const { data, error } = await supabase
      .from('lugar')
      .select('*')
      .ilike('nombre', `%${nombreParcial}%`); // Busca coincidencias parciales en la columna 'nombre'

    if (error) {
      console.error('Error al buscar los lugares:', error.message);
      return { success: false, error: error.message };
    } else {
      console.log('Lugares encontrados:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, error: err.message };
  }
};

