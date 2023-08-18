import { Injectable } from '@angular/core';
import { AuthLoginDtoRequestDto } from '../authLoginRequestDto';
import { Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthLoginResponseDto } from '../authLoginResponseDto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  //Se creo un Dto de respuesta para yo saber a ciencia cierta que estoy recibiendo y no dejar un any
  public signIn(AuthDto: AuthLoginDtoRequestDto): Observable<AuthLoginResponseDto>{
      return this.http.post<AuthLoginResponseDto>(`${this.apiUrl}auth/sign-in`, AuthDto).pipe(
        tap(Response => {
          this.tokenService.saveToken(Response.jwt); 
      })
    );  
  } 
}
