<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\PasswordReset;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{

	// validacion del email
	public function emailValidate(Request $request)
	{
	  $user = User::where('email',$request->email)->first();

	  if (is_null($user)) {
	  		return response()->json('email no encontrado',400);
	  }
	  return $this->codigo($user->email);
	}

	//generacion del codigo envio de email y insert en la tabla de reseteo
	protected function codigo($email)
	{
		try {

			$validacion = PasswordReset::where('email',$email)->first();

			if (!is_null($validacion)) {

				return response()->json(['mensaje' => 'creado codigo exitosamente por favor confirme con su correo el actualizado', 'email' => $validacion->email],200);

			}

			$codigo = Str::random(6);
		 	$v = PasswordReset::create([
		 		'codigo' => $codigo,
		 	 	'email' => $email,
		 	 	'confirmacion' => false ]);
	        //enviar el email
		   //
		    return response()->json(['mensaje' => 'creado codigo exitosamente por favor confirme con su correo', 'email' => $v->email],200);

		} catch (Exception $e) {
			return response()->json('ah habido un problema vuelva a intentarlo',500);
		}
	}

	// la confirmacion del codigo
	public function ConfirmeCodigo(Request $request)
	{
		$validacion = PasswordReset::where('codigo',$request->codigo)->where('email',$request->email)->first();

		if (is_null($validacion)) {
			return response()->json('codigo inavlido',400);
		}
		return response()->json(['mensaje'=> 'ah sido aprobado el codigo','datos' => $validacion],200);
	}

	public function UpdatePassword(Request $request)

	{
		$validacion = PasswordReset::where('codigo',$request->codigo)->where('email',$request->email)->first();
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

}
