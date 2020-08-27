<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{

	public function emailValidate(Request $request)
	{// validacion del email

	  $user = User::where('email',$request->email)->first();
	  return is_null($user) ? response()->json('email invalido',400) :
	 				  	     $this->codigo($user->email);

	}

	protected function codigo($email)
	{//generacion del codigo envio de email y insert en la tabla de reseteo
		try {

			$validacion = PasswordReset::where('email',$email)->first();

			if (!is_null($validacion)) {
				$this->email($validacion);// enviar el email
				return response()->json(['mensaje' => 'creado codigo exitosamente por favor confirme con su correo el actualizado', 'email' => $validacion->email],200);

			}

			$v = $this->store($email); // insercion en la tabla de reset

		 	$this->email($v);// enviar el email

		    return response()->json(['mensaje' => 'creado codigo exitosamente por favor confirme con su correo', 'email' => $v->email],200);

		} catch (Exception $e) {

			return response()->json('ah habido un problema vuelva a intentarlo',500);

		}

	}

	// la confirmacion del codigo
	public function ConfirmeCodigo(Request $request)
	{

		$validacion = $this->validacion($request->codigo , $request->email);
		return $validacion ? response()->json(['mensaje'=> 'ah sido aprobado el codigo',
												'datos' => $validacion],200) :
							 response()->json('No Autorizado',400);
		;

	}

	public function UpdatePassword(Request $request)
	{
		$validacion = $this->validacion($request->codigo , $request->email);
		if (is_null($validacion)) {
			return response()->json('No Autorizado',401);
		}
		try {

			$user = User::where('email',$validacion->email)->first();
			$user->password = Hash::make($request->newPassword);
			$user->save();

			$validacion->delete();

			return response()->json('su contraseña ah sido actualizada correctamente',200);

		} catch (Exception $e) {

			return response()->json('ah habido un problema al actualizar su contraseña',500);
		}
	}

	protected function email($datos)
	{// funcion para el envio del email

		   //enviar el email
	    if (!Mail::to($datos->email)->send(new ResetPassword($datos))){
	        return response()->json(['mensaje' => 'no se envio el email',
	        						 'status' => 500],500);
	        }
		   //
	    return true;

	}

	public function refreshCodigo(Request $request)
	{ // funcion para el renvio del codigo
		$validacion = PasswordReset::where('email',$request->email)->first();
		if (is_null($validacion)) {
			return response()->json('no hay nada que refrescar',500);
		}
		$email = $validacion->email; // guardo el email para la nueva insercion
		$validacion->delete(); // borro el registro viejo
		$newRefresh = $this->store($email); // genero el nuevo codigo valido
		$this->email($newRefresh); // enviar el email

		return response()->json('codigo refrescado exitosamente por favor revise su correo',200);
	}

	protected function validacion($codigo, $email)
	{ // funcion para validar

		$validacion = PasswordReset::where('codigo',$codigo)->where('email',$email)->first();
		return is_null($validacion) ? null : $validacion;

	}

	protected function store($email)
	{ // funcion para la insertar en la tabla

		$codigo = Str::random(6); // generacion del codigo
		$insert = PasswordReset::create(['codigo' => $codigo,
		 	 						'email' => $email,
		 	 						'confirmacion' => false ]);

		return $insert;
	}

}
