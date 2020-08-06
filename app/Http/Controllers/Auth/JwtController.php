<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtController extends Controller
{

	 /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.init', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
            //JWTAuth::factory()->setTTL(0010);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'No Autorizado'],401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
     public function getAuthUser()
     {
        try {

                $user = JWTAuth::parseToken()->authenticate();
             return  response()->json(['user' => $user,'status' => 200],200);

        } catch (JWTException $e) {

            return  response()->json(['mensaje' => $e,'status' => 500],500);

        }

    }


    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $newToken = JWTAuth::parseToken()->refresh();
        return $this->respondWithToken($newToken);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user' => User::find(Auth::user()->id),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL()
        ]);
    }

      /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            JWTAuth::parseToken()->invalidate();
              return response()->json(['mensaje' => 'session destruida con exito','confirmacion' => true],200);

        } catch (JWTException $e) {
              return  response()->json(['mensaje' => $e, 'status' => 500],500);
        }

    }


}
