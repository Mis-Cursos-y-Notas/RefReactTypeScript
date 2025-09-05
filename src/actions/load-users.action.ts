import axios from 'axios';
import type { UserListResponse } from '../interfaces/reqres.response';

export const loadUsersAction = async (page: number) => {
    console.log('🔍 DEBUG - Parámetro page recibido:', page);
    console.log('🔍 DEBUG - Tipo de page:', typeof page);
    console.log('🔍 DEBUG - page es válido?', page >= 1 && page <= 2);

    // Logs adicionales para debug
    console.log('🌐 DEBUG - URL completa (con proxy):', `/api/users?page=${page}`);
    console.log('📋 DEBUG - Configuración de axios:', {
        url: '/api/users',
        method: 'GET',
        params: { page: page }
    });

    try {
        console.log('📡 DEBUG - Usando proxy local para evitar CORS...');

        const { data } = await axios.get<UserListResponse>(
            `/api/users`, // Usar proxy local en lugar de URL completa
            {
                params: {
                    page: page,
                }
            }
        );

        console.log('✅ DEBUG - Respuesta exitosa de reqres.in:', data);
        return data.data;
    } catch (error) {
        console.log('❌ DEBUG - Error con reqres.in:', error);
        return [];
    }
};
