import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../model/member.entity';
import { environment } from '../../../environments/environment';  // Asegúrate de usar la ruta correcta

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private apiUrl = `${environment.serverBasePath}/members`;  // Usa la URL base desde environment.ts

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',  // Si no hay token, no se incluye
    });
  }

  // Obtener todos los miembros registrados en el sistema.
  // Realiza una solicitud GET al endpoint de la API para recuperar un arreglo de objetos tipo Member.
  // Incluye encabezados de autenticación para asegurar que solo usuarios autorizados accedan a la información.
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo miembro en el sistema.
  // Envia una solicitud POST al endpoint con los datos del nuevo miembro en el cuerpo de la petición.
  // El servidor procesará estos datos y devolverá el miembro creado con su ID asignado.
  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member, { headers: this.getAuthHeaders() });
  }

  // Actualizar la información de un miembro existente.
  // Usa una solicitud PUT para enviar los nuevos datos del miembro al endpoint correspondiente.
  // El 'id' especifica qué miembro se va a actualizar y el cuerpo contiene los nuevos datos.
  update(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, member, { headers: this.getAuthHeaders() });
  }

  // Eliminar un miembro del sistema de forma permanente.
  // Se envía una solicitud DELETE al endpoint, incluyendo el ID del miembro que se desea eliminar.
  // No se espera un contenido de respuesta, solo la confirmación de que la operación fue exitosa.
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
